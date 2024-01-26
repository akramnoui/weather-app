import {
  FC,
  PropsWithChildren,
  useMemo,
} from 'react';
import { createCtx } from '../util/context';
import { usePersistStorage } from 'react-native-use-persist-storage';

type Threshold = {
  windSpeed?: number;
  temperature?: number;
  precipitationLevel?: number;
  humidityLevel?: number;
  thresholdType?: string;
  type: string;
};

type MainContextType = {
  city: string;
  setCity: any;
  restored: boolean;
  prefferedCities: any[];
  SetPrefferedCities: any; 
  restoredPreferences: any;
  uid: string | null; 
  setUid: any;
  restoredUid: boolean;
  thresholds: Threshold[]; // Updated type for thresholds
  setThresholds: any;
};

export const [useMainCtx, MainContext] = createCtx<MainContextType>();

export const MainContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [city, setCity, restored] = usePersistStorage<string>('@city', 'Paris');
  const [prefferedCities, SetPrefferedCities, restoredPreferences] = usePersistStorage<string[]>('@preferred', []);
  const [uid, setUid, restoredUid] = usePersistStorage<string | null>('@uid', null);
  const [thresholds, setThresholds] = usePersistStorage<Threshold[]>('@thresholds', []); // New state for thresholds

  const value = useMemo(
    () => ({
      city,
      setCity,
      restored,
      prefferedCities,
      SetPrefferedCities,
      restoredPreferences,
      uid,
      setUid,
      restoredUid,
      thresholds,
      setThresholds,
    }),
    [city, restored, prefferedCities, restoredPreferences, uid, setUid, restoredUid, thresholds, setThresholds],
  );

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
