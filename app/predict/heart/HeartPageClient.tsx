'use client';

import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import PredictPage from '@/components/predict/PredictPage';

export default function HeartPageClient() {
  const { setActiveTab } = useTheme();

  useEffect(() => {
    setActiveTab('heart');
  }, [setActiveTab]);

  return <PredictPage type="heart" />;
}
