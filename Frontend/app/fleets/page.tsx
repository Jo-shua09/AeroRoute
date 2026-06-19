"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sidebar } from "@/components/aero/Sidebar";
import { MapCanvas, type LayerToggles } from "@/components/aero/MapCanvas";
import { BottomBar } from "@/components/aero/BottomBar";
import { TopBar } from "@/components/aero/TopBar";
import { CommuterModal } from "@/components/aero/CommuterModal";
import { FleetView, TimelineView, SettingsView } from "@/components/aero/SectionViews";
import { RightPanel } from "@/components/aero/RightPanel"; // Kept import as it seems used
import { TimelineDrawer } from "@/components/aero/TimelineDrawer";
import { navItems, type NavId } from "@/lib/dummy-data";
import { useAero } from "@/lib/store";

export default function FleetDashboard() {
  const [active, setActive] = useState<NavId>("orchestration");
  const [modalOpen, setModalOpen] = useState(false);
  const [layers, setLayers] = useState<LayerToggles>({ heatmap: true, hazards: true, fleets: true });

  const rightOpen = useAero((s) => s.rightPanelOpen);
  const setRightPanelOpen = useAero((s) => s.setRightPanelOpen);
  const mobileNav = useAero((s) => s.mobileNavOpen);
  const setMobileNav = useAero((s) => s.setMobileNavOpen);

  // Update document title on client side since this is a client component
  useEffect(() => {
    document.title = "Command Center — AeroRoute";
  }, []);

  // Close the active left dashboard tab when the AI Engine is opened
  useEffect(() => {
    if (rightOpen) {
      setActive("orchestration");
    }
  }, [rightOpen]);

  // Close the AI Engine when a left dashboard tab is opened
  useEffect(() => {
    if (active !== "orchestration") {
      setRightPanelOpen(false);
    }
  }, [active, setRightPanelOpen]);

  const activeLabel = navItems.find((n) => n.id === active)?.label ?? "";

  const handleNav = (id: NavId) => {
    setActive(id);
    setMobileNav(false);
  };

  return (
    <div className="fixed inset-0 flex bg-background text-foreground overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex h-full overflow-visible relative">
        <Sidebar active={active} onChange={setActive} onSimulate={() => setModalOpen(true)} />
      </div>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {mobileNav && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNav(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-[280px]"
            >
              <Sidebar
                active={active}
                onChange={handleNav}
                onSimulate={() => {
                  setModalOpen(true);
                  setMobileNav(false);
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="relative flex-1 min-w-0">
        <MapCanvas layers={layers} />
        <TopBar section={activeLabel} />

        <AnimatePresence mode="wait">
          {active === "fleet" && <FleetView key="fleet" />}
          {active === "timeline" && <TimelineView key="timeline" />}
          {active === "settings" && <SettingsView key="settings" />}
        </AnimatePresence>

        <RightPanel />
        <BottomBar layers={layers} onToggle={(k) => setLayers((prev) => ({ ...prev, [k]: !prev[k] }))} rightOpen={rightOpen} />
      </main>

      <CommuterModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <TimelineDrawer />
    </div>
  );
}
