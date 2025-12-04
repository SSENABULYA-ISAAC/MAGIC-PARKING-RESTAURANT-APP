import React, { useState } from 'react';
import { Sparkles, Loader2, X } from 'lucide-react';
import { StockItem } from '../types';
import { generateDailyReport } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface GeminiInsightProps {
  items: StockItem[];
}

export const GeminiInsight: React.FC<GeminiInsightProps> = ({ items }) => {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateDailyReport(items);
    setReport(result);
    setLoading(false);
  };

  return (
    <div className="mt-8">
      {!report && !loading && (
        <button
          onClick={handleGenerate}
          className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
        >
          <Sparkles className="w-5 h-5" />
          <span>Generate Manager's Daily Report</span>
        </button>
      )}

      {loading && (
        <div className="flex items-center space-x-3 text-indigo-600 p-4 bg-indigo-50 rounded-lg animate-pulse">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Magic Assistant is analyzing your stock...</span>
        </div>
      )}

      {report && (
        <div className="relative bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-6 rounded-2xl shadow-sm">
          <button
            onClick={() => setReport(null)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Daily Stock Insight</h3>
          </div>
          <div className="prose prose-indigo prose-sm max-w-none text-slate-600">
            <ReactMarkdown>{report}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};