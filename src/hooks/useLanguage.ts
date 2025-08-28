import { useLocalStorage } from './useLocalStorage';

export type Language = 'en' | 'ru' | 'am';

interface Translations {
  [key: string]: {
    en: string;
    ru: string;
    am: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { en: 'Home', ru: 'Главная', am: 'Գլխավոր' },
  events: { en: 'Events', ru: 'События', am: 'Իրադարձություններ' },
  devices: { en: 'Devices', ru: 'Устройства', am: 'Սարքեր' },
  settings: { en: 'Settings', ru: 'Настройки', am: 'Կարգավորումներ' },
  
  // Settings page
  personalData: { en: 'Personal Data', ru: 'Личные данные', am: 'Անձնական տվյալներ' },
  emergencyContacts: { en: 'Emergency Contacts', ru: 'Экстренные контакты', am: 'Արտակարգ կապեր' },
  language: { en: 'Language', ru: 'Язык', am: 'Լեզու' },
  appearance: { en: 'Appearance', ru: 'Внешний вид', am: 'Տեսք' },
  privacy: { en: 'Privacy', ru: 'Конфиденциальность', am: 'Գաղտնիություն' },
  
  // Language options
  english: { en: 'English', ru: 'Английский', am: 'Անգլերեն' },
  russian: { en: 'Russian', ru: 'Русский', am: 'Ռուսերեն' },
  armenian: { en: 'Armenian', ru: 'Армянский', am: 'Հայերեն' },
  
  // Buttons and actions
  updatePersonalInfo: { en: 'Update Personal Info', ru: 'Обновить личную информацию', am: 'Թարմացնել անձնական տվյալները' },
  manageContacts: { en: 'Manage Contacts', ru: 'Управление контактами', am: 'Կառավարել կապերը' },
  addNewDevice: { en: 'Add New Device', ru: 'Добавить новое устройство', am: 'Ավելացնել նոր սարք' },
  connectedDevices: { en: 'Connected Devices', ru: 'Подключенные устройства', am: 'Միացված սարքեր' },
  
  // Common
  darkMode: { en: 'Dark Mode', ru: 'Темная тема', am: 'Մուգ թեմա' },
  locationSharing: { en: 'Location Sharing', ru: 'Обмен местоположением', am: 'Տեղակայության կիսում' },
  medicalDataStorage: { en: 'Medical Data Storage', ru: 'Хранение медицинских данных', am: 'Բժշկական տվյալների պահպանում' },
  
  // Safety button
  imOk: { en: "I'm OK", ru: 'Я в порядке', am: 'Ես լավ եմ' },
  emergency: { en: 'Emergency', ru: 'Экстренная ситуация', am: 'Արտակարգ իրավիճակ' },
  sharingLocation: { en: 'Sharing Location...', ru: 'Передача местоположения...', am: 'Տեղակայության փոխանցում...' }
};

export const useLanguage = () => {
  const [language, setLanguage] = useLocalStorage<Language>('appLanguage', 'am');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return { language, setLanguage, t };
};