import { FormData, Crop, CropRecommendation } from '../types';
import { cropDatabase } from '../data/crops';

export function calculateCropScore(crop: Crop, data: FormData): number {
  let score = 100;

  const soilMatch = crop.Soil_Type.toLowerCase() === data.soilType.toLowerCase();
  if (!soilMatch) score -= 30;

  const seasonMatch = crop.Season === data.season || crop.Season === 'Both' || crop.Season === 'Annual';
  if (!seasonMatch) score -= 25;

  const waterReq = crop.Water_Requirement.toLowerCase();
  if (data.irrigation === 'rainfed' && waterReq === 'high') score -= 20;
  if (data.irrigation === 'drip' && waterReq === 'high') score += 10;

  if (data.phLevel < 5.5 || data.phLevel > 8.5) score -= 15;

  if (data.rainfall < 500 && waterReq === 'high') score -= 25;
  if (data.rainfall > 2000 && waterReq === 'low') score -= 10;

  if (data.temperature < 15 && crop.Crop_Name.includes('Rice')) score -= 20;
  if (data.temperature > 35 && crop.Crop_Name.includes('Wheat')) score -= 20;

  if (data.budget === 'low' && crop.NPK_Recommendation.split('-')[0] > '150') score -= 15;

  score += Math.random() * 10;

  return Math.max(0, Math.min(100, score));
}

export function getRecommendations(data: FormData): CropRecommendation[] {
  const scoredCrops = cropDatabase.map(crop => ({
    ...crop,
    score: calculateCropScore(crop, data)
  }));

  scoredCrops.sort((a, b) => b.score - a.score);

  const recommendations = scoredCrops.slice(0, 6).map(crop => ({
    ...crop,
    category: crop.score >= 75 ? 'recommended' : crop.score >= 60 ? 'good' : 'moderate'
  })) as CropRecommendation[];

  return recommendations;
}
