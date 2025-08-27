import { useState, useEffect } from "react";
import { AlertTriangle, Clock } from "lucide-react";
import SafetyButton from "@/components/SafetyButton";
import { SafetyButtonState, Disaster } from "@/types/disaster";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Home = () => {
  const [buttonState, setButtonState] = useState<SafetyButtonState>('normal');
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [activeDisaster, setActiveDisaster] = useState<Disaster | null>(null);
  const [settings] = useLocalStorage('safeZoneSettings', { okTimeout: 10 });

  useEffect(() => {
    // Load disasters and check for nearby ones
    fetch('/disasters.json')
      .then(res => res.json())
      .then(data => {
        const nearbyDisaster = data.disasters.find((d: Disaster) => d.distance <= 10);
        if (nearbyDisaster) {
          setActiveDisaster(nearbyDisaster);
          setButtonState('alert');
          startCountdown();
        }
      });
  }, []);

  const startCountdown = () => {
    const timeoutMinutes = settings.okTimeout || 10;
    const totalSeconds = timeoutMinutes * 60;
    setTimeRemaining(totalSeconds);

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev && prev > 0) {
          return prev - 1;
        }
        clearInterval(interval);
        setButtonState('sharing');
        return 0;
      });
    }, 1000);
  };

  const handleSafetyPress = () => {
    setButtonState('normal');
    setTimeRemaining(null);
    setActiveDisaster(null);
  };

  const getSafetyInstructions = () => {
    if (!activeDisaster) return null;
    return activeDisaster.safetyInstructions.slice(0, 3);
  };

  return (
    <div className="mobile-container pb-20">
      <div className="p-6 min-h-screen flex flex-col">
        {/* Alert Banner */}
        {buttonState === 'alert' && activeDisaster && (
          <div className="alert-banner alert-banner-danger mb-6">
            <div className="flex items-center justify-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>{activeDisaster.title} within {activeDisaster.distance}km</span>
            </div>
            {timeRemaining && (
              <div className="flex items-center justify-center mt-2 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>Press "I'm OK" in {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}</span>
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          <SafetyButton
            state={buttonState}
            onPress={handleSafetyPress}
            timeRemaining={timeRemaining || undefined}
          />

          {buttonState === 'normal' && (
            <p className="text-center text-muted-foreground text-lg">
              Press to confirm you are safe
            </p>
          )}

          {buttonState === 'sharing' && (
            <div className="text-center space-y-2">
              <p className="text-danger font-medium">
                We are sharing your location with emergency contacts
              </p>
              <p className="text-sm text-muted-foreground">
                Your safety status will be sent automatically
              </p>
            </div>
          )}

          {/* Safety Instructions */}
          {activeDisaster && getSafetyInstructions() && (
            <div className="w-full max-w-sm bg-card border border-card-border rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-center">Safety Instructions</h3>
              <ul className="space-y-2 text-sm">
                {getSafetyInstructions()?.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;