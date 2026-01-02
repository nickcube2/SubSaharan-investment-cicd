import { useEffect, useRef } from 'react';
import { GlobeMethods } from 'react-globe.gl';


type SwingRotationOptions = {
  globeRef: React.RefObject<GlobeMethods | undefined>;
  centerLat?: number;
  centerLng?: number;
  altitude?: number;
  swingAngleDeg?: number; // how far to rotate left and right
  durationMs?: number;
};

export default function useSwingRotation({
  globeRef,
  centerLat = 0,
  centerLng = 20,
  altitude = 2,
  swingAngleDeg = 30,
  durationMs = 6000
}: SwingRotationOptions) {
  const directionRef = useRef<1 | -1>(1);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    // Disable zooming
    const controls = globe.controls?.();
    if (controls) {
      controls.enableZoom = false;
    }

    const animateSwing = () => {
      const direction = directionRef.current;
      directionRef.current *= -1;

      const targetLng = centerLng + direction * swingAngleDeg;
      globe.pointOfView(
        { lat: centerLat, lng: targetLng, altitude },
        durationMs / 2
      );

      animationRef.current = window.setTimeout(animateSwing, durationMs);
    };

    globe.pointOfView({ lat: centerLat, lng: centerLng, altitude }, 0);
    animationRef.current = window.setTimeout(animateSwing, durationMs);

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [globeRef, centerLat, centerLng, altitude, swingAngleDeg, durationMs]);
}
