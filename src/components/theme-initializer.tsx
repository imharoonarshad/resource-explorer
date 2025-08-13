'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/use-store';

export default function ThemeInitializer() {
  useEffect(() => {
    // Manually trigger hydration for favorites
    useStore.persist.rehydrate();
  }, []);

  return null;
}