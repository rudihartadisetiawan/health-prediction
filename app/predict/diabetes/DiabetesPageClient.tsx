'use client';

import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import PredictPage from '@/components/predict/PredictPage';

export default function DiabetesPageClient() {
  const { setActiveTab } = useTheme();

  useEffect(() => {
    setActiveTab('diabetes');
  }, [setActiveTab]);

  return <PredictPage type="diabetes" />;
}
