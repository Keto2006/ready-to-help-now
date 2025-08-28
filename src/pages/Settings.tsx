import { User, Phone, Clock, Bluetooth, Shield, Globe, Moon } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useLanguage } from "@/hooks/useLanguage";
import { UserSettings } from "@/types/disaster";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();
  const [personalDataDialog, setPersonalDataDialog] = useState(false);
  const [contactsDialog, setContactsDialog] = useState(false);
  
  const [settings, setSettings] = useLocalStorage<UserSettings>('safeZoneSettings', {
    personalData: { name: '', age: null, bloodType: '', conditions: [] },
    emergencyContacts: [],
    okTimeout: 10,
    privacySettings: { allowLocationSharing: true, allowMedicalData: false },
    language: 'am',
    darkMode: false
  });

  const [personalData, setPersonalData] = useState(settings.personalData);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });

  const toggleDarkMode = () => {
    setSettings({ ...settings, darkMode: !settings.darkMode });
    document.documentElement.classList.toggle('dark');
  };

  const handleLanguageChange = (newLanguage: 'en' | 'ru' | 'am') => {
    setLanguage(newLanguage);
    setSettings({ ...settings, language: newLanguage });
    toast({
      title: t('language'),
      description: `${t('language')} ${t(newLanguage === 'en' ? 'english' : newLanguage === 'ru' ? 'russian' : 'armenian')}`,
    });
  };

  const savePersonalData = () => {
    setSettings({ ...settings, personalData });
    setPersonalDataDialog(false);
    toast({
      title: t('personalData'),
      description: "Personal information updated successfully",
    });
  };

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      const contact = {
        id: Date.now().toString(),
        ...newContact
      };
      setSettings({
        ...settings,
        emergencyContacts: [...settings.emergencyContacts, contact]
      });
      setNewContact({ name: '', phone: '', relationship: '' });
      toast({
        title: t('emergencyContacts'),
        description: "Emergency contact added successfully",
      });
    }
  };

  return (
    <div className="mobile-container pb-20">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">{t('settings')}</h1>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>{t('language')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="am">{t('armenian')}</SelectItem>
                <SelectItem value="ru">{t('russian')}</SelectItem>
                <SelectItem value="en">{t('english')}</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{t('personalData')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Configure your personal information for emergency situations
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setPersonalDataDialog(true)}
            >
              {t('updatePersonalInfo')}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>{t('emergencyContacts')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add people to notify in emergency situations
            </p>
            <div className="space-y-2">
              {settings.emergencyContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.phone} - {contact.relationship}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => setContactsDialog(true)}
            >
              {t('manageContacts')}
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
              <span>{t('privacy')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">{t('locationSharing')}</span>
              <Switch
                checked={settings.privacySettings.allowLocationSharing}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  privacySettings: { ...settings.privacySettings, allowLocationSharing: checked }
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">{t('medicalDataStorage')}</span>
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
              <span>{t('appearance')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm">{t('darkMode')}</span>
              <Switch checked={settings.darkMode} onCheckedChange={toggleDarkMode} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personal Data Dialog */}
      <Dialog open={personalDataDialog} onOpenChange={setPersonalDataDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('personalData')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={personalData.name}
                onChange={(e) => setPersonalData({ ...personalData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={personalData.age || ''}
                onChange={(e) => setPersonalData({ ...personalData, age: parseInt(e.target.value) || null })}
              />
            </div>
            <div>
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select value={personalData.bloodType} onValueChange={(value) => setPersonalData({ ...personalData, bloodType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={savePersonalData} className="w-full">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Emergency Contacts Dialog */}
      <Dialog open={contactsDialog} onOpenChange={setContactsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('emergencyContacts')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactName">Name</Label>
              <Input
                id="contactName"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Phone</Label>
              <Input
                id="contactPhone"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="contactRelationship">Relationship</Label>
              <Input
                id="contactRelationship"
                value={newContact.relationship}
                onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
              />
            </div>
            <Button onClick={addContact} className="w-full">
              Add Contact
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;