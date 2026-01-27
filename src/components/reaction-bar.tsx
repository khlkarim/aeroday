"use client";

import { useState } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import { useChat, useDataChannel } from "@livekit/components-react";

export function ReactionBar() {
  const [encoder] = useState(() => new TextEncoder());
  const { send } = useDataChannel("reactions");
  const { send: sendChat } = useChat();

  const onSend = (emoji: string) => {
    send(encoder.encode(emoji), {});
    if (sendChat) {
      sendChat(emoji);
    }
  };

  return (
    <Box
      className="flex gap-4 p-4 rounded-2xl border bg-white/80 backdrop-blur-md shadow-lg"
      sx={{
        width: 'fit-content',
        margin: '0 auto',
        transform: 'translateY(-20px)',
        zIndex: 10,
      }}
    >
      {[
        { emoji: "🔥", label: "Fire" },
        { emoji: "👏", label: "Applause" },
        { emoji: "🤣", label: "LOL" },
        { emoji: "❤️", label: "Love" },
        { emoji: "🎉", label: "Confetti" },
      ].map((item) => (
        <Tooltip key={item.label} title={item.label} placement="top" arrow>
          <Button
            size="large"
            onClick={() => onSend(item.emoji)}
            className="min-w-0 w-12 h-12 text-2xl p-0 rounded-xl hover:bg-gray-100 hover:scale-125 transition-all duration-200 active:scale-90"
          >
            {item.emoji}
          </Button>
        </Tooltip>
      ))}
    </Box>
  );
}
