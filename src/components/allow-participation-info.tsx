"use client";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IconButton, Popover, Typography, Box } from "@mui/material";
import { useState } from "react";

export function AllowParticipationInfo() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        size="small"
        aria-label="Learn more about panel background options"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        PaperProps={{
          sx: { maxWidth: 360, p: 1.5 },
        }}
      >
        <Box>
          <Typography variant="body2">
            If enabled, viewers can <strong>raise their hand</strong>. When
            accepted by the host, they can share their audio and video. The host
            can also <strong>invite</strong> viewers to share their audio and
            video.
          </Typography>
        </Box>
      </Popover>
    </>
  );
}
