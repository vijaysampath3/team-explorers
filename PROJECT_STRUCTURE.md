# Smart Crop Recommendation System - File Connections

## 🏗️ Project Architecture Overview

```
📁 Project Root
├── 🌐 index.html (Entry Point)
├── ⚙️ Configuration Files
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── eslint.config.js
├── 📦 Dependencies
│   ├── package.json
│   └── package-lock.json
└── 📂 src/ (Source Code)
    ├── 🚀 main.tsx (React Entry Point)
    ├── 🎨 index.css (Global Styles)
    ├── 🏠 App.tsx (Main Application Component)
    ├── 📂 components/ (UI Components)
    ├── 📂 types/ (TypeScript Definitions)
    ├── 📂 data/ (Static Data)
    └── 📂 utils/ (Utility Functions)
```

## 🔗 File Connection Flow

### 1. **Entry Points & Main Flow**
```
index.html → main.tsx → App.tsx
    ↓           ↓         ↓
HTML Root   React DOM   Main App
```

### 2. **App.tsx Connections**
App.tsx imports and connects ALL components:
- Header.tsx
- HomeSection.tsx  
- RecommendationForm.tsx
- ResultsSection.tsx
- WeatherSection.tsx
- PestDetectionSection.tsx
- MarketPricesSection.tsx
- Chatbot.tsx

### 3. **Component Dependencies**

#### **Header.tsx**
```
Header.tsx
├── imports: Sprout, Globe (lucide-react)
├── imports: Language (from ../types)
├── imports: t (from ../data/translations)
└── exports: Header component
```

#### **HomeSection.tsx**
```
HomeSection.tsx
├── imports: Language (from ../types)
├── imports: t (from ../data/translations)
├── imports: Leaf, Zap, MapPin (lucide-react)
└── exports: HomeSection component
```

#### **RecommendationForm.tsx**
```
RecommendationForm.tsx
├── imports: FormData (from ../types)
├── imports: t (from ../data/translations)
├── imports: getCropRecommendations (from ../utils/cropRecommendation)
├── imports: cropDatabase (from ../data/crops)
└── exports: RecommendationForm component
```

#### **ResultsSection.tsx**
```
ResultsSection.tsx
├── imports: FormData, CropRecommendation (from ../types)
├── imports: t (from ../data/translations)
├── imports: cropDatabase (from ../data/crops)
└── exports: ResultsSection component
```

#### **WeatherSection.tsx**
```
WeatherSection.tsx
├── imports: Language (from ../types)
├── imports: t (from ../data/translations)
├── imports: Cloud, Sun, Droplets, Thermometer (lucide-react)
└── exports: WeatherSection component
```

#### **PestDetectionSection.tsx**
```
PestDetectionSection.tsx
├── imports: Language (from ../types)
├── imports: t (from ../data/translations)
├── imports: Camera, Upload, AlertTriangle (lucide-react)
└── exports: PestDetectionSection component
```

#### **MarketPricesSection.tsx**
```
MarketPricesSection.tsx
├── imports: Language (from ../types)
├── imports: t (from ../data/translations)
├── imports: TrendingUp, DollarSign (lucide-react)
└── exports: MarketPricesSection component
```

#### **Chatbot.tsx**
```
Chatbot.tsx
├── imports: Language (from ../types)
├── imports: MessageCircle, X, Send, Loader2, Sparkles, Minimize2 (lucide-react)
├── uses: OpenAI API (VITE_OPENAI_API_KEY)
└── exports: Chatbot component
```

## 📊 Data Flow

### **Types System**
```
types/index.ts
├── Language type → Used by ALL components
├── Crop interface → Used by RecommendationForm, ResultsSection
├── FormData interface → Used by RecommendationForm, ResultsSection
└── CropRecommendation interface → Used by ResultsSection
```

### **Data Files**
```
data/translations.ts
├── translations object → Used by ALL components for i18n
└── t() function → Used by ALL components

data/crops.ts
├── cropDatabase array → Used by RecommendationForm, ResultsSection
└── Crop objects → Used by recommendation engine
```

### **Utilities**
```
utils/cropRecommendation.ts
├── getCropRecommendations() function
├── imports: FormData, Crop, CropRecommendation (from ../types)
├── imports: cropDatabase (from ../data/crops)
└── Used by: RecommendationForm.tsx
```

## 🔄 Component Interaction Flow

### **Navigation Flow**
```
Header (Navigation) → App.tsx (State Management) → Section Components
```

### **Form Submission Flow**
```
RecommendationForm → handleFormSubmit() → ResultsSection
```

### **Language Toggle Flow**
```
Header → handleLanguageToggle() → App.tsx → ALL Components
```

### **Chatbot Flow**
```
Chatbot → OpenAI API → Response → User Interface
```

## 🎯 Key Connections Summary

1. **App.tsx** is the central hub connecting all components
2. **types/index.ts** provides shared TypeScript interfaces
3. **data/translations.ts** provides internationalization for all components
4. **data/crops.ts** provides crop data for recommendations
5. **utils/cropRecommendation.ts** processes form data to generate recommendations
6. **Header.tsx** manages navigation between sections
7. **Chatbot.tsx** operates independently with OpenAI integration

## 🚀 How to Run

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```


