import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { debounce } from "lodash";
import { StatusBar } from "expo-status-bar";
import { Location, Weather } from "../util/types";
import { featchLocations, featchWeatherForescast } from "../api/weather";
import SearchBar from "../components/home/SearchBar";
import { weatherImages } from "../constants";
import { getData, storageData } from "../storage/asyncStorage";
import { NavigationKey } from "../navigation/NavigationKey";
import { useMainCtx } from "../context/MainContext";
import { Loader } from "../components/misc/Loader";
import { firestore } from "../../firebaseConfig";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

export const PREFERRED_CITIES_KEY = "preferredCities"; // AsyncStorage key for storing preferred cities

export const Preferences: React.FC = ({ navigation }) => {

  interface City {
    name: string;
    temperature: number;
    condition: string;
  }
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocation] = useState([]);
  const [weather, setWeather] = useState<Weather>({} as Weather);
  const [loading, setLoading] = useState(true);
  const {prefferedCities, SetPrefferedCities, restoredPreferences, uid} = useMainCtx()


  useEffect(() => {
    // Load preferred cities from cache on component mount

    const loadPreferredCities = async () => {

      try {
        const storedCities = prefferedCities;

        if (storedCities) {
          setSelectedCities(storedCities);
        }
      } catch (error) {
        console.error("Error loading preferred cities from cache:", error);
      }
    };
    if(restoredPreferences){

    loadPreferredCities();
    }
  }, [restoredPreferences]);

  const savePreferredCitiesToCache = async (cities: any[]) => {
    try {
      SetPrefferedCities(cities);
    } catch (error) {
      console.error("Error saving preferred cities to cache:", error);
    }
  };
  
  const handleLocation = async (item: Location) => {
    setLocation([]);
    toggleSearch(false);
    setLoading(true);
  
    try {
      // Fetch the user document reference based on the UID
      const userDocRef = doc(firestore, "users", uid);
  
      // Get the user document to check if it exists
      const data = await featchWeatherForescast({
        cityName: item.name,
        days: "7",
      })
  
        // Proceed with the rest of the function
        const newCity = {
          name: item.name,
          coordinates: { lat: item.lat, long: item.long },
          temperature: data.current.temp_c,
          condition: data.current.condition.text,
        };
  
        // Add the new city data to the 'cities' subcollection
        const citiesCollectionRef = collection(userDocRef, "cities");
        await addDoc(citiesCollectionRef, {name : newCity.name});
  
        const updatedCities = [...selectedCities, newCity];
        setSelectedCities(updatedCities);
        savePreferredCitiesToCache(updatedCities); // Save to cache

        console.log("User document does not exist");
        setLoading(false);
      
    } catch (error) {
      console.error("Error fetching user document:", error);
      setLoading(false);
    }
  };

  const removeCity = (index: number) => {
    const updatedCities = [...selectedCities];
    updatedCities.splice(index, 1);
    setSelectedCities(updatedCities);
    savePreferredCitiesToCache(updatedCities); // Save to cache
  };
  const handleSearch = (value: string) => {
    if (value.length > 2) {
      featchLocations({ cityName: value }).then((data) => {
        setLocation(data);
      });
    }
  };

  const handleTextDebounce = useCallback(debounce((value: string) => handleSearch(value), 1200), []);

  if(!restoredPreferences){
    return <Loader/>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <SearchBar
            showSearch={showSearch}
            toggleSearch={toggleSearch}
            handleTextDebouce={handleTextDebounce}
            locations={locations}
            handleLocation={handleLocation}
          />

      <Text style={styles.locationText}>Preferred cities</Text>
      <Image blurRadius={70} source={require("../../assets/images/bg.png")} style={styles.background} />
      <TouchableWithoutFeedback style={[{height: '100%', paddingBottom: 20,}]} onPress={() => toggleSearch(false)}>

      <ScrollView contentContainerStyle={styles2.cardContainer}>

        {selectedCities.map((city, index) => (
          <WeatherCard
            key={index}
            city={city}
            temperature={city.temperature}
            condition={city.condition}
            onRemove={() => removeCity(index)}
            toggleSearch={toggleSearch}
            navigation={navigation}
          />
        ))}
      </ScrollView>
      </TouchableWithoutFeedback> 

    </SafeAreaView>
  );
};


const WeatherCard: React.FC<{
  city: any; // Assuming City is the interface for city data
  temperature: number;
  condition: string;
  onRemove: () => void;
  toggleSearch: any;
  navigation: any;
}> = ({ city, temperature, condition, toggleSearch, navigation }) => {
  const {setCity} = useMainCtx();

  const onCradPress = () =>{
    toggleSearch(false)
    setCity(city.name);
    navigation.navigate(NavigationKey.HomeScreen)  }
    
  return (
      <><TouchableOpacity
      style={styles2.mainContainer}
      onPress={onCradPress} // You can handle other actions here
    >
      <View style={styles2.weatherCard}>
        <Text style={styles2.cityText}>{city.name}</Text>
        <Text style={styles2.temperatureText}>{`${temperature}°C`}</Text>
        <Text style={styles2.conditionText}>{condition}</Text>
      </View>
      <Image source={weatherImages[city.condition]} style={styles2.weatherImage} />
    {/* </TouchableOpacity><TouchableOpacity
      style={{
        backgroundColor: 'red',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={handleSwipe}
    >
        <Text style={{ color: 'white' }}>Delete</Text> */}
      </TouchableOpacity></>
  );
};


const styles2 = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Adjust the alpha value for opacity
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,
    backdropFilter: 'blur(10px)', // Apply a blur effect
  },
  
  cardContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  weatherCard: {
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
  weatherImage: {
    width: 70,
    height: 70,
  },
});
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: '100%',
    width: '100%',

  },
  background: {
    position: "absolute",
    width: "100%",
    height: "120%",
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
    zIndex: 1,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
});