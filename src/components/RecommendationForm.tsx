import { useState } from 'react';
import { ArrowLeft, MapPin, Loader2 } from 'lucide-react';
import { Language, FormData } from '../types';
import { t } from '../data/translations';
import { getRecommendations } from '../utils/cropRecommendation';

interface RecommendationFormProps {
  language: Language;
  onBack: () => void;
  onSubmit: (data: FormData, recommendations: any[]) => void;
}

export function RecommendationForm({ language, onBack, onSubmit }: RecommendationFormProps) {
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    location: '',
    soilType: '',
    phLevel:  6,
    rainfall: 100,
    temperature: 25,
    season: '',
    farmSize: 1,
    irrigation: '',
    budget: '',
    experience: '',
  });

  const handleGPS = () => {
    setGpsLoading(true);
    if (!navigator.geolocation) {
      alert('GPS not supported');
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setFormData({ ...formData, coordinates: coords, location: `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}` });
        setGpsLoading(false);
      },
      (error) => {
        alert('Unable to get location: ' + error.message);
        setGpsLoading(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const recommendations = getRecommendations(formData);
    onSubmit(formData, recommendations);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          {t(language, 'back_button')}
        </button>

        <h1 className="text-4xl font-bold text-green-700 text-center mb-8">
          {t(language, 'form_title')}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-orange-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Location Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t(language, 'location_label')}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleGPS}
                disabled={gpsLoading}
                className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {gpsLoading ? <Loader2 className="animate-spin" size={20} /> : <MapPin size={20} />}
                Use GPS Location
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                {t(language, 'soil_type_label')}
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                required
              >
                <option value="">Select soil type</option>
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="loam">Loam</option>
                <option value="sandy loam">Sandy Loam</option>
                <option value="black soil">Black Soil</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">pH Level</label>
              <input
                type="number"
                min="1"
                max="14"
                step="0.1"
                value={formData.phLevel}
                onChange={(e) => setFormData({ ...formData, phLevel: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">Annual Rainfall (mm)</label>
              <input
                type="number"
                min="0"
                value={formData.rainfall}
                onChange={(e) => setFormData({ ...formData, rainfall: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">Average Temperature (°C)</label>
              <input
                type="number"
                min="-10"
                max="50"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">Season</label>
              <select
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                required
              >
                <option value="">Select season</option>
                <option value="Kharif">Kharif (Monsoon)</option>
                <option value="Rabi">Rabi (Winter)</option>
                <option value="Zaid">Zaid (Summer)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">Farm Size (acres)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={formData.farmSize}
                onChange={(e) => setFormData({ ...formData, farmSize: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">Irrigation Type</label>
              <select
                value={formData.irrigation}
                onChange={(e) => setFormData({ ...formData, irrigation: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                required
              >
                <option value="">Select irrigation type</option>
                <option value="rainfed">Rainfed</option>
                <option value="irrigated">Irrigated</option>
                <option value="drip">Drip Irrigation</option>
                <option value="sprinkler">Sprinkler</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">Budget Range (₹)</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                required
              >
                <option value="">Select budget</option>
                <option value="low">Low (₹0-10,000)</option>
                <option value="medium">Medium (₹10,000-50,000)</option>
                <option value="high">High (₹50,000+)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-4 rounded-full text-lg font-bold hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                {t(language, 'analyzing')}
              </>
            ) : (
              t(language, 'submit')
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
