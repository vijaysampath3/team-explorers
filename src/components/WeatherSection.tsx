import { useState } from 'react';
import { ArrowLeft, Cloud, Droplets, Wind, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { t } from '../data/translations';

interface WeatherSectionProps {
  language: Language;
  onBack: () => void;
}

interface WeatherData {
  date: string;
  temp: number;
  humidity: number;
  wind: number;
  description: string;
  icon: string;
}

export function WeatherSection({ language, onBack }: WeatherSectionProps) {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [location, setLocation] = useState('');

  const getWeather = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      alert('GPS not supported');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);

        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockWeather: WeatherData[] = [
          {
            date: 'Today',
            temp: 28 + Math.floor(Math.random() * 5),
            humidity: 65 + Math.floor(Math.random() * 20),
            wind: 10 + Math.floor(Math.random() * 10),
            description: 'Partly Cloudy',
            icon: '⛅',
          },
          {
            date: 'Tomorrow',
            temp: 29 + Math.floor(Math.random() * 5),
            humidity: 70 + Math.floor(Math.random() * 15),
            wind: 12 + Math.floor(Math.random() * 8),
            description: 'Sunny',
            icon: '☀️',
          },
          {
            date: 'Day 3',
            temp: 27 + Math.floor(Math.random() * 5),
            humidity: 75 + Math.floor(Math.random() * 10),
            wind: 15 + Math.floor(Math.random() * 10),
            description: 'Light Rain',
            icon: '🌧️',
          },
          {
            date: 'Day 4',
            temp: 26 + Math.floor(Math.random() * 5),
            humidity: 80 + Math.floor(Math.random() * 10),
            wind: 18 + Math.floor(Math.random() * 7),
            description: 'Cloudy',
            icon: '☁️',
          },
        ];

        setWeather(mockWeather);
        setLoading(false);
      },
      (error) => {
        alert('Unable to get location: ' + error.message);
        setLoading(false);
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          {t(language, 'back_button')}
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-green-700 text-center mb-8">
            Weather Information
          </h1>

          <div className="text-center mb-8">
            <h2 className="text-2xl mb-6">Get 4-Day Weather Forecast Using GPS Location</h2>
            <button
              onClick={getWeather}
              disabled={loading}
              className="bg-green-700 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-green-800 transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Fetching weather...
                </>
              ) : (
                <>
                  <Cloud size={24} />
                  {t(language, 'get_weather')}
                </>
              )}
            </button>
            {location && (
              <p className="mt-4 text-gray-600">Location: {location}</p>
            )}
          </div>

          {weather.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {weather.map((day, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl hover:shadow-lg transition-all border-2 border-blue-200 hover:scale-105"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-green-700 mb-3">{day.date}</h3>
                    <div className="text-6xl mb-4">{day.icon}</div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">{day.temp}°C</div>
                    <p className="text-gray-600 mb-4">{day.description}</p>
                    <div className="space-y-2 pt-4 border-t border-blue-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <Droplets size={16} />
                          Humidity
                        </span>
                        <span className="font-bold text-green-700">{day.humidity}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <Wind size={16} />
                          Wind
                        </span>
                        <span className="font-bold text-green-700">{day.wind} km/h</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
