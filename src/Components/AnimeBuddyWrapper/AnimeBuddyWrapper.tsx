"use client";

import React, { useState } from "react";
import AnimeBuddyOverlay from "../AnimeBuddyOverlay";
import ChatBox from "../ChatBox/ChatBox";

export default function AnimeBuddyWrapper() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <AnimeBuddyOverlay onClick={() => setChatOpen(true)} imageSrc="/cat.gif" size={140} />
      <ChatBox visible={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
