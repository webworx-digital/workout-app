import { useState, useEffect } from "react";

interface DeviceInfo {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  userAgent: string;
}

export function useDeviceInfo(): DeviceInfo {
  const getDeviceInfo = (): DeviceInfo => {
    const width = typeof window !== "undefined" ? window.innerWidth : 0;
    const height = typeof window !== "undefined" ? window.innerHeight : 0;
    const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";

    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    return {
      width,
      height,
      isMobile: width <= 767,
      isTablet: width >= 768 && width <= 1024,
      isDesktop: width > 1024,
      isTouchDevice,
      userAgent,
    };
  };

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(getDeviceInfo);

  useEffect(() => {
    const handleResize = () => setDeviceInfo(getDeviceInfo());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceInfo;
}
