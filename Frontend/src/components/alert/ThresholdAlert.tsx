import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';

interface AlertSectionProps {
  title: string;
  alerts: any[]; // Adjust the type based on your alert structure
}

const ThresholdAlert: React.FC<AlertSectionProps> = ({ title, alerts }) => {
  return (

    <View style={styles.alertSectionContainer}>
      <Text style={styles.alertTitle}>{title}</Text>

      {alerts.map((alert, alertIndex) => (

        alert.msgtype != "" ? (
          <View key={alertIndex} style={styles.alertContainer}>
            <View style={{ flexDirection: "row", alignItems: 'center', }}>
              <Image source={require("../../../assets/icons/warning-sign.png")} style={{ marginRight: 7, marginBottom: 10 }} />
              <Text style={styles.alertHeadline}>{alert.severity} {alert.event}</Text>
            </View>
            <Text style={styles.alertCategory}>
              <Text style={{ color: 'lightgrey', fontWeight: "300", fontSize: 15 }}>Category: </Text>
              {alert.category}
            </Text>

            <Text style={{ color: "lightgrey", fontSize: 15, fontWeight: "300" }}>
              Areas concernerd
            </Text>

            <View style={styles.areasContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {alert.areas.split(";").map((area, areaIndex) => (
                  <TouchableOpacity key={areaIndex} style={styles.areaElement}>
                    <Text style={{ fontWeight: "400", color: "lightgrey" }}>{area}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {alertIndex != (alerts.length - 1) ? (
              <View style={styles.separator} />
            ) : (null)
            }

            {/* <Text style={styles.alertTime}>{`Effective: ${alert.effective} - Expires: ${alert.expires}`}</Text> */}
          </View>

        ) : (null)

      ))}

    </View>
  );
};

const styles = StyleSheet.create({
  alertSectionContainer: {
    padding: 20,
    alignSelf: 'center',
    borderWidth: 0,
  },
  alert: {
    marginBottom: 15,
  },
  alertTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  alertContainer: {
    borderRadius: 8,
    padding: 12,
    // marginBottom: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
    // elevation: 5,
    // borderBottomColor: "#EDFCFF"
    // backgroundColor: "white"
  },
  alertCategory: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 15,
    color: 'white',
  },
  alertDesc: {
    fontSize: 14,
    marginBottom: 6,
    color: 'white',
  },
  alertTime: {
    fontSize: 14,
    color: 'white',
  },
  alertHeadline: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  areasContainer: {
    flexDirection: "row",
    flexWrap: 'nowrap',
    marginTop: 15
  },
  areaElement: {
    backgroundColor: "rgba(255,255,255, 0.2)",
    borderRadius: 30,
    padding: 10,
    marginHorizontal: 3,
  },
  separator: {
    height: 0.6,
    backgroundColor: '#ccc',
    marginHorizontal: -10,
    marginTop: 15
  }

});

export default ThresholdAlert;