
import React, {  } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { Weather } from "../util/types";
import MapView, { Polygon } from 'react-native-maps';


export const AlertScreen: React.FC = () => {
  const alertData = {
    "headline": "Instituto Português do Mar e da Atmosfera",
    "msgtype": "",
    "severity": "",
    "urgency": "",
    "areas": "",
    "category": "Coastal event",
    "certainty": "",
    "event": "Orange Coastal Event Warning",
    "note": "",
    "effective": "2023-11-03T15:00:00+00:00",
    "expires": "2023-11-05T00:00:00+00:00",
    "desc": "Waves from the northwest with a significant height of 5 to 7 meters, reaching a maximum height of 12/13 meters.",
    "instruction": ""
  };

  const [showSearch, toggleSearch] = React.useState(false);
  const [locations, setLocation] = React.useState([]);
  const [weather, setWeather] = React.useState<Weather>({} as Weather);
  const [loading, setLoading] = React.useState(false);

  const affectedArea = [
    { latitude: 37.7749, longitude: -122.4194 }, // Replace with actual coordinates
    // Add more coordinates as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>
        Alertes meteo
      </Text>
      <Image blurRadius={70} source={require("../../assets/images/bg.png")} style={styles.background} />

      {/* Weather Alert */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={{ color: 'white' }}>Loading...</Text>
        </View>
      ) : (
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>{alertData.headline}</Text>
          <Text style={styles.alertCategory}>{alertData.category}</Text>
          <Text style={styles.alertDesc}>{alertData.desc}</Text>
          <Text style={styles.alertTime}>{`Effective: ${alertData.effective} - Expires: ${alertData.expires}`}</Text>

          {/* Map Component */}
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: affectedArea[0].latitude,
                longitude: affectedArea[0].longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Polygon
                coordinates={affectedArea}
                fillColor="rgba(255, 0, 0, 0.3)"
                strokeColor="rgba(255, 0, 0, 0.5)"
              />
            </MapView>
          </View>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: '100%',
    width: '100%',
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
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
    top: 50,
    zIndex: 1,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  alertContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 120, // Adjusted to accommodate the map
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
    marginBottom: 10,
  },
  alertDesc: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  alertTime: {
    fontSize: 12,
    color: '#777',
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