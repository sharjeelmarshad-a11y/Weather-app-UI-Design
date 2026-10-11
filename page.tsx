'use client';

import { useEffect } from 'react';
import useWeather from '@/Hooks/useWeather'; 
import WeatherDetails from './Components/WeatherDetails'
import MobileDashboard from './Components/MobileDashboard'
export default function Home() {
  const { Weather, Loading, Error, fetchweather } = useWeather();

  useEffect(() => {

    fetchweather('Lahore');
  }, []);
  if (Loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        <p className="text-lg">Weather details are loading...</p>
      </div>
    );
  }
  if (Error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-red-400">
        <p>Error: {Error}</p>
      </div>
    );
  }

  return (
    
    <main className="min-h-screen h-full bg-slate-900">
      <MobileDashboard/>
      {Weather ? (
        <WeatherDetails currentWeather={Weather} />
      ) : (
        <div className="text-white text-center">Data dismatch</div>
      )}
    </main>
  );
}