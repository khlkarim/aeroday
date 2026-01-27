// forked from livestream-mobile-backend

import jwt from "jsonwebtoken";
import {
  AccessToken,
  CreateIngressOptions,
  IngressAudioEncodingPreset,
  IngressClient,
  IngressInfo,
  IngressInput,
  IngressVideoEncodingPreset,
  ParticipantInfo,
  ParticipantPermission,
  RoomServiceClient,
  TrackSource
} from "livekit-server-sdk";

export type RoomMetadata = {
  creator_identity: string;
  enable_chat: boolean;
  allow_participation: boolean;
};

export type ParticipantMetadata = {
  hand_raised: boolean;
  invited_to_stage: boolean;
  avatar_image: string;
};

export type Config = {
  ws_url: string;
  api_key: string;
  api_secret: string;
};

export type Session = {
  identity: string;
  room_name: string;
};

export type ConnectionDetails = {
  token: string;
  ws_url: string;
};

export type CreateIngressParams = {
  room_name?: string;
  ingress_type: string;
  metadata: RoomMetadata;
};

export type CreateIngressResponse = {
  ingress: IngressInfo;
  auth_token: string;
  connection_details: ConnectionDetails;
};

export type CreateStreamParams = {
  room_name?: string;
  metadata: RoomMetadata;
};

export type CreateStreamResponse = {
  auth_token: string;
  connection_details: ConnectionDetails;
};

export type JoinStreamParams = {
  room_name: string;
  identity: string;
};

export type JoinStreamResponse = {
  auth_token: string;
  connection_details: ConnectionDetails;
};

export type InviteToStageParams = {
  identity: string;
};

export type RemoveFromStageParams = {
  identity?: string;
};

export type ErrorResponse = {
  error: string;
};

export function getSessionFromReq(req: Request): Session {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) {
    throw new Error("No authorization header found");
  }
  try {
    const verified = jwt.verify(token, process.env.LIVEKIT_API_SECRET!) as Session;
    return verified;
  } catch {
    throw new Error("Invalid or expired token");
  }
}

export class Controller {
  private ingressService: IngressClient;
  private roomService: RoomServiceClient;

  constructor() {
    const wsUrl = process.env.LIVEKIT_WS_URL;
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!wsUrl || !apiKey || !apiSecret) {
      throw new Error(
        "Missing LiveKit configuration. Ensure LIVEKIT_WS_URL, LIVEKIT_API_KEY, and LIVEKIT_API_SECRET are set."
      );
    }

    const httpUrl = wsUrl
      .replace("wss://", "https://")
      .replace("ws://", "http://");

    this.ingressService = new IngressClient(httpUrl, apiKey, apiSecret);
    this.roomService = new RoomServiceClient(httpUrl, apiKey, apiSecret);
  }

  private async getRoomAndVerifyOwnership(roomName: string, identity: string) {
    const rooms = await this.roomService.listRooms([roomName]);

    if (rooms.length === 0) {
      throw new Error("Room does not exist");
    }

    const room = rooms[0];
    const metadata = JSON.parse(room.metadata || "{}") as RoomMetadata;

    if (metadata.creator_identity !== identity) {
      throw new Error("Unauthorized: Only the creator can perform this action");
    }

    return { room, metadata };
  }

  async createIngress({
    metadata,
    room_name: roomName,
    ingress_type = "rtmp",
  }: CreateIngressParams): Promise<CreateIngressResponse> {
    const finalRoomName = roomName || generateRoomId();

    // Create room and ingress
    await this.roomService.createRoom({
      name: finalRoomName,
      metadata: JSON.stringify(metadata),
    });

    const options: CreateIngressOptions = {
      name: finalRoomName,
      roomName: finalRoomName,
      participantName: `${metadata.creator_identity} (via OBS)`,
      participantIdentity: `${metadata.creator_identity} (via OBS)`,
    };

    if (ingress_type === "whip") {
      options.bypassTranscoding = true;
    } else {
      Object.assign(options, {
        video: {
          source: TrackSource.CAMERA,
          preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
        },
        audio: {
          source: TrackSource.MICROPHONE,
          preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
        },
      });
    }

    const ingress = await this.ingressService.createIngress(
      ingress_type === "whip"
        ? IngressInput.WHIP_INPUT
        : IngressInput.RTMP_INPUT,
      options
    );

    // Create viewer access token
    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY!,
      process.env.LIVEKIT_API_SECRET!,
      {
        identity: metadata.creator_identity,
      }
    );

    at.addGrant({
      room: finalRoomName,
      roomJoin: true,
      canPublish: false,
      canSubscribe: true,
      canPublishData: true,
    });

    const authToken = this.createAuthToken(
      finalRoomName,
      metadata.creator_identity
    );

    return {
      ingress,
      auth_token: authToken,
      connection_details: {
        ws_url: process.env.LIVEKIT_WS_URL!,
        token: await at.toJwt(),
      },
    };
  }

  async createStream({
    metadata,
    room_name: roomName,
  }: CreateStreamParams): Promise<CreateStreamResponse> {
    const finalRoomName = roomName || generateRoomId();

    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY!,
      process.env.LIVEKIT_API_SECRET!,
      {
        identity: metadata.creator_identity,
      }
    );

    at.addGrant({
      room: finalRoomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    });

    await this.roomService.createRoom({
      name: finalRoomName,
      metadata: JSON.stringify(metadata),
    });

    const connection_details = {
      ws_url: process.env.LIVEKIT_WS_URL!,
      token: await at.toJwt(),
    };

    const authToken = this.createAuthToken(
      finalRoomName,
      metadata.creator_identity
    );

    return {
      auth_token: authToken,
      connection_details,
    };
  }

  async stopStream(session: Session) {
    await this.getRoomAndVerifyOwnership(session.room_name, session.identity);
    await this.roomService.deleteRoom(session.room_name);
  }

  async joinStream({
    identity,
    room_name: roomName,
  }: JoinStreamParams): Promise<JoinStreamResponse> {
    // Check for existing participant with same identity
    try {
      const participant = await this.roomService.getParticipant(
        roomName,
        identity
      );
      if (participant) {
        throw new Error("Participant already exists");
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("not found")) {
        // Expected case
      } else if (
        error instanceof Error &&
        error.message === "Participant already exists"
      ) {
        throw error;
      }
    }

    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY!,
      process.env.LIVEKIT_API_SECRET!,
      {
        identity,
      }
    );

    at.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: false,
      canSubscribe: true,
      canPublishData: true,
    });

    const authToken = this.createAuthToken(roomName, identity);

    return {
      auth_token: authToken,
      connection_details: {
        ws_url: process.env.LIVEKIT_WS_URL!,
        token: await at.toJwt(),
      },
    };
  }

  async inviteToStage(session: Session, { identity }: InviteToStageParams) {
    await this.getRoomAndVerifyOwnership(session.room_name, session.identity);

    const participant = await this.roomService.getParticipant(
      session.room_name,
      identity
    );
    const permission = participant.permission || ({} as ParticipantPermission);

    const metadata = this.getOrCreateParticipantMetadata(participant);
    metadata.invited_to_stage = true;

    // If hand is raised and invited to stage, then we let them on stage
    if (metadata.hand_raised) {
      permission.canPublish = true;
    }

    await this.roomService.updateParticipant(
      session.room_name,
      identity,
      JSON.stringify(metadata),
      permission
    );
  }

  async removeFromStage(session: Session, { identity }: RemoveFromStageParams) {
    const targetIdentity = identity || session.identity;

    const rooms = await this.roomService.listRooms([session.room_name]);
    if (rooms.length === 0) {
      throw new Error("Room does not exist");
    }

    const room = rooms[0];
    const metadataRoom = JSON.parse(room.metadata || "{}") as RoomMetadata;

    if (
      metadataRoom.creator_identity !== session.identity &&
      targetIdentity !== session.identity
    ) {
      throw new Error(
        "Unauthorized: Only the creator or the participant themselves can remove from stage"
      );
    }

    const participant = await this.roomService.getParticipant(
      session.room_name,
      targetIdentity
    );

    const permission = participant.permission || ({} as ParticipantPermission);
    const metadata = this.getOrCreateParticipantMetadata(participant);

    // Reset everything and disallow them from publishing (this will un-publish them automatically)
    metadata.hand_raised = false;
    metadata.invited_to_stage = false;
    permission.canPublish = false;

    await this.roomService.updateParticipant(
      session.room_name,
      targetIdentity,
      JSON.stringify(metadata),
      permission
    );
  }

  async raiseHand(session: Session) {
    const participant = await this.roomService.getParticipant(
      session.room_name,
      session.identity
    );

    const permission = participant.permission || ({} as ParticipantPermission);
    const metadata = this.getOrCreateParticipantMetadata(participant);
    metadata.hand_raised = true;

    // If hand is raised and invited to stage, then we allow them to publish
    if (metadata.invited_to_stage) {
      permission.canPublish = true;
    }

    await this.roomService.updateParticipant(
      session.room_name,
      session.identity,
      JSON.stringify(metadata),
      permission
    );
  }

  getOrCreateParticipantMetadata(
    participant: ParticipantInfo
  ): ParticipantMetadata {
    if (participant.metadata) {
      return JSON.parse(participant.metadata) as ParticipantMetadata;
    }
    return {
      hand_raised: false,
      invited_to_stage: false,
      avatar_image: `https://api.multiavatar.com/${participant.identity}.png`,
    };
  }
  createAuthToken(room_name: string, identity: string) {
    return jwt.sign({ room_name, identity }, process.env.LIVEKIT_API_SECRET!, {
      expiresIn: "1d",
    });
  }
}

function generateRoomId(): string {
  return `${randomString(4)}-${randomString(4)}`;
}

function randomString(length: number): string {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
