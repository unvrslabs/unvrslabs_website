import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

export function useCapacitor() {
  const [isNative, setIsNative] = useState(false);
  const [platform, setPlatform] = useState<'web' | 'ios' | 'android'>('web');

  useEffect(() => {
    const native = Capacitor.isNativePlatform();
    setIsNative(native);
    setPlatform(Capacitor.getPlatform() as 'web' | 'ios' | 'android');
  }, []);

  return { isNative, platform, isIOS: platform === 'ios', isAndroid: platform === 'android' };
}
