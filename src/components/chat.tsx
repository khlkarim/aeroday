"use client";

import { useMemo, useState } from "react";
import { RoomMetadata } from "@/lib/controller";
import {
  ReceivedChatMessage,
  useChat,
  useLocalParticipant,
  useRoomInfo,
} from "@livekit/components-react";

import { Send, Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

function ChatMessage({ message }: { message: ReceivedChatMessage }) {
  const { localParticipant } = useLocalParticipant();

  const isLocal =
    localParticipant.identity === message.from?.identity;

  return (
    <Box
      display="flex"
      gap={1}
      alignItems="flex-start"
      sx={{ wordBreak: "break-word", width: 220 }}
    >
      <Avatar sx={{ width: 24, height: 24 }}>
        {message.from?.identity?.[0] ?? <Person fontSize="small" />}
      </Avatar>

      <Box display="flex" flexDirection="column">
        <Typography
          variant="caption"
          fontWeight="bold"
          color={isLocal ? "primary" : "text.secondary"}
        >
          {message.from?.identity ?? "Unknown"}
        </Typography>

        <Typography variant="caption">
          {message.message}
        </Typography>
      </Box>
    </Box>
  );
}

export function Chat() {
  const [draft, setDraft] = useState("");
  const { chatMessages, send } = useChat();
  const { metadata } = useRoomInfo();

  const { enable_chat: chatEnabled } = (
    metadata ? JSON.parse(metadata) : {}
  ) as RoomMetadata;

  // HACK: why do we get duplicate messages?
  const messages = useMemo(() => {
    const timestamps = chatMessages.map((m) => m.timestamp);
    return chatMessages.filter(
      (m, i) => !timestamps.includes(m.timestamp, i + 1)
    );
  }, [chatMessages]);

  const onSend = async () => {
    if (draft.trim().length && send) {
      setDraft("");
      await send(draft);
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      {/* Header */}
      <Box
        textAlign="center"
        px={2}
        py={1.5}
        borderBottom={1}
        borderColor="divider"
        bgcolor="background.paper"
      >
        <Typography
          variant="overline"
          fontWeight="bold"
          color="primary"
          sx={{ letterSpacing: 1.5 }}
        >
          Live Chat
        </Typography>
      </Box>

      {/* Messages */}
      <Box
        flex={1}
        px={2}
        py={1}
        overflow="auto"
        display="flex"
        flexDirection="column"
        gap={1}
        justifyContent="flex-end"
        sx={{
          '&::-webkit-scrollbar': {
            width: '0.4em',
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey',
          },
        }}
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.timestamp} message={msg} />
        ))}
      </Box>

      {/* Input */}
      <Box
        display="flex"
        gap={1}
        px={2}
        py={1}
        mt={1}
        borderTop={1}
        borderColor="divider"
      >
        <TextField
          fullWidth
          size="small"
          disabled={!chatEnabled}
          placeholder={
            chatEnabled ? "Say something..." : "Chat is disabled"
          }
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSend();
            }
          }}
        />

        <IconButton
          onClick={onSend}
          disabled={!draft.trim().length}
          color="primary"
        >
          <Send fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
