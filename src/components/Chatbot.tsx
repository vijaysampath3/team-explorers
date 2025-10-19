import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, Minimize2 } from 'lucide-react';
import { Language } from '../types';

interface ChatbotProps {
  language: Language;
}

interface Message {
  text: string;
  isBot: boolean;
  time: string;
}

// ✅ Load API Key from .env
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export function Chatbot({ language }: ChatbotProps) {
  // Note: language parameter is available for future internationalization features
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: `🌾 Namaste! I'm your Agricultural Expert AI Assistant.\n\nI can help you with ANY agriculture-related questions:\n\n🌱 Crop recommendations & selection\n🌍 Soil types & analysis\n☀️ Weather & seasonal planning\n💧 Irrigation & water management\n🐛 Pest & disease control\n🌾 Fertilizers & NPK ratios\n📊 Market prices & trends\n\n💡 **Quick Start:** Try asking about:\n- "Best crops for clay soil"\n- "Kharif season planting"\n- "Organic pest control"\n\nAsk me anything about farming!`,
      isBot: true,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getFallbackResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Basic fallback responses for common agricultural queries
    if (message.includes('soil') || message.includes('clay') || message.includes('sandy')) {
      return `🌍 **Soil Information:**

**Clay Soil:** Good for rice, wheat, sugarcane. Retains water well but needs drainage.

**Sandy Soil:** Perfect for groundnuts, carrots, potatoes. Needs frequent watering and organic matter.

**Loamy Soil:** Ideal for most crops - balanced water retention and drainage.

**Tips:**
- Test soil pH (6.0-7.5 is ideal for most crops)
- Add compost to improve soil structure
- Use cover crops to prevent erosion

*Note: This is general advice. For specific recommendations, please set up your Groq API key.*`;
    }

    if (message.includes('crop') || message.includes('plant') || message.includes('grow')) {
      return `🌱 **Crop Selection Guide:**

**Kharif Season (June-October):**
- Rice, Maize, Cotton, Sugarcane
- Groundnut, Soybean, Bajra

**Rabi Season (October-March):**
- Wheat, Barley, Mustard, Gram
- Potato, Onion, Tomato

**Summer Season (March-June):**
- Cucumber, Okra, Bitter gourd
- Watermelon, Muskmelon

**Consider:**
- Local climate and rainfall
- Soil type and fertility
- Market demand and prices
- Water availability

*For personalized recommendations, please configure your Groq API key.*`;
    }

    if (message.includes('pest') || message.includes('disease') || message.includes('insect')) {
      return `🐛 **Pest & Disease Management:**

**Common Pests:**
- Aphids: Use neem oil or soap solution
- Whiteflies: Yellow sticky traps
- Caterpillars: BT (Bacillus thuringiensis)

**Prevention:**
- Crop rotation
- Proper spacing
- Regular monitoring
- Natural predators

**Organic Solutions:**
- Neem oil
- Garlic-chili spray
- Compost tea
- Beneficial insects

**Early Detection:**
- Check leaves daily
- Look for spots, holes, or wilting
- Act quickly when problems appear

*For specific pest identification, please set up your Groq API key.*`;
    }

    return `🌾 **General Agricultural Advice:**

I'm here to help with farming questions! Here are some common topics I can assist with:

- **Crop Selection** - Choosing the right crops for your season and soil
- **Soil Management** - Improving soil health and fertility  
- **Pest Control** - Natural and organic pest management
- **Water Management** - Efficient irrigation techniques
- **Market Prices** - Understanding crop pricing trends
- **Weather Planning** - Seasonal farming strategies

**Quick Tips:**
- Always test your soil before planting
- Practice crop rotation to maintain soil health
- Use organic fertilizers when possible
- Monitor weather forecasts regularly
- Keep records of your farming activities

*For more detailed and personalized advice, please configure your Groq API key in the .env file.*`;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToGroq = async (userMessage: string): Promise<string> => {
    if (!GROQ_API_KEY) {
      console.warn('⚠️ Groq API key is missing. Please set VITE_GROQ_API_KEY in your .env file.');
      return `❌ API key is not configured. Please set up your Groq API key in the .env file.

To fix this:
1. Get an API key from https://console.groq.com/keys
2. Create a .env file in your project root
3. Add: VITE_GROQ_API_KEY=your_api_key_here
4. Restart the development server

For now, I can provide general agricultural advice based on my training data.`;
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are an expert agricultural assistant specializing in Indian farming practices. You help farmers and agricultural professionals with comprehensive farming advice.

Your expertise includes:
- Crop Selection
- Soil Management
- Seasonal Planning
- Water Management
- Pest & Disease Control
- Fertilizers
- Market Intelligence
- Weather Considerations
- Modern Techniques
- Government Schemes

IMPORTANT: Be practical, scientific, and farmer-friendly. Use Indian context and include emojis for engagement.`,
            },
            {
              role: 'user',
              content: userMessage,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', errorData);
        throw new Error(`API Error: ${response.status} - ${errorData?.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Groq API Error:', error);
      return getFallbackResponse(userMessage);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      text: input,
      isBot: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    const questionText = input;
    setInput('');
    setIsTyping(true);

    const botResponse = await sendMessageToGroq(questionText);

    setIsTyping(false);
    const botMessage: Message = {
      text: botResponse,
      isBot: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev: Message[]) => [...prev, botMessage]);
  };

  const quickQuestions = [
    '🌾 Best crops for clay soil?',
    '☀️ What to grow in Kharif season?',
    '💧 Low water requirement crops?',
    '🌱 Organic pest control methods?',
  ];

  const handleQuickQuestion = (question: string) => {
    const cleanQuestion = question.replace(/[🌾☀️💧🌱]/g, '').trim();
    setInput(cleanQuestion);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen ? (
        <div
          className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${isMinimized ? 'w-80 h-16' : 'w-[420px] h-[650px]'
            } flex flex-col`}
          style={{
            boxShadow: '0 20px 60px rgba(46, 139, 87, 0.3)',
            border: '1px solid rgba(46, 139, 87, 0.1)',
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white p-5 flex justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <Sparkles size={24} className="text-yellow-300" />
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">Agriculture AI Expert</h3>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse shadow-lg shadow-green-300"></div>
                  <span className="text-xs">Powered by Groq AI</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 relative z-10">
              <button onClick={() => setIsMinimized(!isMinimized)} title="Minimize" className="hover:bg-white/20 p-2 rounded-xl transition-all hover:scale-110">
                <Minimize2 size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} title="Close" className="hover:bg-white/20 p-2 rounded-xl transition-all hover:scale-110 hover:rotate-90">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-5 bg-gradient-to-b from-gray-50 to-white space-y-4">
                {messages.map((msg: Message, idx: number) => (
                  <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl transition-all hover:scale-[1.02] ${msg.isBot
                      ? 'bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-100'
                      : 'bg-gradient-to-r from-green-600 to-green-500 text-white rounded-br-none shadow-lg'
                      }`}>
                      <p className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-2 ${msg.isBot ? 'text-gray-400' : 'text-green-100'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-md border border-gray-100 flex items-center gap-2">
                      <Loader2 className="animate-spin text-green-600" size={18} />
                      <span className="text-sm text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {messages.length === 1 && (
                <div className="px-5 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Quick questions to get started:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q, idx) => (
                      <button key={idx} onClick={() => handleQuickQuestion(q)} className="text-xs bg-white hover:bg-green-50 text-gray-700 px-3 py-2 rounded-full border border-green-200 hover:border-green-400 transition-all hover:scale-105 shadow-sm">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                    onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask about farming, crops, soil, pests..."
                    disabled={isTyping}
                    className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-full focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isTyping}
                    className="bg-gradient-to-r from-green-600 to-green-500 text-white p-3 rounded-full hover:shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                    <Send size={20} className="relative z-10" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-green-600 to-green-500 text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-green-500/50 hover:scale-110 transition-all flex items-center justify-center relative overflow-hidden group"
          style={{ animation: 'bounce 2s infinite' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          <MessageCircle size={28} className="relative z-10 group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
        </button>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
