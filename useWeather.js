import { useState } from 'react'

const useWeather = () => {
    const [Weather, setWeather] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [Error, setError] = useState(null) 

    const fetchweather = async (cityname) => {
        if (!cityname) return;

        setLoading(true)
        setError(null)

        try {
            const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
            
            // Yahan aqi=yes lazmi hona chahiye
            const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(cityname)}&days=1&aqi=yes`);
            
            if (!res.ok) {
                throw new Error('City not found or API error')
            }

            const data = await res.json()

            const formateddata = {
                city: data.location.name,
                country: data.location.country,
                temp: Math.round(data.current.temp_c),
                conditionText: data.current.condition.text,
                isday: data.current.is_day,
                Hight: Math.round(data.forecast.forecastday[0].day.maxtemp_c),
                Low: Math.round(data.forecast.forecastday[0].day.mintemp_c),
                humidity: data.current.humidity,
                wind: data.current.wind_kph,
                feelslike: Math.round(data.current.feelslike_c),
                
                // Yeh dono properties drawer ke liye zaroori hain
                current: data.current,
                forecast: data.forecast
            }

            setWeather(formateddata)
        } catch (error) {
            setError(error.message || "Failed to load Weather API data")
            setWeather(null)
        } finally {
            setLoading(false)
        }
    }

    return { Weather, Loading, Error, fetchweather }
}

export default useWeather