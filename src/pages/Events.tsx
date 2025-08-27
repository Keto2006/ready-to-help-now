import { useState, useEffect } from "react";
import { Flame, Mountain, Droplets, AlertTriangle } from "lucide-react";
import { Disaster, DisasterType } from "@/types/disaster";
import { Badge } from "@/components/ui/badge";

const Events = () => {
  const [disasters, setDisasters] = useState<Disaster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/disasters.json')
      .then(res => res.json())
      .then(data => {
        setDisasters(data.disasters);
        setLoading(false);
      });
  }, []);

  const getDisasterIcon = (type: DisasterType) => {
    switch (type) {
      case 'fire': return <Flame className="h-5 w-5" />;
      case 'earthquake': return <Mountain className="h-5 w-5" />;
      case 'flood': return <Droplets className="h-5 w-5" />;
      case 'landslide': return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getDisasterColor = (type: DisasterType) => {
    const colors = {
      fire: 'disaster-fire',
      earthquake: 'disaster-earthquake', 
      flood: 'disaster-flood',
      landslide: 'disaster-landslide'
    };
    return colors[type];
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-danger text-danger-foreground';
      case 'medium': return 'bg-earthquake text-white';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="mobile-container pb-20">
        <div className="p-6 flex items-center justify-center min-h-96">
          <div className="text-center">Loading events...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container pb-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Recent Events</h1>
        
        <div className="space-y-4">
          {disasters.map((disaster) => (
            <div key={disaster.id} className="bg-card border border-card-border rounded-lg p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${getDisasterColor(disaster.type)}`}>
                  {getDisasterIcon(disaster.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-card-foreground truncate">
                      {disaster.title}
                    </h3>
                    <Badge className={getSeverityColor(disaster.severity)}>
                      {disaster.severity}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {disaster.location} • {disaster.distance}km away
                  </p>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(disaster.date).toLocaleString()}
                  </p>
                  
                  <p className="text-sm mt-2 line-clamp-2">
                    {disaster.description}
                  </p>
                  
                  {disaster.affected > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {disaster.affected} people affected
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;