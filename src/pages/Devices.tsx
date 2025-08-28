import React, { useState } from 'react';
import { ArrowLeft, Plus, Smartphone, Watch, Heart, Activity, Droplets, Battery, BatteryLow, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Device {
  id: string;
  name: string;
  type: 'smartwatch' | 'fitness_tracker' | 'phone';
  serialNumber: string;
  batteryLevel: number;
  healthData: {
    heartRate?: number;
    steps?: number;
    oxygenLevel?: number;
  };
  lastSync: string;
}

const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Apple Watch Series 9',
    type: 'smartwatch',
    serialNumber: 'AW-2023-789456',
    batteryLevel: 78,
    healthData: {
      heartRate: 72,
      steps: 8453,
      oxygenLevel: 98
    },
    lastSync: '2 minutes ago'
  },
  {
    id: '2',
    name: 'Fitbit Charge 5',
    type: 'fitness_tracker',
    serialNumber: 'FB-CH5-123789',
    batteryLevel: 34,
    healthData: {
      heartRate: 68,
      steps: 12847
    },
    lastSync: '1 hour ago'
  },
  {
    id: '3',
    name: 'iPhone 15 Pro',
    type: 'phone',
    serialNumber: 'IP15-PRO-456123',
    batteryLevel: 92,
    healthData: {
      steps: 7834
    },
    lastSync: 'Just now'
  }
];

const Devices = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Device[]>(mockDevices);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'smartwatch':
        return <Watch className="h-5 w-5" />;
      case 'fitness_tracker':
        return <Activity className="h-5 w-5" />;
      case 'phone':
        return <Smartphone className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  const getBatteryIcon = (level: number) => {
    if (level < 20) {
      return <BatteryLow className="h-4 w-4 text-destructive" />;
    }
    return <Battery className="h-4 w-4 text-muted-foreground" />;
  };

  const getBatteryColor = (level: number) => {
    if (level < 20) return 'text-destructive';
    if (level < 50) return 'text-warning';
    return 'text-success';
  };

  const removeDevice = (deviceId: string) => {
    setDevices(devices.filter(device => device.id !== deviceId));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-card-border">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Connected Devices</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Add Device Button */}
        <Button 
          className="w-full"
          onClick={() => {/* Add device logic */}}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Device
        </Button>

        {/* Devices List */}
        <div className="space-y-4">
          {devices.map((device) => (
            <Card key={device.id} className="relative">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                      {getDeviceIcon(device.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{device.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {device.serialNumber}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Last sync: {device.lastSync}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDevice(device.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Battery Status */}
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    {getBatteryIcon(device.batteryLevel)}
                    <span className="text-sm font-medium">Battery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold ${getBatteryColor(device.batteryLevel)}`}>
                      {device.batteryLevel}%
                    </span>
                    {device.batteryLevel < 20 && (
                      <Badge variant="destructive" className="text-xs">
                        Low
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Health Data */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">Health Data</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {device.healthData.heartRate && (
                      <div className="flex items-center justify-between p-2 bg-accent/20 rounded">
                        <div className="flex items-center space-x-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span className="text-sm">Heart Rate</span>
                        </div>
                        <span className="text-sm font-medium">
                          {device.healthData.heartRate} BPM
                        </span>
                      </div>
                    )}
                    
                    {device.healthData.steps && (
                      <div className="flex items-center justify-between p-2 bg-accent/20 rounded">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Steps</span>
                        </div>
                        <span className="text-sm font-medium">
                          {device.healthData.steps.toLocaleString()}
                        </span>
                      </div>
                    )}
                    
                    {device.healthData.oxygenLevel && (
                      <div className="flex items-center justify-between p-2 bg-accent/20 rounded">
                        <div className="flex items-center space-x-2">
                          <Droplets className="h-4 w-4 text-cyan-500" />
                          <span className="text-sm">Blood Oxygen</span>
                        </div>
                        <span className="text-sm font-medium">
                          {device.healthData.oxygenLevel}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {devices.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-muted/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Watch className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Devices Connected
            </h3>
            <p className="text-muted-foreground mb-4">
              Connect your first device to start monitoring your health data.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Device
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Devices;