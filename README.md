# Smart Crop Recommendation System

A comprehensive agricultural web application that provides crop recommendations, weather information, pest detection, and market prices to help farmers make informed decisions.

## Features

- 🌾 **Smart Crop Recommendations** - Get personalized crop suggestions based on soil type, weather, and location
- 🌤️ **Weather Information** - Real-time weather data for better farming decisions
- 🐛 **Pest Detection** - AI-powered pest and disease identification from crop images
- 📊 **Market Prices** - Current market prices for various crops
- 🤖 **AI Chatbot** - Agricultural expert AI assistant powered by OpenAI
- 🌍 **Multi-language Support** - Available in English, Hindi, and Telugu

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: Groq AI (Llama 3.1 70B)
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Myproject.git
cd Myproject
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_API_ENDPOINT=your_api_endpoint_here
VITE_API_KEY=your_api_key_here
```

5. Start development server:
```bash
npm run dev
```

## Deployment to GitHub Pages

### Method 1: Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Go to your repository settings
3. Navigate to "Pages" section
4. Select "GitHub Actions" as source
5. The workflow will automatically deploy when you push to main/master branch

### Method 2: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Commit and push the `dist` folder to a `gh-pages` branch:
```bash
npm install -g gh-pages
gh-pages -d dist
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Groq API Key for Chatbot
VITE_GROQ_API_KEY=your_groq_api_key

# Pest Detection API
VITE_API_ENDPOINT=your_pest_detection_api_endpoint
VITE_API_KEY=your_pest_detection_api_key
```

### Getting Groq API Key for Chatbot

1. Visit [Groq Console](https://console.groq.com/keys)
2. Sign up or log in to your account
3. Click "Create API Key"
4. Copy the generated API key
5. Add it to your `.env` file as `VITE_GROQ_API_KEY=your_actual_api_key`

**Note:** The chatbot works without an API key but with limited functionality. It provides basic agricultural advice based on predefined responses. For full AI-powered responses, a Groq API key is required.

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── HomeSection.tsx
│   ├── RecommendationForm.tsx
│   ├── ResultsSection.tsx
│   ├── WeatherSection.tsx
│   ├── PestDetectionSection.tsx
│   ├── MarketPricesSection.tsx
│   └── Chatbot.tsx
├── data/               # Static data and translations
│   ├── crops.ts
│   ├── translations.ts
│   └── pestData.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── cropRecommendation.ts
└── main.tsx           # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

