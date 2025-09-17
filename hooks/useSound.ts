import { useMemo, useCallback } from 'react';

export const useSound = (soundUrl: string) => {
  const audio = useMemo(() => {
    if (typeof Audio !== 'undefined') {
      return new Audio(soundUrl);
    }
    return null;
  }, [soundUrl]);

  const play = useCallback(() => {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(error => {
        // Autoplay is often blocked by browsers, log error silently
        console.error("Error playing sound:", error);
      });
    }
  }, [audio]);

  return play;
};
