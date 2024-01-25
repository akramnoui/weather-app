import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { collection, setDoc, doc, addDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { useMainCtx } from '../context/MainContext';
import { NavigationKey } from '../navigation/NavigationKey';
import { FAB, Icon, lightColors } from '@rneui/base';
import AddParam from '../components/threshold/AddParam';
import { RadioButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect, { PickerStyle } from 'react-native-picker-select';






export const AddThreshold: React.FC = ({ navigation }) => {
    const [selectedParams, setSelectedParams] = useState([]);
    const [windSpeed, setWindSpeed] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const [precipitationLevel, setPrecipitationLevel] = useState(0);
    const [humidityLevel, setHumidityLevel] = useState(0);
    const [thresholdType, setThresholdType] = useState('above'); // Default threshold type
    const [selectedCity, setSelectedCity] = useState(null);
    const { setThresholds } = useMainCtx(); // Updated to use setThresholds from context

    const handleSaveThresholds = async () => {
      // Create a reference to the "thresholds" subcollection for the current user
      const thresholdsCollectionRef = collection(firestore, 'users', uid, 'thresholds');
  
      // Create a new object with the selected parameters and type, excluding undefined values
      // Create a new threshold object with the selected parameters and type
      const newThreshold = {
        type: thresholdType,
        ...(selectedParams.includes('windSpeed') && { windSpeed }),
        ...(selectedParams.includes('temperature') && { temperature }),
        ...(selectedParams.includes('precipitation') && { precipitationLevel }),
        ...(selectedParams.includes('humidity') && { humidityLevel }),
        city: selectedCity,
      };

      // Update the context array with the new threshold
      setThresholds((prevThresholds) => [...prevThresholds, newThreshold]);

      // Reset state variables if needed
      setSelectedParams([]);
      setWindSpeed(0);
      setTemperature(0);
      setPrecipitationLevel(0);
      setHumidityLevel(0);
      setThresholdType('above');

      try {
        // Add the new threshold document to the "thresholds" subcollection
        const thresholdDocRef = await addDoc(thresholdsCollectionRef, newThreshold);

  
        console.log('Threshold document added with ID:', thresholdDocRef.id);
  
        // Reset state variables if needed
        setSelectedParams([]);
        setThresholdType('above');
      } catch (error) {
        console.error('Error adding threshold document:', error);
      }
    };

    const {uid, prefferedCities} = useMainCtx();
  
    const windSpeedStep = 1;
    const temperatureStep = 1;
    const precipitationLevelStep = 10;
    const humidityLevelStep = 1;
  
  
    return (
        <View style={styles.container}>
           
          <AddParam selectedParams={selectedParams} setSelectedParams={setSelectedParams} />
          <View style={styles.cityDropdownContainer}>
                <Text style={styles.labelCity}>Select City:</Text>
                <RNPickerSelect
                value={selectedCity}
                onValueChange={(value) => setSelectedCity(value)}
                items={prefferedCities.map((city) => ({
                    label: city.name,
                    value: city.name,
                }))}
                style={pickerStyle}
                useNativeAndroidPickerStyle={false} // Set to true if you want to use native Android styles
                />
            </View>
          {/* Render sliders based on selected parameters */}
          <View style={styles.contentContainer}>
            {selectedParams.map((param) => (
              <View key={param} style={styles.sliderContainer}>
                <View style={styles.iconContainer}>
                  {param === 'windSpeed' && <FontAwesome5 name="wind" size={24} color="#fff" />}
                  {param === 'temperature' && <Ionicons name="thermometer-outline" size={24} color="#fff" />}
                  {param === 'precipitation' && <Ionicons name="cloud-outline" size={24} color="#fff" />}
                  {param === 'humidity' && <Ionicons name="water-outline" size={24} color="#fff" />}
                </View>
                <View style={styles.textSliderContainer}>
                  <Text style={styles.label}>
                    {param}: {thresholdType} {param === 'temperature' ? temperature : param === 'precipitation' ? precipitationLevel : param === 'windSpeed' ? windSpeed : humidityLevel}{' '}
                    {param === 'temperature' ? '°C' : param === 'precipitation' ? 'mm/m^2' : param === 'windSpeed' ? 'km/h' : '%'}
                  </Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    value={param === 'windSpeed' ? windSpeed : param === 'temperature' ? temperature : param === 'precipitation' ? precipitationLevel : humidityLevel}
                    step={param === 'windSpeed' ? windSpeedStep : param === 'temperature' ? temperatureStep : param === 'precipitation' ? precipitationLevelStep : humidityLevelStep}
                    onValueChange={(value) => {
                      switch (param) {
                        case 'windSpeed':
                          setWindSpeed(value);
                          break;
                        case 'temperature':
                          setTemperature(value);
                          break;
                        case 'precipitation':
                          setPrecipitationLevel(value);
                          break;
                        case 'humidity':
                          setHumidityLevel(value);
                          break;
                        default:
                          break;
                      }
                    }}
                  />
                </View>
              </View>
            ))}
    
            {/* Common radio button for all parameters */}
            <View style={styles.thresholdTypeContainer}>
                    <RadioButton.Item
                        label="Above"
                        value="above"
                        status={thresholdType === 'above' ? 'checked' : 'unchecked'}
                        onPress={() => setThresholdType('above')}
                        labelStyle={styles.radioLabel}
                    />
                    <RadioButton.Item
                        label="Below"
                        value="below"
                        status={thresholdType === 'below' ? 'checked' : 'unchecked'}
                        onPress={() => setThresholdType('below')}
                        labelStyle={styles.radioLabel}
                    />
                    <RadioButton.Item
                        label="equals"
                        value="equals"
                        status={thresholdType === 'equals' ? 'checked' : 'unchecked'}
                        onPress={() => setThresholdType('equals')}
                        labelStyle={styles.radioLabel}
                    />
                    </View>
                </View>
    
          <TouchableOpacity onPress={handleSaveThresholds} style={styles.saveButton}>
            <Text style={styles.buttonText}>Enregistrer les Seuils</Text>
          </TouchableOpacity>
    
        </View>
      );
    };

    const pickerStyle: PickerStyle = {
        inputIOS: {
            color: 'blue',
            height: 40,
            marginLeft: 8,
            fontSize: 20,
            // fontWeight: 'bold',
        },
        inputAndroid: {
            color: '#fff',
            height: 40,
            marginLeft: 8,
        },
        placeholder: {
            color: '#fff',
        },
        iconContainer: {
                alignSelf: 'center',
                right: -40,
                top: 8,
        }
    };

const styles = StyleSheet.create({
    cityDropdownContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    cityDropdown: {
        height: 40,
        width: '60%',
        marginLeft: 8,
        color: '#fff',
    },
    textSliderContainer: {
        flex: 1,
      },
    container: {
        flex: 1,
        backgroundColor: '#82a0f1',
        padding: 20,
        justifyContent: 'space-between',
      },
      contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        width: '100%',

      },
      sliderContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        width: '100%', // Adjusted width to ensure the content fits within the container
    },
      slider: {
        height: 40,
        marginTop: 10,
        width: '100%', // Adjusted width to ensure the content fits within the container

      },
      label: {
        fontSize: 16,
        marginLeft: 8,
        marginRight: 10,
        color: '#fff',
      },
      labelCity: {
        fontSize: 22,
        marginLeft: 8,
        marginRight: 10,
        color: '#fff',
        fontWeight: 'bold',
      },
      thresholdTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
      },
      radioLabel: {
        fontSize: 16,
        color: '#fff',
      },
      saveButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 20,
        width: '60%',
        alignSelf: 'center',

      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
      fab: {
        alignSelf: 'flex-end',
        zIndex: 1000,
      },
});

export default AddThreshold;