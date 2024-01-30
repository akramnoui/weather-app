import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useMainCtx } from '../context/MainContext';
import { NavigationKey } from '../navigation/NavigationKey';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { accentColor, daytimeColors, nighttimeColors } from '../util/util';

const Threshold: React.FC = ({ navigation }) => {
  const { thresholds, setThresholds } = useMainCtx(); 
  const [isDaytime, setIsDaytime] = React.useState(true)

  const backgroundColors = isDaytime ? daytimeColors : nighttimeColors


  useEffect(() => {

    // Determine if it's daytime or nighttime based on the current time
    const currentHour = new Date().getHours();
    setIsDaytime(currentHour >= 6 && currentHour < 18);

   
  }, []);


  const renderThresholdFields = (threshold) => {
    const fields = [];

    if (threshold.windSpeed !== undefined) {
      fields.push(
        <Paragraph key="windSpeed" style={styles.cardText}>
          Wind Speed: {threshold.type} {threshold.windSpeed} km/h
        </Paragraph>
      );
    }

    if (threshold.temperature !== undefined) {
      fields.push(
        <Paragraph key="temperature" style={styles.cardText}>
          Temperature: {threshold.type} {threshold.temperature} °C
        </Paragraph>
      );
    }

    if (threshold.humidityLevel !== undefined) {
      fields.push(
        <Paragraph key="humidityLevel" style={styles.cardText}>
          Humidity Level: {threshold.type} {threshold.humidityLevel} %
        </Paragraph>
      );
    }

    if (threshold.precipitationLevel !== undefined) {
      fields.push(
        <Paragraph key="precipitationLevel" style={styles.cardText}>
          Precipitation Level: {threshold.type} {threshold.precipitationLevel} mm/m^2
        </Paragraph>
      );
    }

    return fields;
  };

  const handleDeleteThreshold = (index) => {
    // Create a new array without the deleted threshold
    const updatedThresholds = thresholds.filter((_, i) => i !== index);
    setThresholds(updatedThresholds);
  };

  return (
    <View style={styles.mainContainer}>
            <Text style={styles.locationText}>
        Custom Threshold Alerts
      </Text>
      <LinearGradient
        colors={backgroundColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.background}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Display cards for each threshold in the array */}
        {thresholds.length === 0 && (
        <Text style={styles.noAlertText}>
        You can set your thresholds for weather parameters here.{'\n\n'} Click the 'Plus' button to add an alert threshold.
        </Text>      )}
        {thresholds.map((threshold, index) => (
          
          <Card key={index} style={styles.card}>
            <Card.Content>
            {/* <ImageBackground
            key={index}
            source={require('../../assets/images/2.jpg')}
            style={styles.imageBackground}
            imageStyle={styles.gradientOverlay}
          > */}
              <Title style={styles.cardTitle}>Threshold {index + 1}</Title>
              {renderThresholdFields(threshold)}
            {/* </ImageBackground> */}

            </Card.Content>
            <Card.Actions>
              <TouchableOpacity onPress={() => handleDeleteThreshold(index)}>
                <Text>delete</Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        onPress={() =>
          navigation.navigate(
            NavigationKey.ModalNavigator,
            NavigationKey.AddThreshold
          )
        }
        style={styles.fab}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  mainContainer:{
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 60,
    right: 30,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    backgroundColor: accentColor,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    alignSelf: 'center',
  },
  card: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Adjust the alpha value for opacity
    // backdropFilter: 'blur(10px)', // Apply a blur effect
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
  },
  noAlertText: {
    color: "white",
    textAlign: "center",
    alignSelf: 'center',
    top: 50,
    zIndex: 1,
    fontSize: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
    fontFamily: 'Poppins',

  },
  background: {
    position: "absolute",
    width: "100%",
    height: "120%",
  },
  locationText: {
    color: "white",
    textAlign: "center",
    alignSelf: 'center',
    zIndex: 1,
    fontSize: 24,
    marginTop: 20,
    fontFamily: 'Poppins-bold',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    justifyContent: 'center',
  },
  gradientOverlay: {
    // backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust the opacity and color as needed
    // opacity: 0.6,

  },
 
  cardContent: {
    marginBottom: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteText: {
    color: 'white', // Adjust the text color
  },
});

export default Threshold;
