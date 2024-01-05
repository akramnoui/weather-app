import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationKey } from '../../navigation/NavigationKey';
import { sizes } from '../../theme/sizes';
import React from 'react';

import Icon2 from 'react-native-vector-icons/FontAwesome'; 
const SettingsIcon = () => {
  return (
    <View>
      <Icon name="cog" size={30} color="black" /> {}
    </View>
  );
};

export default SettingsIcon;

interface Props {
  focused: boolean;
  color: string;
  size: number;
  route: { name: string };
}

const iconMapper: { [key: string]: string } = {
  [NavigationKey.HomeScreen]: 'home',
  [NavigationKey.AlertScreen]: 'alert',
  [NavigationKey.Preferences]: 'format-list-bulleted',
  [NavigationKey.Settings]: 'cog',

};

export const TabIcon: React.FC<Props> = ({
  focused = false,
  color,
  size,
  route,
}) => {
  return (
    <View style={[styles.tab, focused && styles.tabFocused]}>
      <Icon name={iconMapper[route.name]} color={color} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: sizes.s,
  },
  tabFocused: {
    //backgroundColor: colors.lightgray,
  },
});