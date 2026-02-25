"use client";

import React, { useEffect, useState } from "react";
import { Calendar1, Clock } from "lucide-react";
// Live Date
const LiveDate = () => {
  // now
  const [now, setNow] = useState<Date | null>(null);

  // when component mounts
  useEffect(() => {
    // set the current date
    setNow(new Date());
    // then change it after every second
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    // clean up interval
    return () => clearInterval(interval);
  }, []);

  // if no date, return null
  if (!now) return null;

  return (
    <div className="flex justify-center items-center gap-2 text-muted-foreground">
      <Calendar1 className="w-5 h-5 shrink-0" />
      <span>{now.toDateString()}</span>
      <span className="text-muted-foreground/40">—</span>
      <Clock className="w-5 h-5 shrink-0" />
      <span className="font-semibold tabular-nums min-w-[6rem] inline-block">
        {now.toLocaleTimeString()}
      </span>
    </div>
  );
};

export default LiveDate;
