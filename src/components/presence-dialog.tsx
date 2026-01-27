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
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar sx={{ width: 24, height: 24 }}>
          {participant.identity?.[0] ?? <Person fontSize="small" />}
        </Avatar>

        <Typography
          variant="body2"
          color={isCurrentUser ? "primary" : "text.primary"}
        >
          {participant.identity}
          {isCurrentUser && " (you)"}
        </Typography>
      </Box>

      {isHost && roomMetadata.allow_participation ? (
        <HostActions />
      ) : (
        <ViewerActions />
      )}
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
    <Dialog onClose={() => onOpenChange(false)} open={open} fullWidth maxWidth="xs">
      {children}

      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Who&rsquo;s here</Typography>
        <IconButton
          aria-label="close"
          onClick={() => onOpenChange(false)}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={3}>
          {hosts.length > 0 && (
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography
                variant="caption"
                fontWeight="bold"
                color="text.secondary"
              >
                {hosts.length > 1 ? "CO-HOSTS" : "HOST"}
              </Typography>

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
            </Box>
          )}

          {viewers.length > 0 && (
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography
                variant="caption"
                fontWeight="bold"
                color="text.secondary"
              >
                VIEWERS
              </Typography>

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
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
