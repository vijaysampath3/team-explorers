import { Sprout, Globe } from 'lucide-react';
import { Language } from '../types';
import { t } from '../data/translations';

interface HeaderProps {
  currentSection: string;
  onNavigate: (section: any) => void;
  language: Language;
  onLanguageToggle: () => void;
}

export function Header({ currentSection, onNavigate, language, onLanguageToggle }: HeaderProps) {
  const langLabel = language === 'english' ? 'हिंदी' : language === 'hindi' ? 'తెలుగు' : 'English';

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-green-700 font-bold text-2xl">
            <Sprout size={32} />
            <span>{t(language, 'logo')}</span>
          </div>

          <ul className="hidden md:flex gap-6">
            <li>
              <button
                onClick={() => onNavigate('home')}
                className={`font-medium transition-colors hover:text-green-700 ${
                  currentSection === 'home' ? 'text-green-700 font-bold' : 'text-gray-700'
                }`}
              >
                {t(language, 'nav_home')}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('form')}
                className={`font-medium transition-colors hover:text-green-700 ${
                  currentSection === 'form' ? 'text-green-700 font-bold' : 'text-gray-700'
                }`}
              >
                {t(language, 'nav_recommendation')}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('weather')}
                className={`font-medium transition-colors hover:text-green-700 ${
                  currentSection === 'weather' ? 'text-green-700 font-bold' : 'text-gray-700'
                }`}
              >
                {t(language, 'nav_weather')}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('pest')}
                className={`font-medium transition-colors hover:text-green-700 ${
                  currentSection === 'pest' ? 'text-green-700 font-bold' : 'text-gray-700'
                }`}
              >
                {t(language, 'nav_pest')}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('market')}
                className={`font-medium transition-colors hover:text-green-700 ${
                  currentSection === 'market' ? 'text-green-700 font-bold' : 'text-gray-700'
                }`}
              >
                {t(language, 'nav_market')}
              </button>
            </li>
          </ul>

          <button
            onClick={onLanguageToggle}
            className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition-colors flex items-center gap-2"
          >
            <Globe size={16} />
            <span>{langLabel}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
