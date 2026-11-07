import Header from "./components/Header/Header";
import Tabs from "./components/Tabs/Tabs";
import UIPage from "./pages/UIPage/UIPage";
import GuidePage from "./pages/GuidePage/GuidePage";
import RequirementsPage from "./pages/RequirementsPage/RequirementsPage";
import { useState } from "react";
export default function App() {
  const [activeTabs, setActiveTabs] = useState("ui");
  return (
    <>
      <Header />
      <Tabs activeTabs={activeTabs} setActiveTabs={setActiveTabs} />
      {activeTabs === "ui" && <UIPage />}

      {activeTabs === "req" && <RequirementsPage />}

      {activeTabs === "guide" && <GuidePage />}
    </>
  );
}
