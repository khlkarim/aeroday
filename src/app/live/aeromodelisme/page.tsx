"use client";

import {
  Stack,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  useTheme,
  alpha,
  darken,
} from "@mui/material";
import { useMemo, useEffect, useRef } from "react";
import { useTableSync } from "@/hooks/useTableSync";
import { supabase } from "@/utils/supabase/client";
import gsap from "gsap";
import Image from "next/image";
import { LandPlot, PlaneTakeoff } from 'lucide-react';

interface TeamTurn {
  id: number;
  team: string;
  turn: number;
}

const LiveAeromodelismePage = () => {
  const theme = useTheme();
  const mainRef = useRef<HTMLDivElement>(null);
  const nowFlyingRef = useRef<HTMLDivElement>(null);
  const onDeckRef = useRef<HTMLDivElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);

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

  const { nextTeams, onDeckTeams, upcomingGroups } = useMemo(() => {
    if (!teamTurns) return { nextTeams: [], onDeckTeams: [], upcomingGroups: [] };

    const grouped = teamTurns.reduce((acc, curr) => {
      const turn = curr.turn || 0;
      if (!acc[turn]) acc[turn] = [];
      acc[turn].push(curr);
      return acc;
    }, {} as Record<number, TeamTurn[]>);

    const sortedTurns = Object.keys(grouped)
      .map(Number)
      .sort((a, b) => a - b);

    const groups = sortedTurns.map(turn => grouped[turn]);

    return {
      nextTeams: groups[0] ?? [],
      onDeckTeams: groups[1] ?? [],
      upcomingGroups: groups.slice(2),
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
      // Pulsing glow on NOW FLYING
      gsap.to(".now-flying-glow", {
        opacity: 0.4,
        scale: 1.1,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
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
          background: theme.palette.background.default,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            // fontFamily: "'Orbitron', monospace",
            color: theme.palette.primary.main,
            // letterSpacing: 3,
          }}
        >
          Initializing Aeromodelisme System...
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
          background: theme.palette.background.default,
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Orbitron', monospace",
            color: theme.palette.error.main,
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
          background: theme.palette.background.default,
        }}
      >
        <Typography
          sx={{
            // fontFamily: "'Orbitron', monospace",
            color: theme.palette.warning.main,
            // letterSpacing: 2,
          }}
        >
          Waiting for Flight Clearance...
        </Typography>
      </Box>
    );
  }

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: theme.palette.background.default }}>
      {/* Dashed Grid */}
      <Box
        className="absolute inset-0 z-0"
        sx={{
          opacity: theme.palette.mode === 'dark' ? 0.3 : 0.8,
          backgroundImage: `
        linear-gradient(to right, ${theme.palette.divider} 1px, transparent 1px),
        linear-gradient(to bottom, ${theme.palette.divider} 1px, transparent 1px)
      `,
          backgroundSize: "22px 12px",
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
          color: theme.palette.text.primary,
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
              {/* <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: theme.palette.primary.main,
                }}
              /> */}
              <Typography
                variant="h2"
                sx={{
                  // fontFamily: "'Orbitron', monospace",
                  // fontWeight: 600,
                  color: theme.palette.text.primary,
                  // textTransform: "uppercase",
                  // letterSpacing: 8,
                  fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem" },
                }}
              >
                Aeromodelisme Flight Schedule
              </Typography>
              {/* <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: theme.palette.primary.main,
                }}
              /> */}
            </Box>

            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                // px: 3,
                pb: 2,
                // background: theme.palette.primary.main,
                // border: `1px solid ${theme.palette.primary.dark}`,
                borderRadius: 2,
                backdropFilter: "blur(10px)",
                // boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            >
            </Box> */}
          </Stack>

          <Stack direction={"row"} spacing={2} >

            <Stack flex={1} spacing={5} pt={1.8}>
              <Box mt={10}></Box>
              {/* NOW FLYING - Main focus card */}
              {nextTeams.length > 0 && (
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
                      background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.3)} 0%, transparent 70%)`,
                      zIndex: 0,
                    }}
                  />

                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${darken(theme.palette.primary.main, 0.1)} 100%)`,
                      position: "relative",
                      zIndex: 1,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "50%",
                        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)",
                        pointerEvents: "none",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Stack spacing={3}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <Chip
                            label="NOW FLYING"
                            sx={{
                              // fontFamily: "'Orbitron', monospace",
                              fontWeight: 900,
                              fontSize: "1rem",
                              letterSpacing: 2,
                              bgcolor: "#000",
                              color: "#E3F2FD",
                              px: 2,
                              py: 2.5,
                              height: "auto",
                            }}
                          />

                          <Box sx={{ fontSize: "2rem", color: "#E3F2FD" }}><PlaneTakeoff className="size-8" /></Box>

                          {/* <Box sx={{ display: "flex", gap: 1 }}>
                          {[...Array(3)].map((_, i) => (
                            <Box
                              key={i}
                              className="status-indicator"
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                bgcolor: "#E3F2FD"
                              }}
                            />
                          ))}
                        </Box> */}
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
                          {nextTeams.map((team, index) => (
                            <Box key={team.id} sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography
                                variant="h5"
                                sx={{
                                  // fontFamily: "'Orbitron', monospace",
                                  // fontWeight: 900,
                                  color: "#fff",
                                  // textTransform: "uppercase",
                                  // letterSpacing: 6,
                                  textShadow: theme.palette.mode === 'dark' ? "0 4px 20px rgba(0, 0, 0, 0.5)" : "none",
                                  fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" },
                                  wordBreak: "break-word",
                                }}
                              >
                                {team.team}
                              </Typography>
                              {index < nextTeams.length - 1 && (
                                <Typography
                                  variant="h2"
                                  sx={{
                                    fontFamily: "'Orbitron', monospace",
                                    fontWeight: 900,
                                    color: "#9E9E9E",
                                    textTransform: "uppercase",
                                    ml: 4,
                                    fontSize: { xs: "2.5rem", sm: "3.5rem" },
                                  }}
                                >
                                  |
                                </Typography>
                              )}
                            </Box>
                          ))}
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              )}

              {/* ON DECK - Ready position */}
              {onDeckTeams.length > 0 && (
                <Box ref={onDeckRef}>
                  <Card
                    elevation={0}
                    sx={{
                      marginBottom: 3,
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${"#1A1F3A"} 0%, ${darken("#1A1F3A", 0.2)} 100%)`,
                      border: `2px solid ${"#1A1F3A"}`,
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
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <Chip
                            label="PREPARING"
                            sx={{
                              // fontFamily: "'Orbitron', monospace",
                              fontWeight: 800,
                              fontSize: "0.9rem",
                              letterSpacing: 2,
                              bgcolor: "#000",
                              color: "#E3F2FD",
                              px: 2,
                              py: 2,
                              height: "auto",
                              width: "fit-content",
                            }}
                          />

                          <Box sx={{ fontSize: "2rem", color: "#E3F2FD" }}><LandPlot className="size-8" /></Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                          {onDeckTeams.map((team, index) => (
                            <Box key={team.id} sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography
                                variant="h4"
                                sx={{
                                  // fontFamily: "'Orbitron', monospace",
                                  fontWeight: 800,
                                  color: "#fff",
                                  // textTransform: "uppercase",
                                  // letterSpacing: 4,
                                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                                  fontSize: { xs: "1.75rem", sm: "2.25rem" },
                                }}
                              >
                                {team.team}
                              </Typography>
                              {index < onDeckTeams.length - 1 && (
                                <Typography
                                  variant="h4"
                                  sx={{
                                    fontFamily: "'Orbitron', monospace",
                                    fontWeight: 800,
                                    color: "rgba(255,255,255,0.5)",
                                    ml: 2,
                                    fontSize: { xs: "1.75rem", sm: "2.25rem" },
                                  }}
                                >|</Typography>
                              )}
                            </Box>
                          ))}
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              )}

            </Stack>

            {/* UPCOMING QUEUE */}
            <Stack flex={1} spacing={-1.8} ref={upcomingRef}>
              <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#000",
                  fontSize: { xs: "1.75rem", sm: "2rem" },
                  textAlign: "center",
                }}
              >
                Upcoming Flights
              </Typography></Box>
              <Stack spacing={2}>
              {upcomingGroups.slice(0, 4).map((group) => (
                <Box
                  key={group[0].turn}
                  className="upcoming-team"
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 4,
                    py: 3,
                    borderRadius: 2,
                    bgcolor: theme.palette.background.paper,
                    border: "1px solid",
                    borderColor: theme.palette.divider,
                    transition: "box-shadow 0.2s ease, transform 0.2s ease",
                    "&:hover": {
                      boxShadow: 2,
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: 'wrap' }}>
                    {group.map((team, i) => (
                      <Box key={team.id} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          sx={{ color: theme.palette.text.primary, fontSize: '1.5rem' }}
                        >
                          {team.team}
                        </Typography>
                        {i < group.length - 1 && (
                          <Typography color="text.secondary" sx={{ ml: 2 }}> | </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>

                  <Chip
                    label={`FLIGHT #${group[0].turn}`}
                    size="small"
                    sx={{
                      fontWeight: 500,
                      bgcolor: theme.palette.action.hover,
                      color: theme.palette.text.secondary,
                      borderRadius: 1,
                      flexShrink: 0,
                    }}
                  />
                </Box>
              ))}</Stack>
            </Stack>
          </Stack>
        </Stack>

        {/* Divider with runway markings */}
        <Box
          sx={{
            height: "3px",
            background: "#000",
            position: "fixed",
            left: "20px",
            right: "20px",
            bottom: "50px",
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: "#000",
            },
            "&::before": { left: 0 },
            "&::after": { right: 0 },
          }}
        />

        <Stack sx={{
          position: "fixed",
          bottom: 25,
          // width: 200,
          height: 50,
          left: "40%",
          bgcolor: "#fff",
          border: `2px solid ${alpha("#000", 1)}`,
          pointerEvents: "none",
          p: 3,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 2,
          borderRadius: 2,
        }}>
          <Typography sx={{ color: "#000" }}>
            Powered by
          </Typography>
          <Image alt="atr" src="/assets/images/logos/logo-sonicx.png" width={90} height={90} />
        </Stack>

        {/* Corner decorations - flight instruments style */}
        <Box
          sx={{
            position: "fixed",
            top: 20,
            left: 20,
            width: 200,
            height: 100,
            border: `2px solid ${alpha("#000", 1)}`,
            borderRight: "none",
            borderBottom: "none",
            pointerEvents: "none",
            p: 3,
            display: { xs: "none", md: "block" }
          }}
        >
          <Image alt="atr" src="/assets/images/logos/logo-atr.png" width={200} height={200} />
        </Box>
        <Box
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
            width: 190,
            height: 100,
            border: `2px solid ${alpha("#000", 1)}`,
            borderLeft: "none",
            borderBottom: "none",
            pointerEvents: "none",
            // pt: 1,
            pr: 2,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image alt="atr" src="/assets/images/logos/logo-aeroday-dark-no-bg-Photoroom.png" width={150} height={150} style={{ borderRadius: 5 }} />
        </Box>
      </Box>
    </div>
  );
};

export default LiveAeromodelismePage;