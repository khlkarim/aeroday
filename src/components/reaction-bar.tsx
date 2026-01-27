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
      display="flex"
      gap={2}
      justifyContent="center"
      alignItems="center"
      minHeight={100}
      sx={{
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.default',
      }}
    >
      <Tooltip title="Fire" enterDelay={0}>
        <Button size="large" variant="outlined" onClick={() => onSend("🔥")}>
          🔥
        </Button>
      </Tooltip>

      <Tooltip title="Applause">
        <Button size="large" variant="outlined" onClick={() => onSend("👏")}>
          👏
        </Button>
      </Tooltip>

      <Tooltip title="LOL">
        <Button size="large" variant="outlined" onClick={() => onSend("🤣")}>
          🤣
        </Button>
      </Tooltip>

      <Tooltip title="Love">
        <Button size="large" variant="outlined" onClick={() => onSend("❤️")}>
          ❤️
        </Button>
      </Tooltip>

      <Tooltip title="Confetti">
        <Button size="large" variant="outlined" onClick={() => onSend("🎉")}>
          🎉
        </Button>
      </Tooltip>
    </Box>
  );
}
