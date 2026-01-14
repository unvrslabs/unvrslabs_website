import { useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';

export function useNativeFeatures() {
  const isNative = Capacitor.isNativePlatform();

  const hapticImpact = useCallback(async (style: 'light' | 'medium' | 'heavy' = 'medium') => {
    if (!isNative) return;
    try {
      const impactStyle = {
        light: ImpactStyle.Light,
        medium: ImpactStyle.Medium,
        heavy: ImpactStyle.Heavy
      }[style];
      await Haptics.impact({ style: impactStyle });
    } catch (e) {
      console.warn('Haptics not available:', e);
    }
  }, [isNative]);

  const hapticNotification = useCallback(async (type: 'success' | 'warning' | 'error' = 'success') => {
    if (!isNative) return;
    try {
      const notificationType = {
        success: NotificationType.Success,
        warning: NotificationType.Warning,
        error: NotificationType.Error
      }[type];
      await Haptics.notification({ type: notificationType });
    } catch (e) {
      console.warn('Haptics not available:', e);
    }
  }, [isNative]);

  const hapticSelection = useCallback(async () => {
    if (!isNative) return;
    try {
      await Haptics.selectionStart();
      await Haptics.selectionEnd();
    } catch (e) {
      console.warn('Haptics not available:', e);
    }
  }, [isNative]);

  const setStatusBarStyle = useCallback(async (style: 'dark' | 'light') => {
    if (!isNative) return;
    try {
      await StatusBar.setStyle({ style: style === 'dark' ? Style.Dark : Style.Light });
    } catch (e) {
      console.warn('StatusBar not available:', e);
    }
  }, [isNative]);

  const hideKeyboard = useCallback(async () => {
    if (!isNative) return;
    try {
      await Keyboard.hide();
    } catch (e) {
      console.warn('Keyboard not available:', e);
    }
  }, [isNative]);

  return {
    isNative,
    hapticImpact,
    hapticNotification,
    hapticSelection,
    setStatusBarStyle,
    hideKeyboard
  };
}
