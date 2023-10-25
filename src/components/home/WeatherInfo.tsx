import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";


type WeatherInfoProps = {
  current: {
    temp_c: number;
    wind_kph: string;
    humidity: string;
    condition: {
      text: string;
      icon: string;
    };
  };
  location: {
    name: string;
    country: string;
    region: string;
  };
  weatherImages: any;
  weatherPT: any;
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ current, location, weatherImages, weatherPT }) => {
  return (
    <View style={styles.weatherInfoContainer}>
      <View style={styles.upperInfo}>
      <Text style={styles.locationText}>
        {location?.name},
        <Text style={styles.regionText}>
          {" " + location?.region}
        </Text>
        <Text style={styles.countryText}>
          {" " + location?.country}
        </Text>
      </Text>

      <View style={{ flexDirection: "column", justifyContent: "center" }}>
        <Image source={weatherImages[current?.condition?.text]} style={styles.weatherImage} />
      </View>

      <Text style={styles.temperatureText}>
          {current?.temp_c}&#176;
        </Text>
        <Text style={styles.conditionText}>
          {weatherPT[current?.condition?.text]}
        </Text>
        </View>
      <View>
        <View style={styles.weatherDetailsContainer}>
          <View style={styles.detailItem}>
            <Image source={require("../../../assets/icons/wind.png")} style={styles.detailIcon} />
            <Text style={styles.detailText}>
              {current?.wind_kph}km
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Image source={require("../../../assets/icons/drop.png")} style={styles.detailIcon} />
            <Text style={styles.detailText}>
              {current?.humidity}%
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Image source={require("../../../assets/icons/sun.png")} style={styles.detailIcon} />
            <Text style={styles.detailText}>
              {weatherPT?.forecast?.forecastday[0]?.astro?.sunrise}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherInfoContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  upperInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  locationText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  regionText: {
    color: "#A5B1C2",
    fontSize: 16,
    fontWeight: "600",
  },
  countryText: {
    color: "#A5B1C2",
    fontSize: 16,
    fontWeight: "600",
  },
  weatherImage: {
    width: 52,
    height: 52,
  },
  temperatureText: {
    color: "white",
    textAlign: "center",
    fontSize: 60,
    fontWeight: "bold",
    marginLeft: 5,
  },
  conditionText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    letterSpacing: 1,
  },
  weatherDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  detailIcon: {
    width: 24,
    height: 24,
  },
  detailText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default WeatherInfo;
