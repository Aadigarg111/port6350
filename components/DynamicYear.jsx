"use client";

import { useState, useEffect } from "react";

export default function DynamicYear() {
  const [year, setYear] = useState(2024);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setYear(new Date().getFullYear());
  }, []);

  // Always render 2024 on server, update on client
  return <span suppressHydrationWarning={true}>{isClient ? year : 2024}</span>;
} 