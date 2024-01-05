import React from "react";
import { View, Image, Text, ScrollView, StyleSheet } from "react-native";
import {Weather} from "../../util/types";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";


type DailyForecastProps = {
  weather: Weather;
  weatherImages: any;
};

const DailyForecast: React.FC<DailyForecastProps> = ({ weather, weatherImages }) => {
  return (
    <View style={styles.dailyForecastContainer}>
      <View style={styles.forecastTitleContainer}>
        <CalendarDaysIcon size={22} color="white" />
        <Text style={styles.forecastTitleText}>
          Previsions quotidiennes
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.forecastScrollView}>
        {weather.forecast?.forecastday?.map((item, index) => {
          let date = new Date(item.date);
          let options = { weekday: "long" };
          //@ts-ignore
          let dayName = date.toLocaleDateString("en-US", options);
          dayName = dayName.split(",")[0];

          return (
            <View key={index} style={styles.forecastDayContainer}>
              <Image source={weatherImages[item?.day?.condition?.text]} style={styles.forecastDayImage} />
              <Text style={styles.forecastDayText}>
                {dayName}
              </Text>
              <Text style={styles.forecastTemperatureText}>
                {" "}
                {item?.day.avgtemp_c}&#176;
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dailyForecastContainer: {
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  forecastTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: 'center',
    marginHorizontal: 5,
    marginBottom: 10,
  },
  forecastIcon: {
    size: 22,
    color: "white",
  },
  forecastTitleText: {
    color: "white",
    fontSize: 18,
    marginLeft: 5,
    fontWeight: "bold",
    paddingTop: 2,
  },
  forecastScrollView: {
    paddingHorizontal: 15,
  },
  forecastDayContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  forecastDayImage: {
    width: 40,
    height: 40,
  },
  forecastDayText: {
    color: "white",
    marginTop: 5,
    fontSize: 16,
  },
  forecastTemperatureText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DailyForecast;
