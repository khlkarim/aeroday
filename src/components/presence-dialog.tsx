"use client";

import { ParticipantMetadata, RoomMetadata } from "@/lib/controller";
import {
  useLocalParticipant,
  useParticipants,
  useRoomContext,
} from "@livekit/components-react";
import { Close, Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Participant } from "livekit-client";
import { useAuthToken } from "./token-context";
import { useState } from "react";

function ParticipantListItem({
  participant,
  isCurrentUser,
  isHost = false,
}: {
  participant: Participant;
  isCurrentUser: boolean;
  isHost?: boolean;
}) {
  const authToken = useAuthToken();
  const participantMetadata = (participant.metadata &&
    JSON.parse(participant.metadata)) as ParticipantMetadata;

  const room = useRoomContext();
  const roomMetadata = (room.metadata &&
    JSON.parse(room.metadata)) as RoomMetadata;

  const onInvite = async () => {
    await fetch("/api/invite_to_stage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify({
        identity: participant.identity,
      }),
    });
  };

  const onRaiseHand = async () => {
    await fetch("/api/raise_hand", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
      },
    });
  };

  const onCancel = async () => {
    await fetch("/api/remove_from_stage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify({
        identity: participant.identity,
      }),
    });
  };

  function HostActions() {
    if (!isCurrentUser) {
      if (
        participantMetadata.invited_to_stage &&
        participantMetadata.hand_raised
      ) {
        return (
          <Button size="small" variant="outlined" onClick={onCancel}>
            Remove
          </Button>
        );
      } else if (participantMetadata.hand_raised) {
        return (
          <Box display="flex" gap={1}>
            <Button size="small" onClick={onInvite}>
              Accept
            </Button>
            <Button size="small" variant="outlined" onClick={onCancel}>
              Reject
            </Button>
          </Box>
        );
      } else if (participantMetadata.invited_to_stage) {
        return (
          <Button size="small" variant="outlined" disabled>
            Pending
          </Button>
        );
      } else {
        return (
          <Button size="small" onClick={onInvite}>
            Invite to stage
          </Button>
        );
      }
    }
  }

  function ViewerActions() {
    if (isCurrentUser && participantMetadata) {
      if (
        participantMetadata.invited_to_stage &&
        participantMetadata.hand_raised
      ) {
        return (
          <Button size="small" onClick={onCancel}>
            Leave stage
          </Button>
        );
      } else if (
        participantMetadata.invited_to_stage &&
        !participantMetadata.hand_raised
      ) {
        return (
          <Box display="flex" gap={1}>
            <Button size="small" onClick={onRaiseHand}>
              Accept
            </Button>
            <Button size="small" variant="outlined" onClick={onCancel}>
              Reject
            </Button>
          </Box>
        );
      } else if (participantMetadata.hand_raised) {
        return (
          <Button size="small" variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        );
      } else {
        return (
          <Button size="small" onClick={onRaiseHand}>
            Raise hand
          </Button>
        );
      }
    }
  }

  return (
    <Box
      key={participant.sid}
      className={`flex justify-between items-center p-3.5 rounded-2xl transition-all border ${isCurrentUser
        ? 'bg-primary-main/10 border-primary-main/30 shadow-[0_0_15px_rgba(45,125,117,0.1)]'
        : 'bg-background-paper border-divider hover:bg-action-hover shadow-sm'
        }`}
    >
      <Box className="flex items-center gap-3">
        <Avatar
          className={`w-9 h-9 font-black border-2 transition-transform ${isCurrentUser ? 'border-primary-main/40 bg-primary-main/20 text-primary-main' : 'border-divider bg-action-hover text-text-secondary'
            }`}
          sx={{ width: 36, height: 36, fontSize: '0.9rem' }}
        >
          {participant.identity?.[0]?.toUpperCase() ?? <Person fontSize="small" />}
        </Avatar>

        <Typography
          variant="body2"
          className={`font-bold tracking-tight ${isCurrentUser ? 'text-primary-main' : 'text-text-primary'}`}
        >
          {participant.identity}
          {isCurrentUser && <span className="text-text-secondary font-medium ml-1.5 opacity-60">(you)</span>}
        </Typography>
      </Box>

      <Box className="flex items-center gap-1.5">
        {isHost && roomMetadata.allow_participation ? (
          <HostActions />
        ) : (
          <ViewerActions />
        )}
      </Box>
    </Box>
  );
}

export function PresenceDialog({
  children,
  isHost = false,
  open,
  onOpenChange,
}: {
  children?: React.ReactNode;
  isHost?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { localParticipant } = useLocalParticipant();
  const participants = useParticipants();

  const hosts = participants.filter(
    (p) => p.permissions?.canPublish ?? false
  );
  const viewers = participants.filter(
    (p) => !p.permissions?.canPublish
  );

  return (
    <Dialog
      onClose={() => onOpenChange(false)}
      open={open}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        className: "rounded-[2rem] shadow-2xl border border-white/5",
        sx: { backgroundImage: 'none', bgcolor: 'background.paper' }
      }}
    >
      {children}

      <DialogTitle className="m-0 p-8 flex justify-between items-center border-b border-divider bg-action-hover/30">
        <Typography variant="h5" fontWeight="900" className="text-text-primary tracking-tighter">
          Participants
          <span className="ml-3 text-sm font-black text-primary-main bg-primary-main/10 px-3 py-1 rounded-full">{participants.length}</span>
        </Typography>
        <IconButton
          aria-label="close"
          onClick={() => onOpenChange(false)}
          className="text-text-secondary hover:text-text-primary hover:bg-action-hover rounded-2xl p-2.5 transition-all"
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className="p-0 border-none">
        <Box className="flex flex-col gap-8 p-6">
          {hosts.length > 0 && (
            <Box className="flex flex-col gap-3">
              <Typography
                variant="overline"
                className="text-text-secondary font-black tracking-[0.2em] text-[11px] px-1"
              >
                {hosts.length > 1 ? "CO-HOSTS" : "HOST"}
              </Typography>

              <div className="flex flex-col gap-2">
                {hosts.map((participant) => (
                  <ParticipantListItem
                    key={participant.identity}
                    participant={participant}
                    isCurrentUser={
                      participant.identity === localParticipant.identity
                    }
                    isHost={isHost}
                  />
                ))}
              </div>
            </Box>
          )}

          {viewers.length > 0 && (
            <Box className="flex flex-col gap-3">
              <Typography
                variant="overline"
                className="text-text-secondary font-black tracking-[0.2em] text-[11px] px-1"
              >
                VIEWERS
              </Typography>

              <div className="flex flex-col gap-2">
                {viewers.map((participant) => (
                  <ParticipantListItem
                    key={participant.identity}
                    participant={participant}
                    isCurrentUser={
                      participant.identity === localParticipant.identity
                    }
                    isHost={isHost}
                  />
                ))}
              </div>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
