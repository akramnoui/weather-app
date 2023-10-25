
import React, { useCallback, useEffect } from "react";
import { Dimensions, View, Image, SafeAreaView, TextInput, Platform, StatusBar as StatusB, StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native";
import { debounce } from "lodash";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";
import { featchLocations, featchWeatherForescast } from "../api/weather";
import { weatherImages, weatherPT } from "../constants";
import * as Progress from "react-native-progress";
import { getData, storageData } from "../storage/asyncStorage";
import { Location, Weather, WeatherImages, WeatherPT } from "../util/types";


import SearchBar from "../components/home/SearchBar";
import WeatherInfo from "../components/home/WeatherInfo";
import DailyForecast from "../components/home/DailyForecast";

export const AlertScreen: React.FC = () => {
  const [showSearch, toggleSearch] = React.useState(false);
  const [locations, setLocation] = React.useState([]);
  const [weather, setWeather] = React.useState<Weather>({} as Weather);
  const [loading, setLoading] = React.useState(true);

 
  return (
    <View style={styles.container}>
      <StatusBar style="light" /> 
      <Text style={styles.locationText}>
        Alertes meteo
      </Text>
      <Image blurRadius={70} source={require("../../assets/images/bg.png")} style={styles.background} />
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
