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
      gap={1.5}
      alignItems="flex-start"
      className={`max-w-[85%] ${isLocal ? 'ml-auto flex-row-reverse' : ''}`}
    >
      <Avatar
        className={`w-8 h-8 font-bold border-2 ${isLocal ? 'border-blue-100 bg-blue-50 text-blue-600' : 'border-gray-100 bg-gray-50 text-gray-600'}`}
        sx={{ width: 28, height: 28, fontSize: '0.75rem' }}
      >
        {message.from?.identity?.[0] ?? <Person fontSize="small" />}
      </Avatar>

      <Box display="flex" flexDirection="column" className={isLocal ? 'items-end' : 'items-start'}>
        <Typography
          variant="caption"
          className={`font-bold mb-0.5 ${isLocal ? 'text-blue-600' : 'text-gray-500'}`}
        >
          {message.from?.identity ?? "Unknown"}
        </Typography>

        <Box
          className={`px-3 py-2 rounded-2xl text-sm shadow-sm ${isLocal
            ? 'bg-blue-600 text-white rounded-tr-none'
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
            }`}
        >
          <Typography variant="body2" className="leading-snug break-words">
            {message.message}
          </Typography>
        </Box>
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
    <Box display="flex" flexDirection="column" height="100%" className="bg-white">
      {/* Header */}
      <Box
        textAlign="left"
        px={3}
        py={2}
        className="border-b bg-gray-50/50 backdrop-blur-sm sticky top-0 z-10"
      >
        <Typography
          variant="subtitle1"
          fontWeight="800"
          className="text-gray-900 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live Chat
        </Typography>
      </Box>

      {/* Messages */}
      <Box
        flex={1}
        px={2}
        py={2}
        overflow="auto"
        display="flex"
        flexDirection="column"
        gap={2}
        className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
        sx={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#E5E7EB',
            borderRadius: '10px',
          },
        }}
      >
        {messages.length === 0 ? (
          <Box className="flex-1 flex flex-col items-center justify-center opacity-40 grayscale space-y-2">
            <Person sx={{ fontSize: 48 }} />
            <Typography variant="caption" className="font-medium italic">No messages yet</Typography>
          </Box>
        ) : (
          messages.map((msg) => (
            <ChatMessage key={msg.timestamp} message={msg} />
          ))
        )}
      </Box>

      {/* Input */}
      <Box
        className="px-4 py-4 border-t bg-white"
      >
        <Box className="flex gap-2 items-end">
          <TextField
            fullWidth
            multiline
            maxRows={4}
            size="small"
            disabled={!chatEnabled}
            placeholder={
              chatEnabled ? "Say something..." : "Chat is disabled"
            }
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            InputProps={{
              className: "rounded-xl border-gray-100 bg-gray-50",
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6366F1',
                  borderWidth: '1px',
                },
              },
            }}
          />

          <IconButton
            onClick={onSend}
            disabled={!draft.trim().length}
            className={`p-2 rounded-xl transition-all ${!draft.trim().length
              ? 'bg-gray-100 text-gray-400'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
              }`}
          >
            <Send fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
