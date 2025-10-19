export type Language = 'english' | 'hindi' | 'telugu';

export interface Crop {
  Crop_ID: number;
  Crop_Name: string;
  Season:  string;
  Soil_Type: string;
  Water_Requirement: string;
  NPK_Recommendation: string;
  Yield: number;
  icon: string;
  benefits: {
    en: string[];
    hi: string[];
    te: string[];
  };
}

export interface FormData {
  location: string;
  soilType: string;
  phLevel: number;
  rainfall: number;
  temperature: number;
  season: string;
  farmSize: number;
  irrigation: string;
  budget: string;
  experience: string;
  coordinates?: { latitude: number; longitude: number };
}

export interface CropRecommendation extends Crop {
  score: number;
  category: 'recommended' | 'good' | 'moderate';
}
