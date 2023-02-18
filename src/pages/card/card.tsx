import React, { useState, useEffect } from "react";
import Weather from "@/components/weather";
import { debounce } from "lodash";

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon?: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min?: number;
    temp_max?: number;
    pressure: number;
    humidity?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg?: number;
  };
  clouds?: {
    all: number;
  };
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

interface watchData {
  coords: {
    latitude: number;
    longitude: number;
  };
  timestamp?: number;
}

export default function Card() {
  const API_URL = "https://api.openweathermap.org/data/2.5";

  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();
  const [data, setData] = useState<WeatherData>();
  const [watch, setWatch] = useState<watchData>();

  useEffect(() => {
    let watchId: number;

    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      watchId = navigator.geolocation.watchPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    };
    fetchData();

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (lat && long) {
        await fetch(
          `${API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.NEXT_PUBLIC_API}`
        )
          .then((res) => res.json())
          .then((result) => {
            setData(result);
            console.log(result);
          });
      }
    };

    const debouncedFetchData = debounce(fetchData, 1000);

    debouncedFetchData();

    return () => {
      debouncedFetchData.cancel();
      console.log("Latitude is: ", lat);
      console.log("Longitude is: ", long);
    };
  }, [lat, long]);

  return (
    <>
      <Weather weatherData={data} watch={watch} />
    </>
  );
}
