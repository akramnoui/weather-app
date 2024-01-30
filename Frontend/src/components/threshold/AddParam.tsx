import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Label } from "./Label";
import { accentColor } from "../../util/util";

interface AddParamProps {
  selectedParams: string[];
  setSelectedParams: React.Dispatch<React.SetStateAction<string[]>>;
}

const colors = {
  pink1: 'pink', // Replace with your actual color values
  white: 'white', // Replace with your actual color values
  black: 'black', // Replace with your actual color values
};

const data = [
  { id: 'humidity', label: 'Humidity' },
  { id: 'precipitation', label: 'Precipitation' },
  { id: 'windSpeed', label: 'Wind Speed' },
  { id: 'temperature', label: 'Temperature' },
];

const AddParam: FC<AddParamProps> = ({ selectedParams, setSelectedParams }) => {
  const handleActivity = (newActivity: string) => {
    setSelectedParams((prev) => {
      if (prev.includes(newActivity)) {
        return prev.filter((activity) => activity !== newActivity);
      } else {
        return [...prev, newActivity];
      }
    });
  };

  const calculateLabelStyle = (filterId: string) => ({
    backgroundColor: selectedParams.includes(filterId)
      ? accentColor
      : colors.white,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Pick your parameters </Text>
      <View style={styles.activity}>
        {data.map((filter) => (
          <Label
            key={filter.id}
            title={filter.label}
            onPress={() => {
              handleActivity(filter.id);
            }}
            buttonStyle={calculateLabelStyle(filter.id)}
            titleStyle={{
              color: selectedParams.includes(filter.id)
                ? colors.white
                : colors.black,
              fontFamily: 'Poppins'
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activity: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginHorizontal: 5,
  },
  container: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 25,
    fontFamily: 'Poppins-bold',  
    color: colors.white,
  },
});

export default AddParam;
