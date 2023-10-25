import { NavigatorScreenParams } from '@react-navigation/core';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { useMemo, FC } from 'react';

import { MainTabNavigator, MainTabParamList } from './MainTabNavigator';
import { NavigationKey } from './NavigationKey';

export type RootStackParamList = {
  [NavigationKey.MainTabNavigator]: NavigatorScreenParams<MainTabParamList>;
};

export const Stack = createStackNavigator<RootStackParamList>();

const rootScreenOptions: StackNavigationOptions = {
  headerShown: false,
};

const RootNavigator: FC = () => {

  const screens = useMemo<JSX.Element>(() => {

    return (
      <>
        <Stack.Group>
          <Stack.Screen
            name={NavigationKey.MainTabNavigator}
            component={MainTabNavigator}
          />
        </Stack.Group>
        {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name={NavigationKey.ModalNavigator}
            component={ModalNavigator}
          />
        </Stack.Group> */}
      </>
    );
  }, []);

  return (
    <Stack.Navigator screenOptions={rootScreenOptions}>
      {screens}
    </Stack.Navigator>
  );
};

export default () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);