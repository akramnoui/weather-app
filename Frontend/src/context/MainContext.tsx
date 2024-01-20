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
  };
  
  export const [useMainCtx, MainContext] = createCtx<MainContextType>();
  
  export const MainContextProvider: FC<PropsWithChildren<{}>> = ({
    children,
  }) => {
    const [city, setCity, restored] =
    usePersistStorage<string>('@city', 'Dublin');

    const [prefferedCities, SetPrefferedCities, restoredPreferences] =
    usePersistStorage<string[]>('@preferred', []);
  
    const value = useMemo(
      () => ({
        city,
        setCity,
        restored,
        prefferedCities, SetPrefferedCities, restoredPreferences
      }),
      [city, restored,  prefferedCities, restoredPreferences],
    );
  
    return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
  };
  