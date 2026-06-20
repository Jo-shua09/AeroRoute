"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { AeroLoader } from "@/components/aero/AeroLoader";
import { MapCanvas, type LayerToggles } from "@/components/aero/MapCanvas";
import { VehicleDashboardHUD, type VehicleDashboardRoute } from "@/components/aero/VehicleDashboardHUD";

export default function DriverDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [hazardActive, setHazardActive] = useState(false);

  const route: VehicleDashboardRoute = useMemo(
    () => ({
      routeName: "Route Alpha: Main Pavilion - Gate B",
      shuttleId: "SH-2026",
      baseSpeedKmh: 35,
      etaDefaultMinsText: "ETA: 4 mins",
      etaHazardMinsText: "ETA: 7 mins",
    }),
    [],
  );

  const layers: LayerToggles = useMemo(
    () => ({
      heatmap: false,
      hazards: false,
      fleets: false,
    }),
    [],
  );

  useEffect(() => {
    document.title = "Vehicle Dashboard - AeroRoute";
  }, []);

  return (
    <>
      <AnimatePresence>{isLoading && <AeroLoader onComplete={() => setIsLoading(false)} />}</AnimatePresence>

      <main className="relative min-h-screen w-full overflow-hidden bg-[#0A0A0A] text-white">
        <div className="absolute inset-0">
          <MapCanvas layers={layers} hazardActive={hazardActive} />
        </div>

        <div className="relative z-10 min-h-screen">
          <VehicleDashboardHUD route={route} hazardActive={hazardActive} onToggleHazard={() => setHazardActive((v) => !v)} />
        </div>
      </main>
    </>
  );
}
