import {
    BottomTabScreenProps,
    createBottomTabNavigator,
  } from '@react-navigation/bottom-tabs';
  import { CompositeScreenProps } from '@react-navigation/native';
  import { StackScreenProps } from '@react-navigation/stack';
  import { StyleSheet } from 'react-native';
  
  import { HomeScreen, AlertScreen} from '../screens';
//   import { Theme } from '../theme/main';
  import { NavigationKey } from './NavigationKey';
  import { RootStackParamList } from './RootNavigator';
import { TabIcon } from '../components/navigation/TabIcon';
import React from 'react';
  
  export type MainTabParamList = {
    [NavigationKey.HomeScreen]: undefined;
    [NavigationKey.AlertScreen]: undefined;
  };
  
  //if we need to take navigation prop and use it in this componennt
  type MainTabScreenProps = CompositeScreenProps<
    StackScreenProps<RootStackParamList, NavigationKey.MainTabNavigator>,
    BottomTabScreenProps<MainTabParamList>
  >;
  
  const Tab = createBottomTabNavigator<MainTabParamList>();
  export const MainTabNavigator: React.FC<MainTabScreenProps> = () => {

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: props => <TabIcon {...props} route={route} />,
        //   tabBarActiveTintColor: Theme.light.colors.primary,
          tabBarStyle: styles.tabBar,
        })}
        initialRouteName={NavigationKey.HomeScreen}>
        <Tab.Screen name={NavigationKey.HomeScreen} component={HomeScreen} />
        <Tab.Screen
          name={NavigationKey.AlertScreen}
          component={AlertScreen}
        />
      </Tab.Navigator>
    );
  };
  
  const styles = StyleSheet.create({
    tabBar: {
      elevation: 0,
      borderTopWidth: 0,
    },
  });