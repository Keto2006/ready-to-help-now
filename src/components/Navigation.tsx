import { Home, MapPin, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-card border-t border-card-border">
      <div className="flex items-center justify-around p-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "nav-tab",
              isActive ? "nav-tab-active" : "nav-tab-inactive"
            )
          }
        >
          <Home className="h-5 w-5 mx-auto mb-1" />
          <span className="text-xs">Home</span>
        </NavLink>

        <NavLink
          to="/events"
          className={({ isActive }) =>
            cn(
              "nav-tab",
              isActive ? "nav-tab-active" : "nav-tab-inactive"
            )
          }
        >
          <MapPin className="h-5 w-5 mx-auto mb-1" />
          <span className="text-xs">Events</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "nav-tab",
              isActive ? "nav-tab-active" : "nav-tab-inactive"
            )
          }
        >
          <Settings className="h-5 w-5 mx-auto mb-1" />
          <span className="text-xs">Settings</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;