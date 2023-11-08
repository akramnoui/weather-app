import { ActivityIndicator, ColorValue, StyleSheet, View } from 'react-native';


interface LoaderProps {
  color?: ColorValue;
  size?: number | 'small' | 'large';
}

export const Loader: React.FC<LoaderProps> = ({
  color = 'blue',
  size = 'large',
}) => (
  <View style={styles.container}>
    <ActivityIndicator color={color} size={size} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});