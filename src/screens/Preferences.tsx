
import React, { useCallback, useEffect } from "react";
import { Dimensions, View, Image, SafeAreaView, TextInput, Platform, StatusBar as StatusB, StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native";
import { debounce } from "lodash";
import { StatusBar } from "expo-status-bar";
import { Location, Weather, WeatherImages, WeatherPT } from "../util/types";


export const Preferences: React.FC = () => {
  const preferredCities = [
    { name: "City 1", temperature: 25, condition: "Sunny" },
    { name: "City 2", temperature: 18, condition: "Cloudy" },
    // Add more cities as needed
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.locationText}>Alertes meteo</Text>
      <Image blurRadius={70} source={require("../../assets/images/bg.png")} style={styles.background} />

      <ScrollView contentContainerStyle={styles2.cardContainer}>
        {preferredCities.map((city, index) => (
          <WeatherCard key={index} city={city.name} temperature={city.temperature} condition={city.condition} />
        ))}
      </ScrollView>
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
    flexDirection: "row",
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
});

const WeatherCard: React.FC<{ city: string; temperature: number; condition: string }> = ({ city, temperature, condition }) => {
  return (
    <View style={styles2.weatherCard}>
      <Text style={styles2.cityText}>{city}</Text>
      <Text style={styles2.temperatureText}>{`${temperature}°C`}</Text>
      <Text style={styles2.conditionText}>{condition}</Text>
    </View>
  );
};

const styles2 = StyleSheet.create({
  // ... (existing styles)

  cardContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  weatherCard: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cityText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  temperatureText: {
    fontSize: 16,
    marginBottom: 4,
  },
  conditionText: {
    fontSize: 14,
    color: "#555",
  },
});