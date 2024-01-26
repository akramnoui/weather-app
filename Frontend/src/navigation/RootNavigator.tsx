import { type NavigatorScreenParams } from '@react-navigation/core'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  type StackNavigationOptions
} from '@react-navigation/stack'
import React, { useMemo, type FC } from 'react'

import { MainTabNavigator, type MainTabParamList } from './MainTabNavigator'
import { NavigationKey } from './NavigationKey'
import { MainContextProvider } from '../context/MainContext'
import { ModalNavigator } from './ModalNavigator'

export interface RootStackParamList {
  [NavigationKey.MainTabNavigator]: NavigatorScreenParams<MainTabParamList>
  [NavigationKey.ModalNavigator]: NavigatorScreenParams<MainTabParamList>

}

export const Stack = createStackNavigator<RootStackParamList>()

const rootScreenOptions: StackNavigationOptions = {
  headerShown: false
}

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
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name={NavigationKey.ModalNavigator}
            component={ModalNavigator}
          />
        </Stack.Group>
      </>
    )
  }, [])

  return (
    <MainContextProvider>

      <Stack.Navigator screenOptions={rootScreenOptions}>
        {screens}
      </Stack.Navigator>

   </MainContextProvider>

  )
}

export default () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
)
