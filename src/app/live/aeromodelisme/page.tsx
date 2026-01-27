"use client";

import {
  Stack,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Divider,
} from "@mui/material";
import { useMemo, useEffect, useRef } from "react";
import { useTableSync } from "@/hooks/useTableSync";
import { supabase } from "@/utils/supabase/client";
import gsap from "gsap";

interface TeamTurn {
  id: number;
  team: string;
  turn: number;
}

const LiveAeromodelismePage = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const nowFlyingRef = useRef<HTMLDivElement>(null);
  const onDeckRef = useRef<HTMLDivElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  
  const {
    data: teamTurns,
    isPending,
    isError,
    error,
  } = useTableSync<TeamTurn>({
    queryKey: ["team-turns"],
    fetcher: async () => {
      const { data, error } = await supabase
        .from("aeromodelisme")
        .select("*");

      if (error) {
        console.error(error);
        return [];
      }
      return data;
    },
    subscribe: (onChange) => {
      const channel = supabase.channel(
        "db-events:public:aeromodelisme"
      );

      channel.on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "aeromodelisme",
        },
        onChange
      );

      channel.subscribe();
      return () => supabase.removeChannel(channel);
    },
  });

  const { nextTeam, onDeckTeam, remainingTeams } = useMemo(() => {
    const sorted = [...(teamTurns ?? [])].sort(
      (a, b) => a.turn - b.turn
    );

    return {
      nextTeam: sorted[0] ?? null,
      onDeckTeam: sorted[1] ?? null,
      remainingTeams: sorted.slice(2),
    };
  }, [teamTurns]);

  // Initial page load animations
  useEffect(() => {
    if (!isPending && teamTurns?.length && mainRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".header-content", {
          y: -50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        if (nowFlyingRef.current) {
          gsap.from(nowFlyingRef.current, {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "back.out(1.7)",
          });
        }

        if (onDeckRef.current) {
          gsap.from(onDeckRef.current, {
            x: -100,
            opacity: 0,
            duration: 0.6,
            delay: 0.5,
            ease: "power2.out",
          });
        }

        gsap.from(".upcoming-team", {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.7,
          ease: "power2.out",
        });
      }, mainRef);

      return () => ctx.revert();
    }
  }, [isPending, teamTurns]);

  // Continuous animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Radar sweep animation
      gsap.to(".radar-sweep", {
        rotation: 360,
        duration: 4,
        ease: "none",
        repeat: -1,
      });

      // Pulsing glow on NOW FLYING
      gsap.to(".now-flying-glow", {
        opacity: 0.4,
        scale: 1.1,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Floating clouds
      gsap.to(".cloud", {
        x: "random(-20, 20)",
        y: "random(-10, 10)",
        duration: "random(8, 12)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.5,
          from: "random",
        },
      });

      // Blinking indicators
      gsap.to(".status-indicator", {
        opacity: 0.3,
        duration: 0.8,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  if (isPending) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a1128 0%, #1e3a5f 100%)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Orbitron', monospace",
            color: "#8B2635",
            letterSpacing: 3,
          }}
        >
          INITIALIZING AEROMODELISME SYSTEM...
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a1128 0%, #1e3a5f 100%)",
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Orbitron', monospace",
            color: "#ff4444",
            letterSpacing: 2,
          }}
        >
          SYSTEM ERROR: {String(error)}
        </Typography>
      </Box>
    );
  }

  if (!teamTurns?.length) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a1128 0%, #1e3a5f 100%)",
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Orbitron', monospace",
            color: "#ffaa00",
            letterSpacing: 2,
          }}
        >
          AWAITING FLIGHT CLEARANCE...
        </Typography>
      </Box>
    );
  }

  return (
    <div className="min-h-screen w-full relative">
  {/* Dashed Grid */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
      backgroundSize: "22px 12px",
      backgroundPosition: "0 0, 0 0",
      maskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
      WebkitMaskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
      maskComposite: "intersect",
      WebkitMaskComposite: "source-in",
    }}
  />

    <Box
      ref={mainRef}
      sx={{
        minHeight: "100vh",
        position: "relative",
        background: "transparent",
        overflow: "hidden",
        fontFamily: "'Rajdhani', sans-serif",
      }}
    >

      <Stack spacing={6} sx={{ p: { xs: 3, sm: 5, md: 7 }, position: "relative", zIndex: 1 }}>
        {/* Header with aviation styling */}
        <Stack spacing={2} alignItems="center" className="header-content">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              position: "relative",
            }}
          >
            <Box
              className="status-indicator"
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#8B2635",
                //boxshadow: "0 0 20px #8B2635",
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Orbitron', monospace",
                fontWeight: 900,
                color: "#000",
                textTransform: "uppercase",
                letterSpacing: 8,
                // textShadow: "0 0 30px #8B2635",
                fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem" },
              }}
            >
              AEROMODELISME LIVE
            </Typography>
            <Box
              className="status-indicator"
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#8B2635",
                //boxshadow: "0 0 20px #8B2635",
              }}
            />
          </Box>
          
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 3,
              py: 1,
              background: "#8B2635",
              border: "1px solid #8B2635",
              borderRadius: 2,
              backdropFilter: "blur(10px)",
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#ff4444",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%, 100%": { opacity: 1 },
                  "50%": { opacity: 0.3 },
                },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "white",
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontSize: "0.9rem",
              }}
            >
              Live Flight Operations • Auto-Sync Active
            </Typography>
          </Box>
        </Stack>

        {/* NOW FLYING - Main focus card */}
        {nextTeam && (
          <Box
            ref={nowFlyingRef}
            sx={{
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            {/* Glow effect */}
            <Box
              className="now-flying-glow"
              sx={{
                position: "absolute",
                inset: -20,
                background: "radial-gradient(circle, rgba(255, 68, 68, 0.3) 0%, transparent 70%)",
                zIndex: 0,
              }}
            />
            
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                background: "linear-gradient(135deg, #1A1F3A 0%, #1A1F3A 100%)",
                // border: "3px solid #ff5252",
                //boxshadow: "0 20px 60px rgba(211, 47, 47, 0.4), inset 0 0 60px rgba(255, 255, 255, 0.1)",
                position: "relative",
                zIndex: 1,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "50%",
                  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%)",
                  pointerEvents: "none",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Chip
                      label="✈ NOW FLYING"
                      sx={{
                        fontFamily: "'Orbitron', monospace",
                        fontWeight: 900,
                        fontSize: "1rem",
                        letterSpacing: 2,
                        bgcolor: "#2D7D75",
                        color: "#fff",
                        px: 2,
                        py: 2.5,
                        height: "auto",
                        // //boxshadow: "0 4px 20px rgba(255, 235, 59, 0.5)",
                      }}
                    />
                    
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {[...Array(3)].map((_, i) => (
                        <Box
                          key={i}
                          className="status-indicator"
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor: "#2D7D75",
                            // //boxshadow: "0 0 10px #2D7D75",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  <Typography
                    variant="h2"
                    sx={{
                      fontFamily: "'Orbitron', monospace",
                      fontWeight: 900,
                      color: "#fff",
                      textTransform: "uppercase",
                      letterSpacing: 6,
                      textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                      fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                      wordBreak: "break-word",
                    }}
                  >
                    {nextTeam.team}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* ON DECK - Ready position */}
        {onDeckTeam && (
          <Box ref={onDeckRef}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                background: "linear-gradient(135deg, #D32F2F 0%, #D32F2F 100%)",
                border: "2px solid #D32F2F",
                // //boxshadow: "0 10px 40px rgba(255, 152, 0, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.1)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "50%",
                  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%)",
                  pointerEvents: "none",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Chip
                    label="ON DECK"
                    sx={{
                      fontFamily: "'Orbitron', monospace",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      letterSpacing: 2,
                      bgcolor: "#000",
                      color: "#ffeb3b",
                      px: 2,
                      py: 2,
                      height: "auto",
                      width: "fit-content",
                    }}
                  />
                  
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "'Orbitron', monospace",
                      fontWeight: 800,
                      color: "#fff",
                      textTransform: "uppercase",
                      letterSpacing: 4,
                      textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                      fontSize: { xs: "1.75rem", sm: "2.25rem" },
                    }}
                  >
                    {onDeckTeam.team}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Divider with runway markings */}
        <Box
          sx={{
            height: "3px",
            background: "repeating-linear-gradient(90deg, #8B2635 0px, #8B2635 20px, transparent 20px, transparent 40px)",
            position: "relative",
            my: 2,
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: "#8B2635",
            },
            "&::before": { left: 0 },
            "&::after": { right: 0 },
          }}
        />

        {/* UPCOMING QUEUE */}
        <Stack spacing={3} ref={upcomingRef}>
          {remainingTeams.map((tp, index) => (
            <Box
  key={tp.id}
  className="upcoming-team"
  sx={{
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    px: 4,
    py: 3,
    borderRadius: 2,
    bgcolor: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    transition: "box-shadow 0.2s ease, transform 0.2s ease",
    "&:hover": {
      boxShadow: 2,
      transform: "translateY(-1px)",
    },
  }}
>
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <Typography
      variant="subtitle1"
      fontWeight={600}
      sx={{ letterSpacing: 0.2 }}
    >
      {tp.team}
    </Typography>
  </Box>

  <Chip
    label={`FLIGHT #${tp.turn}`}
    size="small"
    sx={{
      fontWeight: 500,
      bgcolor: "grey.100",
      color: "text.secondary",
      borderRadius: 1,
    }}
  />
</Box>

          ))}
        </Stack>
      </Stack>

      {/* Corner decorations - flight instruments style */}
      <Box
        sx={{
          position: "fixed",
          top: 20,
          left: 20,
          width: 60,
          height: 60,
          border: "2px solid #8B2635",
          borderRight: "none",
          borderBottom: "none",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "fixed",
          top: 20,
          right: 20,
          width: 60,
          height: 60,
          border: "2px solid #8B2635",
          borderLeft: "none",
          borderBottom: "none",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
          width: 60,
          height: 60,
          border: "2px solid #8B2635",
          borderRight: "none",
          borderTop: "none",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          border: "2px solid #8B2635",
          borderLeft: "none",
          borderTop: "none",
          pointerEvents: "none",
        }}
      />
    </Box>
      {/* Your Content/Components */}
</div>
  );
};

export default LiveAeromodelismePage;