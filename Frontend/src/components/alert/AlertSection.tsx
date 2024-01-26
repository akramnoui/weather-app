import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';

interface AlertSectionProps {
  title: string;
  alerts: any[]; // Adjust the type based on your alert structure
}

const AlertSection: React.FC<AlertSectionProps> = ({ title, alerts }) => {
  return (
    <View style={styles.alertSectionContainer}>
      <Text style={styles.alertTitle}>{title}</Text>
      {alerts.map((alert, alertIndex) => (

        alert.msgtype != "" ? (
          <View key={alertIndex} style={styles.alertContainer}>
            <Text style={styles.alertHeadline}>{alert.severity} {alert.event}</Text>
            <Text style={styles.alertCategory}>{alert.category}</Text>

            <View style={styles.areasContainer}>
              <ScrollView horizontal>
                {alert.areas.split(";").map((area, areaIndex) => (
                  <TouchableOpacity key={areaIndex}>
                    <Text>{area}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <Text style={styles.alertTime}>{`Effective: ${alert.effective} - Expires: ${alert.expires}`}</Text>
          </View>
        ) : (null)

      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  alertSectionContainer: {
    marginBottom: 20,
    padding: 20,
    alignSelf: 'center',
  },
  alert: {
    marginBottom: 15,
  },
  alertTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  alertContainer: {

    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
    elevation: 5,
  },
  alertCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: 'white',
  },
  alertDesc: {
    fontSize: 14,
    marginBottom: 6,
    color: 'white',
  },
  alertTime: {
    fontSize: 14,
    color: 'white',
  },
  alertHeadline: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#71797E',
  },
  areasContainer: {
    flexDirection: "row", 
    flexWrap: 'nowrap'
  }

});

export default AlertSection;
