"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import MobileNavigation from "@/components/MobileNavigation/MobileNavigation";

export default function NavigationWrapper() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileNavigation /> : <Header />;
}