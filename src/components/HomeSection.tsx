import { Target, Smartphone, MapPin, TrendingUp } from 'lucide-react';
import { Language } from '../types';
import { t } from '../data/translations';

interface HomeSectionProps {
  language: Language;
  onGetStarted: () => void;
}

export function HomeSection({ language, onGetStarted }: HomeSectionProps) {
  return (
    <div>
      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
            {t(language, 'hero_title')}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-95">
            {t(language, 'hero_subtitle')}
          </p>
          <button
            onClick={onGetStarted}
            className="bg-green-200 text-green-800 px-8 py-4 rounded-full text-xl font-bold hover:bg-white hover:text-green-700 transition-all transform hover:scale-105 shadow-lg"
          >
            {t(language, 'hero_cta')}
          </button>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-700">
            {t(language, 'features_title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-orange-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow border border-green-100">
              <Target className="w-16 h-16 mx-auto mb-4 text-green-700" />
              <h3 className="text-xl font-bold mb-3 text-green-800">{t(language, 'feature1_title')}</h3>
              <p className="text-gray-700">{t(language, 'feature1_desc')}</p>
            </div>
            <div className="bg-orange-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow border border-green-100">
              <Smartphone className="w-16 h-16 mx-auto mb-4 text-green-700" />
              <h3 className="text-xl font-bold mb-3 text-green-800">{t(language, 'feature2_title')}</h3>
              <p className="text-gray-700">{t(language, 'feature2_desc')}</p>
            </div>
            <div className="bg-orange-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow border border-green-100">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-green-700" />
              <h3 className="text-xl font-bold mb-3 text-green-800">{t(language, 'feature3_title')}</h3>
              <p className="text-gray-700">{t(language, 'feature3_desc')}</p>
            </div>
            <div className="bg-orange-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow border border-green-100">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-green-700" />
              <h3 className="text-xl font-bold mb-3 text-green-800">{t(language, 'feature4_title')}</h3>
              <p className="text-gray-700">{t(language, 'feature4_desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
