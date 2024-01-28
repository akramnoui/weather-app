import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

import { HomeScreen, AlertScreen, Preferences } from '../screens';
//   import { Theme } from '../theme/main';
import { NavigationKey } from './NavigationKey';
import { RootStackParamList } from './RootNavigator';
import { TabIcon } from '../components/navigation/TabIcon';
import React, { useEffect } from 'react';
import Threshold_Settings from '../screens/Threshold_Settings';



export type MainTabParamList = {
  [NavigationKey.HomeScreen]: undefined;
  [NavigationKey.AlertScreen]: undefined;
  [NavigationKey.Preferences]: undefined;
  [NavigationKey.Threshold_Settings]: undefined;

};

//if we need to take navigation prop and use it in this componennt
type MainTabScreenProps = CompositeScreenProps<
  StackScreenProps<RootStackParamList, NavigationKey.MainTabNavigator>,
  BottomTabScreenProps<MainTabParamList>
>;



const Tab = createBottomTabNavigator<MainTabParamList>();
export const MainTabNavigator: React.FC<MainTabScreenProps> = () => {

  const [isDaytime, setIsDaytime] = React.useState(true)

  const daytimeColors = '#87CEEB'
  const nighttimeColors = '#001F3F'


  const backgroundColors = isDaytime ? daytimeColors : nighttimeColors

  useEffect(() => {
    // Determine if it's daytime or nighttime based on the current time
    const currentHour = new Date().getHours();
    setIsDaytime(currentHour >= 6 && currentHour < 18);
  })

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: props => <TabIcon {...props} route={route} />,
        //   tabBarActiveTintColor: Theme.light.colors.primary,
        tabBarStyle: styles(backgroundColors).tabBar,
      })}
      initialRouteName={NavigationKey.HomeScreen}>
      <Tab.Screen name={NavigationKey.HomeScreen} component={HomeScreen} />
      <Tab.Screen
        name={NavigationKey.AlertScreen}
        component={AlertScreen}
      />
      <Tab.Screen
        name={NavigationKey.Preferences}
        component={Preferences}
      />

      <Tab.Screen
        name={NavigationKey.Threshold_Settings}
        component={Threshold_Settings}
      />
    </Tab.Navigator>
  );
};

const styles = (backgroundColors) => StyleSheet.create({
  tabBar: {
    elevation: 0,
    borderTopWidth: 0,
    borderTopWidth: 0.8,
    backgroundColor: backgroundColors,
    borderBlockColor: 'white',
    borderCurve: 'circular'
  },
  linearGradient: {
    flex: 1,
    height: '100%',
    width: '100%'
  }
});