import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MagnifyingGlassIcon, MapPinIcon } from "react-native-heroicons/solid";
import { Location} from "../../util/types";
import { theme } from "../../theme";


type SearchBarProps = {
  showSearch: boolean;
  toggleSearch: (show: boolean) => void;
  handleTextDebouce: (text: string) => void;
  locations: Location[];
  handleLocation: (item: Location) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ showSearch, toggleSearch, handleTextDebouce, locations, handleLocation }) => {
  const onTextChange = (text: string) => {
    if (!showSearch) {
      toggleSearch(true);
    }
    handleTextDebouce(text)
  }
  return (
    <TouchableOpacity style={styles.searchContainer} onPress={() => toggleSearch(true)}>
      <View style={styles.searchInputContainer}>
          <TextInput onChangeText={(text) => onTextChange(text)} placeholder="Search city.." placeholderTextColor={"lightgray"} style={styles.searchInput} />

        <TouchableOpacity onPress={() => toggleSearch(true)} style={styles.searchIconContainer}>
          <MagnifyingGlassIcon size={25} color="white" />
        </TouchableOpacity>
      </View>
      {locations.length > 0 && showSearch ? (
        <View style={styles.locationsContainer}>
          {locations.map((item: Location, index) => {
            let showBorder = index === locations.length - 1 ? false : true;
            return (
              <TouchableOpacity
                onPress={() => handleLocation(item as any)}
                key={index}
                style={[styles.locationItem, { borderBottomWidth: showBorder ? 1 : 0 }]}
              >
                <MapPinIcon size={20} color="gray" />
                <Text style={{ color: "black", fontSize: 16, marginLeft: 2 }}>
                  {item?.name}, {item?.region}, {item?.country}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: "10%",
    marginHorizontal: 15,
    position: "relative",
    marginTop: 30,
    zIndex: 50,
  },
  searchInputContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 9999,
    backgroundColor: theme.bgWhite("0.15"),
  },
  searchInput: {
    paddingLeft: 10,
    height: 40,
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    fontStyle: 'italic',
    color: "white",
  },
  searchIconContainer: {
    backgroundColor: theme.bgWhite("0.2"),
    borderRadius: 9999,
    padding: 8,
    margin: 1,
  },
  locationsContainer: {
    width: "100%",
    backgroundColor: "#D1D5DB",
    borderRadius: 16,
    borderWidth: 0,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9CA3AF",
    padding: 10,
    paddingHorizontal: 12,
  },
});

export default SearchBar;