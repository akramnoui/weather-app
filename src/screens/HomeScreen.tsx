import React, { useCallback, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import { debounce } from 'lodash'
import { StatusBar } from 'expo-status-bar'
import { featchLocations, featchWeatherForescast } from '../api/weather'
import { weatherImages, weatherPT } from '../constants'
import * as Progress from 'react-native-progress'
import { getData, storageData } from '../storage/asyncStorage'
import { type Location, type Weather } from '../util/types'
import { LinearGradient } from 'expo-linear-gradient'

import SearchBar from '../components/home/SearchBar'
import WeatherInfo from '../components/home/WeatherInfo'
import DailyForecast from '../components/home/DailyForecast'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useMainCtx } from '../context/MainContext'
import { Loader } from '../components/misc/Loader'

// ... (other imports)

export const HomeScreen: React.FC = () => {
  const [showSearch, toggleSearch] = React.useState(true)
  const [locations, setLocation] = React.useState([])
  const [weather, setWeather] = React.useState<Weather>({} as Weather)
  const [loading, setLoading] = React.useState(true)
  const [isDaytime, setIsDaytime] = React.useState(true)

  const {city , setCity, restored} = useMainCtx();

  useEffect(() => {
    // Determine if it's daytime or nighttime based on the current time
    const currentHour = new Date().getHours()
    setIsDaytime(currentHour >= 6 && currentHour < 18)
    if(restored){
      fetchMyWeatherData()

    }
  }, [restored, city])

  const daytimeGradient = 'linear-gradient(167deg, #29B2DD 0%, #3AD 47.38%, #2DC8EA 100%)'
  const nighttimeGradient = 'linear-gradient(167deg, #08244F 0%, #134CB5 47.38%, #0B42AB 100%)'

  const backgroundGradient = isDaytime ? daytimeGradient : nighttimeGradient

  const handleLocation = async (item: Location): Promise<void> => {
    setLocation([])
    toggleSearch(false)
    setCity(item.name);
    setLoading(true)
    await featchWeatherForescast({
      cityName: item.name,
      days: '7'
    })
      .then((data) => {
        setWeather(data)
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSearch = async (value: string): Promise<void> => {
    if (value.length > 2) {
      await featchLocations({ cityName: value }).then((data) => {
        setLocation(data)
      })
    }
  }

  const fetchMyWeatherData = async () => {

    try {
      if(city){

      const cityName = city;
      
      const data = await featchWeatherForescast({
        cityName,
        days: '7'
      })
      setWeather(data)
      setLoading(false)
    }
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setLoading(false)
    }
  }

  const handleTextDebouce = useCallback(debounce((value: string) => { handleSearch(value) }, 200), [])
  const { current, location } = weather;

  const daytimeColors = ['#29B2DD', '#3AD', '#2DC8EA']
  const nighttimeColors = ['#08244F', '#134CB5', '#0B42AB']

  const backgroundColors = isDaytime ? daytimeColors : nighttimeColors

  console.log(restored);
  console.log(city);
  if(!restored){
    return <Loader/>;
  }

  return (
    <View style={[styles.container]}>
      <StatusBar style="light" />
      <LinearGradient
      colors={backgroundColors}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.background}
    />
      {loading
        ? (
        <View style={styles.loadingContainer}>
          <Progress.CircleSnail thickness={10} color="#0bb3b2" size={100} />
        </View>
          )
        : (

        <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'space-around' }}>

          <SearchBar
            showSearch={showSearch}
            toggleSearch={toggleSearch}
            handleTextDebouce={handleTextDebouce}
            locations={locations}
            handleLocation={handleLocation}
          />
          <TouchableWithoutFeedback style={[{ height: '100%', paddingBottom: 20 }]} onPress={() => { toggleSearch(false) }}>
          <WeatherInfo current={current} location={location} weatherImages={weatherImages} weatherPT={weatherPT} />
          <DailyForecast weather={weather} weatherImages={weatherImages} />
          </TouchableWithoutFeedback>

        </SafeAreaView>
          )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
