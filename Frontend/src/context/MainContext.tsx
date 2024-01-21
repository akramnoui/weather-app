import {
    FC,
    PropsWithChildren,
    useMemo,
  } from 'react';
  import { createCtx } from '../util/context';
  import { usePersistStorage } from 'react-native-use-persist-storage';

  
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
  };
  export const [useMainCtx, MainContext] = createCtx<MainContextType>();

export const MainContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [city, setCity, restored] = usePersistStorage<string>('@city', 'Dublin');
  const [prefferedCities, SetPrefferedCities, restoredPreferences] = usePersistStorage<string[]>('@preferred', []);
  const [uid, setUid, restoredUid] = usePersistStorage<string | null>('@uid', null); // Persist UID in local storage

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
      restoredUid
    }),
    [city, restored, prefferedCities, restoredPreferences, uid, setUid, restoredUid],
  );

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};