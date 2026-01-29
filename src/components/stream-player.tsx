"use client";

import { ParticipantMetadata, RoomMetadata } from "@/lib/controller";
import {
  AudioTrack,
  StartAudio,
  VideoTrack,
  useDataChannel,
  useLocalParticipant,
  useParticipants,
  useRoomContext,
  useTracks,
} from "@livekit/components-react";
import {
  ContentCopy,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Typography,
} from "@mui/material";
import Confetti from "js-confetti";
import {
  ConnectionState,
  Track,
} from "livekit-client";
import { useEffect, useState, useRef } from "react";
import { MediaDeviceSettings } from "./media-device-settings";
import { PresenceDialog } from "./presence-dialog";
import { useAuthToken } from "./token-context";
import { useCopyToClipboard } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

function ConfettiCanvas() {
  const [confetti, setConfetti] = useState<Confetti>();
  const [decoder] = useState(() => new TextDecoder());
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useDataChannel("reactions", (data) => {
    const options: { emojis?: string[]; confettiNumber?: number } = {};
    const emoji = decoder.decode(data.payload);

    if (emoji !== "🎉") {
      options.emojis = [emoji];
      options.confettiNumber = 12;
    }

    confetti?.addConfetti(options);
  });

  useEffect(() => {
    setConfetti(new Confetti({ canvas: canvasEl.current ?? undefined }));
  }, []);

  return <canvas ref={canvasEl} className="absolute h-full w-full" />;
}

export function StreamPlayer({ isHost = false }) {
  const [, copy] = useCopyToClipboard();
  const [isPresenceOpen, setIsPresenceOpen] = useState(false);

  const { metadata, name: roomName, state: roomState } = useRoomContext();
  const roomMetadata = (metadata && JSON.parse(metadata)) as RoomMetadata;

  const { localParticipant } = useLocalParticipant();
  const localMetadata = (localParticipant.metadata &&
    JSON.parse(localParticipant.metadata)) as ParticipantMetadata;

  const canHost =
    isHost || (localMetadata?.invited_to_stage && localMetadata?.hand_raised);

  const participants = useParticipants();

  const showNotification = isHost
    ? participants.some((p) => {
      const m = (p.metadata &&
        JSON.parse(p.metadata)) as ParticipantMetadata;
      return m?.hand_raised && !m?.invited_to_stage;
    })
    : localMetadata?.invited_to_stage && !localMetadata?.hand_raised;

  const tracks = useTracks([Track.Source.Camera]);

  const totalVideoTracks = tracks.length;

  const remoteAudioTracks = useTracks([Track.Source.Microphone]).filter(
    (t) => t.participant.identity !== localParticipant.identity
  );

  const authToken = useAuthToken();

  const onLeaveStage = async () => {
    await fetch("/api/remove_from_stage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify({ identity: localParticipant.identity }),
    });
  };

  return (
    <Box position="relative" height="100%" width="100%" bgcolor="#0a0a0a" className="overflow-hidden group flex flex-col">
      <Box
        display="grid"
        className="flex-1 w-full"
        gridTemplateColumns={
          totalVideoTracks <= 1
            ? "1fr"
            : totalVideoTracks <= 4
              ? "repeat(2, 1fr)"
              : "repeat(auto-fit, minmax(320px, 1fr))"
        }
        gridTemplateRows={
          totalVideoTracks <= 2
            ? "1fr"
            : "repeat(auto-fit, minmax(0, 1fr))"
        }
        gap={1}
        p={1}
      >
        {tracks.map((t) => (
          <Box
            key={t.participant.identity}
            position="relative"
            className="overflow-hidden bg-zinc-900 rounded-2xl border border-white/5 transition-all duration-500 shadow-xl ring-1 ring-white/5"
          >
            {/* Placeholder / Avatar State */}
            <Box
              position="absolute"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
              className="z-0 bg-gradient-to-b from-zinc-800 to-zinc-950"
            >
              <Avatar
                className="w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border-2 border-white/10 text-white/50 text-5xl font-black mb-6 shadow-2xl"
                sx={{ width: 128, height: 128 }}
              >
                {t.participant.identity[0]?.toUpperCase() ?? "?"}
              </Avatar>
              <Box className="flex flex-col items-center gap-1">
                <Typography variant="h6" className="text-white/90 font-bold tracking-tight">
                  {t.participant.identity === localParticipant.identity ? "You" : t.participant.identity}
                </Typography>
                <Typography variant="caption" className="text-white/40 font-medium uppercase tracking-widest text-[10px]">
                  {t.participant.identity === localParticipant.identity ? "Off Air" : "Connecting..."}
                </Typography>
              </Box>
            </Box>

            <VideoTrack
              trackRef={t}
              className={cn(
                "absolute w-full h-full bg-zinc-900 object-cover z-10",
                t.participant.identity === localParticipant.identity && "-scale-x-100"
              )}
            />

            {/* Bottom Info Bar */}
            <Box className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="flex items-center gap-2.5">
                {t.participant.identity === localParticipant.identity && (
                  <Chip
                    label="YOU"
                    size="small"
                    className="h-5 bg-indigo-500 text-white font-black text-[10px] tracking-wider px-1 border border-indigo-400/30"
                  />
                )}
                <Typography className="text-white font-bold text-sm drop-shadow-md tracking-tight truncate">
                  {t.participant.identity}
                </Typography>
              </div>
            </Box>
          </Box>
        ))}
      </Box>


      {remoteAudioTracks.map((t) => (
        <AudioTrack key={t.participant.identity} trackRef={t} />
      ))}

      <ConfettiCanvas />

      <StartAudio
        label="Tap to unlock audio"
        // icon={<div className="mb-4 text-4xl">🔊</div>}
        className="absolute inset-0 bg-black/80 backdrop-blur-md text-white font-bold text-xl tracking-wide uppercase cursor-pointer flex flex-col items-center justify-center transition-all hover:bg-black/70 z-[100]"
      />

      {/* Top Controls Overlay */}
      <Box position="absolute" top={0} width="100%" className="p-4 z-50 pointer-events-none">
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" className="gap-2">

          {/* Left Controls */}
          <Box display="flex" gap={1.5} alignItems="center" className="pointer-events-auto">
            <Box className="group/room relative">
              <Button
                size="small"
                variant="text"
                disabled={!roomName}
                onClick={() =>
                  copy(`${process.env.NEXT_PUBLIC_SITE_URL}/watch/${roomName}`)
                }
                startIcon={<ContentCopy className="text-xs" />}
                className="bg-black/40 border border-white/10 backdrop-blur-md hover:bg-white/10 text-white/90 font-medium rounded-full px-4 py-1.5 normal-case tracking-tight transition-all active:scale-95 text-xs h-9 min-w-0"
              >
                <span className="truncate max-w-[100px] md:max-w-xs">{roomState === ConnectionState.Connected ? roomName : "Waiting..."}</span>
              </Button>
            </Box>

            {roomName && canHost && (
              <Box className="bg-black/40 border border-white/10 backdrop-blur-md rounded-full p-1 flex items-center gap-1 h-9">
                <MediaDeviceSettings />
                {roomMetadata?.creator_identity !==
                  localParticipant.identity && (
                    <Box className="w-px h-4 bg-white/10 mx-1" />
                  )}
                {roomMetadata?.creator_identity !==
                  localParticipant.identity && (
                    <Button
                      size="small"
                      onClick={onLeaveStage}
                      className="text-red-400 hover:bg-red-500/10 hover:text-red-300 font-bold px-3 min-w-0 rounded-full h-full text-xs"
                    >
                      Leave
                    </Button>
                  )}
              </Box>
            )}
          </Box>

          {/* Right Controls */}
          <Box display="flex" gap={1.5} alignItems="center" className="pointer-events-auto">
            {roomState === ConnectionState.Connected && (
              <Box className="flex items-center gap-2 bg-rose-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-rose-500/50 shadow-lg shadow-rose-900/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-white font-bold text-[10px] tracking-widest uppercase leading-none">LIVE</span>
              </Box>
            )}

            <PresenceDialog isHost={isHost} open={isPresenceOpen} onOpenChange={setIsPresenceOpen}>
              <Box position="relative">
                {showNotification && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 border-2 border-black"></span>
                  </span>
                )}

                <Button
                  size="small"
                  variant="contained"
                  disabled={roomState !== ConnectionState.Connected}
                  onClick={() => setIsPresenceOpen(true)}
                  className="bg-black/40 border border-white/10 backdrop-blur-md hover:bg-white/10 text-white font-bold rounded-full min-w-0 w-9 h-9 p-0 transition-all active:scale-95"
                >
                  <Visibility className="text-lg opacity-80" />
                </Button>
              </Box>
            </PresenceDialog>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
