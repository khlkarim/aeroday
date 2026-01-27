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
          sx: {
            maxWidth: 320,
            p: 2,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Box className="flex flex-col gap-2">
          <Typography variant="subtitle2" className="flex items-center gap-1.5 font-bold text-blue-600">
            <InfoOutlinedIcon fontSize="small" /> Participation Info
          </Typography>
          <Typography variant="body2" className="text-gray-600 leading-relaxed">
            If enabled, viewers can <strong className="text-gray-900 font-semibold">raise their hand</strong>. When
            accepted by the host, they can share their audio and video. The host
            can also <strong className="text-gray-900 font-semibold">invite</strong> viewers to share their audio and
            video.
          </Typography>
        </Box>
      </Popover>
    </>
  );
}
