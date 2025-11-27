import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import ParkingSpotPage from "./pages/ParkingSpotPage.jsx";
import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore.js";
import { Toaster } from "react-hot-toast";

function App() {
  const { theme } = useThemeStore();
  
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={ theme }>
      
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/parkingSpot/:id" element={<ParkingSpotPage />} />
      </Routes>

      <Toaster />

    </div>
  );
}

export default App;
