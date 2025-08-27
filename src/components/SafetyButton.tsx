import { useState, useEffect, useCallback } from "react";
import { Shield, ShieldAlert, MapPin } from "lucide-react";
import { SafetyButtonState } from "@/types/disaster";
import { cn } from "@/lib/utils";

interface SafetyButtonProps {
  state: SafetyButtonState;
  onPress: () => void;
  timeRemaining?: number;
}

const SafetyButton = ({ state, onPress, timeRemaining }: SafetyButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = useCallback(() => {
    setIsPressed(true);
    onPress();
    // Reset pressed state after animation
    setTimeout(() => setIsPressed(false), 200);
  }, [onPress]);

  const getButtonContent = () => {
    switch (state) {
      case 'normal':
        return (
          <>
            <Shield className="h-12 w-12 mb-2" />
            <span>I'm OK</span>
          </>
        );
      case 'alert':
        return (
          <>
            <ShieldAlert className="h-12 w-12 mb-2" />
            <div className="flex flex-col items-center">
              <span>I'm OK</span>
              {timeRemaining && (
                <span className="text-sm font-normal mt-1">
                  {Math.floor(timeRemaining / 60)}:
                  {String(timeRemaining % 60).padStart(2, '0')}
                </span>
              )}
            </div>
          </>
        );
      case 'sharing':
        return (
          <>
            <MapPin className="h-12 w-12 mb-2 animate-pulse" />
            <span className="text-lg">Sharing Location</span>
          </>
        );
      default:
        return null;
    }
  };

  const getButtonClasses = () => {
    const baseClasses = "safety-button";
    const stateClasses = {
      normal: "safety-button-normal",
      alert: "safety-button-alert",
      sharing: "safety-button-sharing",
    };
    
    return cn(
      baseClasses,
      stateClasses[state],
      isPressed && "scale-90"
    );
  };

  return (
    <button
      onClick={handlePress}
      disabled={state === 'sharing'}
      className={getButtonClasses()}
      aria-label={`Safety button - ${state} state`}
    >
      {getButtonContent()}
    </button>
  );
};

export default SafetyButton;