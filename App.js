import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';

const API_KEY = "fb18e8e10b69ee0f0de4127cb64fabaa";


export default function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    async function fetchWeatherData(cityName) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`; 
        try {
            const res = await fetch(API);
            if(res.status == 200) {
                const data = await res.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
        } catch(err) {
            console.log(err);
        };
    };
    
    useEffect(() => {
        fetchWeatherData('Junin');
    }, []);

    if(!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='gray' size={36} />
            </View>
        )
    } else if(weatherData === null) {
        return (
            <View style={styles.container}>
                <SearchBar fetchWeatherData={fetchWeatherData} />
                <Text style={styles.primaryText}>
                    City Not Found! Try with another city
                </Text> 
            </View>
        )    
    };

    return (
        <View style={styles.container}>
            <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryText: {
        margin: 20,
        fontSize: 28
    }
});
