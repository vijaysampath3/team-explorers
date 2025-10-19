import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeSection } from './components/HomeSection';
import { RecommendationForm } from './components/RecommendationForm';
import { ResultsSection } from './components/ResultsSection';
import { WeatherSection } from './components/WeatherSection';
import { PestDetectionSection } from './components/PestDetectionSection';
import { MarketPricesSection } from './components/MarketPricesSection';
import { Chatbot } from './components/Chatbot';
import { Language } from './types';

type Section = 'home' | 'form' | 'results' | 'weather' | 'pest' | 'market';

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [language, setLanguage] = useState<Language>('english');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage') as Language;
    if (saved) setLanguage(saved);
  }, []);

  const handleLanguageToggle = () => {
    const next = language === 'english' ? 'hindi' : language === 'hindi' ? 'telugu' : 'english';
    setLanguage(next);
    localStorage.setItem('preferredLanguage', next);
  };

  const handleFormSubmit = (data: any, recs: any[]) => {
    setFormData(data);
    setRecommendations(recs);
    setCurrentSection('results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        language={language}
        onLanguageToggle={handleLanguageToggle}
      />

      <main>
        {currentSection === 'home' && (
          <HomeSection
            language={language}
            onGetStarted={() => setCurrentSection('form')}
          />
        )}

        {currentSection === 'form' && (
          <RecommendationForm
            language={language}
            onBack={() => setCurrentSection('home')}
            onSubmit={handleFormSubmit}
          />
        )}

        {currentSection === 'results' && (
          <ResultsSection
            language={language}
            formData={formData}
            recommendations={recommendations}
            onBack={() => setCurrentSection('home')}
            onNewRecommendation={() => setCurrentSection('form')}
          />
        )}

        {currentSection === 'weather' && (
          <WeatherSection
            language={language}
            onBack={() => setCurrentSection('home')}
          />
        )}

        {currentSection === 'pest' && (
          <PestDetectionSection
            language={language}
            onBack={() => setCurrentSection('home')}
          />
        )}

        {currentSection === 'market' && (
          <MarketPricesSection
            language={language}
            onBack={() => setCurrentSection('home')}
          />
        )}
      </main>

      <footer className="bg-green-700 text-white text-center py-8 mt-16">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 Smart Crop Recommendation System. Helping farmers make better decisions.</p>
        </div>
      </footer>

      <Chatbot language={language} />
    </div>
  );
}

export default App;
