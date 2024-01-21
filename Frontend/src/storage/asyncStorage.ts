import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageData = async (key: string, value: string) => {
  try {
    AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Error saving data", error);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log("Error retrieving data", error);
  }
};
