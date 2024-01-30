import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface AlertSectionProps {
  threshold: Threshold;
}

interface Threshold {
  city: string;
  value: number;
  field: string;
  threshold: string;
  type: string;
  currentValue: number;
}

const camelCaseToNormal = (camelCase: string) => {
  return camelCase.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
};

const ThresholdAlert: React.FC<AlertSectionProps> = ({ threshold }) => {
  const getUnit = () => {
    switch (threshold.field) {
      case 'humidityLevel':
        return '%';
      case 'temperature':
        return '°C';
      case 'windSpeed':
        return 'm/s';
      case 'precipitation':
        return 'mm';
      default:
        return '';
    }
  };

  const unit = getUnit();

  return (
    <View style={styles.alertSectionContainer}>
      <Text style={styles.alertTitle}>Threshold alert for {threshold.city}</Text>
      <View style={styles.alertContainer}>
        <View style={styles.alertHeader}>
          <Image source={require("../../../assets/icons/warning-sign.png")} style={styles.warningIcon} />
          <Text style={styles.alertCategory}>
            {camelCaseToNormal(threshold.field)} is {threshold.type} {threshold.value} {unit}
          </Text>
        </View>
      </View>
      <Text style={styles.alertDesc}>Current value: {threshold.currentValue} {unit}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  alertSectionContainer: {
    marginTop: 50,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Adjust the alpha value for opacity
    backdropFilter: 'blur(10px)', // Apply a blur effect
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  alert: {
    marginBottom: 15,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: 'center',
  },
  warningIcon: {
    marginRight: 7,
    marginBottom: 10,
  },
  alertContainer: {
    borderRadius: 8,
    padding: 12,
    // marginBottom: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
    // elevation: 5,
    // borderBottomColor: "#EDFCFF"
    // backgroundColor: "white"
  },
  alertCategory: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 15,
    color: 'white',
  },
  alertDesc: {
    fontSize: 18,
    marginBottom: 6,
    color: '#FF9800',
    fontFamily: 'Poppins-bold',
  },
  alertTime: {
    fontSize: 14,
    color: 'white',
  },
  alertHeadline: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  areasContainer: {
    flexDirection: "row",
    flexWrap: 'nowrap',
    marginTop: 15
  },
  areaElement: {
    backgroundColor: "rgba(255,255,255, 0.2)",
    borderRadius: 30,
    padding: 10,
    marginHorizontal: 3,
  },
  separator: {
    height: 0.6,
    backgroundColor: '#ccc',
    marginHorizontal: -10,
    marginTop: 15
  }

});

export default ThresholdAlert;
