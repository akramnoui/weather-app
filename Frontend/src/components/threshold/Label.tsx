import { Chip } from '@rneui/base';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { ChipProps, colors } from 'react-native-elements';

interface Props extends ChipProps {}

export const Label: FC<Props> = (props): JSX.Element => (
  <Chip
    type='outline'
    titleStyle={styles.title}
    containerStyle={styles.container}
    buttonStyle={styles.label}
    {...props}
  />
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 5,
  },
  label: {
    borderRadius: 60,
    borderColor: 'blue',
    borderWidth: 1,
  },
  title: {
    color: colors.black,
  },
});