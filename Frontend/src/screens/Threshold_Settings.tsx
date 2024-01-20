import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Threshold: React.FC = () => {
  const [windSpeed, setWindSpeed] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [precipitationLevel, setPrecipitationLevel] = useState(0);
  const [humidityLevel, setHumidityLevel] = useState(0);

  const windSpeedStep = 1;
  const temperatureStep = 1;
  const precipitationLevelStep = 10;
  const humidityLevelStep = 1;

  const handleSaveThresholds = () => {
    console.log('Seuils enregistrés :', { windSpeed, temperature, precipitationLevel, humidityLevel });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seuil Météo</Text>

      <View style={styles.sliderContainer}>
        <FontAwesome5 name="wind" size={24} color="#fff" />
        <Text style={styles.label}>Vitesse du Vent (km/h): {windSpeed}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={windSpeed}
          step={windSpeedStep}
          onValueChange={(value) => setWindSpeed(value)}
        />
      </View>

      <View style={styles.sliderContainer}>
        <FontAwesome5 name="thermometer-half" size={24} color="#fff" />
        <Text style={styles.label}>Température (°C): {temperature}</Text>
        <Slider
          style={styles.slider}
          minimumValue={-50}
          maximumValue={50}
          value={temperature}
          step={temperatureStep}
          onValueChange={(value) => setTemperature(value)}
        />
      </View>

      <View style={styles.sliderContainer}>
        <FontAwesome5 name="cloud-showers-heavy" size={24} color="#fff" />
        <Text style={styles.label}>Niveau de Précipitation (mm/m^2): {precipitationLevel}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={precipitationLevel}
          step={precipitationLevelStep}
          onValueChange={(value) => setPrecipitationLevel(value)}
        />
      </View>

      <View style={styles.sliderContainer}>
        <FontAwesome5 name="tint" size={24} color="#fff" />
        <Text style={styles.label}>Humidité (%): {humidityLevel}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={humidityLevel}
          step={humidityLevelStep}
          onValueChange={(value) => setHumidityLevel(value)}
        />
      </View>

      <TouchableOpacity onPress={handleSaveThresholds} style={styles.saveButton}>
        <Text style={styles.buttonText}>Enregistrer les Seuils</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#82a0f1', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', 
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
    color: '#fff', 
  },
  saveButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Threshold;
