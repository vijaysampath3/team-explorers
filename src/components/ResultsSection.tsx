import { ArrowLeft, Download } from 'lucide-react';
import { Language, CropRecommendation, FormData } from '../types';
import { t } from '../data/translations';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ResultsSectionProps {
  language: Language;
  formData: FormData;
  recommendations: CropRecommendation[];
  onBack: () => void;
  onNewRecommendation: () => void;
}

export function ResultsSection({
  language,
  formData,
  recommendations,
  onBack,
  onNewRecommendation,
}: ResultsSectionProps) {
  const getCategoryColor = (category: string) => {
    if (category === 'recommended') return 'border-green-500 bg-gradient-to-br from-green-50 to-green-100';
    if (category === 'good') return 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100';
    return 'border-red-400 bg-gradient-to-br from-red-50 to-red-100';
  };

  const getBenefits = (crop: CropRecommendation) => {
    return crop.benefits[language === 'hindi' ? 'hi' : language === 'telugu' ? 'te' : 'en'];
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(46, 139, 87);
    doc.text('Smart Crop Recommendation Report', 105, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 28, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(46, 139, 87);
    doc.text('Location & Conditions', 14, 40);

    const conditionsData = [
      ['Location', formData.location],
      ['Soil Type', formData.soilType],
      ['pH Level', formData.phLevel.toString()],
      ['Rainfall', `${formData.rainfall} mm`],
      ['Temperature', `${formData.temperature}°C`],
      ['Season', formData.season],
      ['Farm Size', `${formData.farmSize} acres`],
      ['Irrigation', formData.irrigation],
      ['Budget', formData.budget],
    ];

    autoTable(doc, {
      startY: 45,
      head: [['Parameter', 'Value']],
      body: conditionsData,
      theme: 'grid',
      headStyles: { fillColor: [46, 139, 87] },
      margin: { left: 14, right: 14 },
    });

    const finalY = (doc as any).lastAutoTable.finalY || 45;
    doc.setFontSize(14);
    doc.setTextColor(46, 139, 87);
    doc.text('Recommended Crops', 14, finalY + 15);

    const cropsData = recommendations.map(crop => [
      crop.Crop_Name,
      `${crop.score.toFixed(0)}%`,
      crop.Season,
      crop.Water_Requirement,
      `${crop.Yield} kg/acre`,
      crop.NPK_Recommendation,
    ]);

    autoTable(doc, {
      startY: finalY + 20,
      head: [['Crop Name', 'Score', 'Season', 'Water Need', 'Yield', 'NPK']],
      body: cropsData,
      theme: 'striped',
      headStyles: { fillColor: [46, 139, 87] },
      margin: { left: 14, right: 14 },
    });

    const benefitsY = (doc as any).lastAutoTable.finalY || finalY + 20;
    doc.setFontSize(14);
    doc.setTextColor(46, 139, 87);
    doc.text('Top Crop Benefits', 14, benefitsY + 15);

    let currentY = benefitsY + 22;
    recommendations.slice(0, 3).forEach((crop, index) => {
      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`${index + 1}. ${crop.Crop_Name} (${crop.score.toFixed(0)}%)`, 14, currentY);

      doc.setFontSize(10);
      doc.setTextColor(80);
      const benefits = getBenefits(crop);
      benefits.forEach((benefit, idx) => {
        currentY += 6;
        if (currentY > 280) {
          doc.addPage();
          currentY = 20;
        }
        doc.text(`   • ${benefit}`, 18, currentY);
      });

      currentY += 8;
    });

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        '© 2024 Smart Crop Recommendation System',
        105,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - 20,
        doc.internal.pageSize.height - 10,
        { align: 'right' }
      );
    }

    doc.save(`crop-recommendations-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          {t(language, 'back_button')}
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-green-700 text-center mb-8">
            Your Crop Recommendations
          </h1>

          <div className="bg-gray-50 p-6 rounded-xl mb-8 border-l-4 border-green-700">
            <h3 className="text-xl font-bold text-green-700 mb-4">Location & Conditions</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <strong className="text-green-700">Location:</strong> {formData.location}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <strong className="text-green-700">Soil Type:</strong> {formData.soilType}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <strong className="text-green-700">pH Level:</strong> {formData.phLevel}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <strong className="text-green-700">Rainfall:</strong> {formData.rainfall} mm
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <strong className="text-green-700">Temperature:</strong> {formData.temperature}°C
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <strong className="text-green-700">Season:</strong> {formData.season}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Recommended Crops</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((crop) => (
                <div
                  key={crop.Crop_ID}
                  className={`p-6 rounded-2xl border-3 transition-transform hover:scale-105 ${getCategoryColor(
                    crop.category
                  )}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{crop.icon}</span>
                      <h3 className="text-xl font-bold text-gray-800">{crop.Crop_Name}</h3>
                    </div>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {crop.score.toFixed(0)}%
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">Season:</span>
                      <span className="text-gray-600">{crop.Season}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">Water Need:</span>
                      <span className="text-gray-600">{crop.Water_Requirement}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">Yield:</span>
                      <span className="text-gray-600">{crop.Yield} kg/acre</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-semibold text-gray-700">NPK:</span>
                      <span className="text-gray-600">{crop.NPK_Recommendation}</span>
                    </div>
                  </div>

                  <div className="bg-white/50 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {getBenefits(crop).map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-green-600 font-bold">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={onNewRecommendation}
              className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors"
            >
              Get New Recommendation
            </button>
            <button
              onClick={downloadPDF}
              className="bg-green-700 text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition-colors flex items-center gap-2"
            >
              <Download size={20} />
              Download PDF Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
  