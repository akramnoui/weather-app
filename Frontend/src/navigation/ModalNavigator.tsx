import {
    createStackNavigator,
    StackNavigationOptions,
  } from '@react-navigation/stack';
  import { FC } from 'react';
  
  import { AlertScreen } from '../screens';
  import { NavigationKey } from './NavigationKey';
import AddThreshold from '../screens/AddThreshold';
  
  
  export type ModalStackParamList = {
    [NavigationKey.AddThreshold]: {
    };
  };
  
  const Stack = createStackNavigator<ModalStackParamList>();
  
  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  };
  
  export const ModalNavigator: FC = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={NavigationKey.AddThreshold} component={AddThreshold} />
      </Stack.Navigator>
    );
  };