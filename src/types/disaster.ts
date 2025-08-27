export type DisasterType = 'fire' | 'earthquake' | 'flood' | 'landslide';

export type SeverityLevel = 'low' | 'medium' | 'high';

export interface Disaster {
  id: string;
  type: DisasterType;
  title: string;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  severity: SeverityLevel;
  date: string; // ISO string
  distance: number; // km from user
  affected: number; // number of people affected
  description: string;
  safetyInstructions: string[];
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  region: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface UserSettings {
  personalData: {
    name: string;
    age: number | null;
    bloodType: string;
    conditions: string[];
  };
  emergencyContacts: EmergencyContact[];
  okTimeout: 5 | 10 | 15; // minutes
  privacySettings: {
    allowLocationSharing: boolean;
    allowMedicalData: boolean;
  };
  language: 'en' | 'ru' | 'am';
  darkMode: boolean;
}

export type SafetyButtonState = 'normal' | 'alert' | 'sharing';