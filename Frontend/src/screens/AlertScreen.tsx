import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, ScrollView } from "react-native";
import MapView, { Polygon } from 'react-native-maps';
import { getData } from "../storage/asyncStorage";
import { PREFERRED_CITIES_KEY } from "./Preferences";
import { fetchWeatherAlerts } from "../api/weather";
import WeatherAlert from "../components/alert/WeatherAlert";
import { useMainCtx } from "../context/MainContext";
import { Loader } from "../components/misc/Loader";
import { LinearGradient } from "expo-linear-gradient";
import { daytimeColors, nighttimeColors } from "../util/util";

export const AlertScreen: React.FC = () => {
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { prefferedCities, restoredPreferences } = useMainCtx()
  const [isDaytime, setIsDaytime] = React.useState(true)


  useEffect(() => {
    // Determine if it's daytime or nighttime based on the current time
    const currentHour = new Date().getHours();
    setIsDaytime(currentHour >= 6 && currentHour < 18);
    
    const fetchWeatherAlertsForCities = async () => {
      try {
        if (restoredPreferences && prefferedCities) {
          // Fetch alerts for all cities
          const alerts = await Promise.all(prefferedCities.map(async (location: { name: string, coordinates: { lat: string, long: string } }) => {
            const alert = await fetchWeatherAlerts({ cityName: location.name });
            if (alert.alerts.alert.length > 0) {
              return { city: location.name, alerts: alert.alerts.alert, coordinates: location.coordinates };
            } else {
              return null; // Filter out cities with no alerts
            }
          }));

          // Remove null values from the alerts array
          const filteredAlerts = alerts.filter(alert => alert !== null);

          console.log('filtered alerts', filteredAlerts);
          setWeatherAlerts(filteredAlerts);
        }
      } catch (error) {
        console.error("Error fetching weather alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherAlertsForCities();
  }, [restoredPreferences, prefferedCities]);


  const renderAlerts = () => {
    if (weatherAlerts.length > 0) {
      return (
        <ScrollView style={{ paddingBottom: 100 }}>
          {weatherAlerts.map((cityAlerts, index) => (
            // Use the WeatherAlert component here
            <WeatherAlert key={index} cityAlerts={cityAlerts} />
          ))}
        </ScrollView>
      );
    }
    // Your existing code for no alerts
  };


  if (!restoredPreferences) {
    return <Loader />;
  }


  const backgroundColors = isDaytime ? daytimeColors : nighttimeColors
  
  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>
        Alertes meteo
      </Text>
      <LinearGradient
        colors={backgroundColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.background}
      />
      {/* <Image blurRadius={70} source={require("../../assets/images/bg.png")} style={styles.background} /> */}
      {weatherAlerts.length === 0 && (
        <Text style={styles.noAlertText}>
          Il n'y a actuellement aucune alerte dans vos villes favorites
        </Text>
      )}
      {/* Weather Alerts */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={{ color: 'white' }}>Loading...</Text>
        </View>
      ) : renderAlerts()}
    </View>
  );
};


const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  container: {
    position: "absolute",
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  locationText: {
    color: "white",
    textAlign: "center",
    alignSelf: 'center',
    top: 60,
    zIndex: 1,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  noAlertText: {
    color: "white",
    textAlign: "center",
    alignSelf: 'center',
    top: 50,
    zIndex: 1,
    fontSize: 20,
    fontWeight: "normal",
    marginBottom: 30,
    paddingHorizontal: 50,
  },
  // alertContainer: {
  //   position: 'absolute',
  //   bottom: 20,
  //   left: 20,
  //   right: 20,
  //   padding: 20,
  //   borderRadius: 10,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 4,
  //   elevation: 5,
  //   marginBottom: 120,
  //   backgroundColor: 'rgba(255, 255, 255, 0.4)', // Adjust the alpha value for opacity
  //   backdropFilter: 'blur(10px)', // Apply a blur effect
  // },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  // alertTitle: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  //   color: '#333',
  // },
  // alertCategory: {
  //   fontSize: 16,
  //   color: '#555',
  //   marginBottom: 10,
  // },
  // alertDesc: {
  //   fontSize: 14,
  //   marginBottom: 10,
  //   color: '#333',
  // },
  // alertTime: {
  //   fontSize: 12,
  //   color: '#777',
  // },
  // mapContainer: {
  //   height: 200,
  //   borderRadius: 10,
  //   overflow: 'hidden',
  //   marginTop: 10,
  // },
  // map: {
  //   flex: 1,
  // },
});