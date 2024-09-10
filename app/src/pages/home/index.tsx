import MapComponent from "@/components/MapComponent";
import MapPopup from "@/components/MapPopup";
import Modals from "@/components/Modals";
import Controllers from "@/components/ui/controllers";
import Navbar from "@/components/ui/navbar";
import TopNav from "@/components/ui/topnav";
import React from "react";

const HomePage: React.FC = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    return storedTheme ?? "light";
  });

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <React.Fragment>
      <TopNav />
      <Controllers theme={theme} setTheme={setTheme} />
      <Navbar />
      <MapComponent theme={theme} />
      <MapPopup />
      <Modals />
    </React.Fragment>
  );
};

export default HomePage;
