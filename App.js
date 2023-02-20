import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "8d035f2fd2b45d858d814fd05fb6fba8";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atomosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (granted) {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });

      const location = await Location.reverseGeocodeAsync(
        {
          latitude,
          longitude,
        },
        { useGoogleMaps: false }
      );
      setCity(location[0].city);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
      );
      const json = await response.json();
      setDays(json.list);
    } else {
      setOk(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{ marginTop: 10 }}
            />
          </View>
        ) : (
          days.map(
            (day, index) =>
              day.dt_txt.split(" ")[1] === "09:00:00" && (
                <View key={index} style={styles.day}>
                  <View style={styles.date}>
                    <Text style={styles.dateText}>
                      {day.dt_txt.split(" ")[0].replaceAll("-", ". ")}{" "}
                      {`(${dayjs(day.dt_txt).format("ddd")})`}
                    </Text>
                    <Text style={styles.timeText}>오전 9시</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.temp}>
                      {parseFloat(day.main.temp.toFixed(1))}
                    </Text>
                    <Fontisto
                      name={icons[day.weather[0].main]}
                      size={80}
                      color="white"
                    />
                  </View>
                  <Text style={styles.description}>{day.weather[0].main}</Text>
                  <Text style={styles.tinyText}>
                    {day.weather[0].description}
                  </Text>
                </View>
              )
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4852EA" },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "white",
    fontSize: 55,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    padding: 20,
  },
  date: { width: "100%" },
  dateText: {
    color: "white",
    fontSize: 40,
  },
  timeText: {
    marginTop: 10,
    color: "white",
    fontSize: 25,
  },
  temp: {
    marginTop: 50,
    color: "white",
    fontSize: 110,
  },
  description: {
    color: "white",
    fontSize: 40,
  },
  tinyText: {
    color: "white",
    fontSize: 20,
  },
});
