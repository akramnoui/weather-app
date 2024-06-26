import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import AlertSection from './AlertSection';

interface WeatherAlertProps {
  cityAlerts: {
    city: string;
    alerts: any[]; // Adjust the type based on your alert structure
    coordinates: { lat: string, long: string };
  };
}

const WeatherAlert: React.FC<WeatherAlertProps> = ({ cityAlerts }) => {

  return (
    <View style={styles.alertContainer}>
      {cityAlerts.alerts.length > 0 ? (
        <AlertSection title={`Alerts for ${cityAlerts.city}`} alerts={cityAlerts.alerts} />

      ) : (
        <Text style={styles.noAlerts}>{`No weather alerts for ${cityAlerts.city} currently.`}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
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
    paddingBottom: 10,
    paddingHorizontal: 10,
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
  alertCategory: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  alertDesc: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  alertTime: {
    fontSize: 12,
    color: '#777',
  },
  noAlerts: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
});

export default WeatherAlert;
