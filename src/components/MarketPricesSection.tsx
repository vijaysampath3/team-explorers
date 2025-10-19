import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Language } from '../types';
import { t } from '../data/translations';
import { cropDatabase } from '../data/crops';

interface MarketPricesSectionProps {
  language: Language;
  onBack: () => void;
}

export function MarketPricesSection({ language, onBack }: MarketPricesSectionProps) {
  const [search, setSearch] = useState('');

  const marketPrices = cropDatabase.map(crop => ({
    ...crop,
    price: (Math.random() * (80 - 20) + 20).toFixed(2),
  }));

  const filteredPrices = marketPrices.filter(item =>
    item.Crop_Name.toLowerCase().includes(search.toLowerCase())
  );

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
            Live Market Prices
          </h1>

          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">
              {t(language, 'search_crop')}
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type to search for a crop..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>

          <p className="text-center text-gray-600 italic mb-6">
            Note: Prices are indicative and based on recent data. Actual market prices may vary.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="text-left p-4 font-bold text-green-700">Crop Name</th>
                  <th className="text-left p-4 font-bold text-green-700">Market Price (per kg)</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrices.map((item) => (
                  <tr
                    key={item.Crop_ID}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <span className="text-2xl mr-2">{item.icon}</span>
                      <span className="font-medium">{item.Crop_Name}</span>
                    </td>
                    <td className="p-4 font-bold text-green-700">₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPrices.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No crops found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
