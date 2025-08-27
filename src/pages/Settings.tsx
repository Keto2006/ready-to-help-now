import { User, Phone, Clock, Bluetooth, Shield, Globe, Moon } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserSettings } from "@/types/disaster";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const [settings, setSettings] = useLocalStorage<UserSettings>('safeZoneSettings', {
    personalData: { name: '', age: null, bloodType: '', conditions: [] },
    emergencyContacts: [],
    okTimeout: 10,
    privacySettings: { allowLocationSharing: true, allowMedicalData: false },
    language: 'en',
    darkMode: false
  });

  const toggleDarkMode = () => {
    setSettings({ ...settings, darkMode: !settings.darkMode });
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="mobile-container pb-20">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Data</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Configure your personal information for emergency situations
            </p>
            <Button variant="outline" className="w-full">
              Update Personal Info
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Emergency Contacts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add people to notify in emergency situations
            </p>
            <Button variant="outline" className="w-full">
              Manage Contacts
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>I'm OK Timeout</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={settings.okTimeout.toString()}
              onValueChange={(value) => setSettings({
                ...settings,
                okTimeout: parseInt(value) as 5 | 10 | 15
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Privacy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Location Sharing</span>
              <Switch
                checked={settings.privacySettings.allowLocationSharing}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  privacySettings: { ...settings.privacySettings, allowLocationSharing: checked }
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Medical Data Storage</span>
              <Switch
                checked={settings.privacySettings.allowMedicalData}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  privacySettings: { ...settings.privacySettings, allowMedicalData: checked }
                })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Moon className="h-5 w-5" />
              <span>Appearance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark Mode</span>
              <Switch checked={settings.darkMode} onCheckedChange={toggleDarkMode} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;