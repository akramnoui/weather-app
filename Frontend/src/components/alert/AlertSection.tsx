import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
     <View key={alertIndex} style={styles.alertContainer}>
     <Text style={styles.alertHeadline}>{alert.headline}</Text>
     <Text style={styles.alertCategory}>{alert.category}</Text>
     <Text style={styles.alertDesc}>{alert.desc}</Text>
     <Text style={styles.alertTime}>{`Effective: ${alert.effective} - Expires: ${alert.expires}`}</Text>
   </View>
   
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  alertContainer: {
 
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  alertCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  alertDesc: {
    fontSize: 16,
    marginBottom: 6,
    color: '#555',
  },
  alertTime: {
    fontSize: 14,
    color: '#777',
  },
  alertHeadline: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  
});

export default AlertSection;
