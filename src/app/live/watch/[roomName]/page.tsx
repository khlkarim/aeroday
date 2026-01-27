"use client";

import WatchPageImpl from "./page.client";
import { redirect, useParams } from "next/navigation";

export default function WatchPage() {
  const params = useParams();
  const roomName = params.roomName as string;

  if (!roomName) {
    redirect("/");
  }

  const serverUrl = "wss://aeroday-fsyc7b6h.livekit.cloud".replace("wss://", "https://")
    .replace("ws://", "http://");

  return <WatchPageImpl roomName={roomName} serverUrl={serverUrl} />;
}
