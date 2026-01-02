'use client';
import { useRef, useEffect, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import useSwingRotation  from '../hooks/useAutoResetView';
import countries from '../lib/custom.geo.json';

import type { FeatureCollection, Feature, Geometry, GeoJsonProperties, Polygon, MultiPolygon, Position } from 'geojson';

interface ContinentCenter {
  name: string;
  lat: number;
  lng: number;
}
interface CountryPath {
  points: [number, number][];
  name: string;
  continent: string;
}
interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  name: string;
  type: string;
}
interface RingData {
  lat: number;
  lng: number;
  maxRadius: number;
  propagationSpeed: number;
  repeatPeriod: number;
  color: string;
}

const continentCenters = [
  { name: 'North America', lat: 40, lng: -100 },
  { name: 'South America', lat: -15, lng: -60 },
  { name: 'Europe', lat: 50, lng: 10 },
  { name: 'Asia', lat: 45, lng: 100 },
  { name: 'Africa', lat: 0, lng: 20 },
  { name: 'Australia', lat: -25, lng: 135 },
  { name: 'Antarctica', lat: -90, lng: 0 }
];

const subSaharanCountries = [
  { name: 'Nigeria', lat: 9.082, lng: 8.6753 },
  { name: 'Kenya', lat: -0.0236, lng: 37.9062 },
  { name: 'Ethiopia', lat: 9.145, lng: 40.4897 },
  { name: 'Tanzania', lat: -6.369, lng: 34.8888 },
  { name: 'Ghana', lat: 7.9465, lng: -1.0232 },
  { name: 'Angola', lat: -11.2027, lng: 17.8739 },
  { name: 'Mozambique', lat: -18.6657, lng: 35.5296 }
];

const continentalConnections = [
  { name: 'North America', lat: 40.7128, lng: -74.006, color: '#FF4B4B' },
  { name: 'South America', lat: -23.5505, lng: -46.6333, color: '#4CAF50' },
  { name: 'Europe', lat: 51.5074, lng: -0.1278, color: '#2196F3' },
  { name: 'Asia', lat: 31.2304, lng: 121.4737, color: '#FFC107' },
  { name: 'Australia', lat: -33.8688, lng: 151.2093, color: '#9C27B0' }
];

// Helper to convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

type ConnectivityGlobeProps = {
  className?: string;
};

const ConnectivityGlobe = ({ className }: ConnectivityGlobeProps) => {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  const southAfricaLat = -30.5595;
  const southAfricaLng = 22.9375;

  const africanArcsData = subSaharanCountries.map(country => ({
    startLat: southAfricaLat,
    startLng: southAfricaLng,
    endLat: country.lat,
    endLng: country.lng,
    color: 'rgba(255, 165, 0, 0.6)',
    name: country.name,
    type: 'regional'
  }));

  const continentalArcsData = continentalConnections.map(continent => ({
    startLat: southAfricaLat,
    startLng: southAfricaLng,
    endLat: continent.lat,
    endLng: continent.lng,
    color: hexToRgba(continent.color, 0.8),
    name: continent.name,
    type: 'continental'
  }));

  const arcsData = [...africanArcsData, ...continentalArcsData];

  const ringsData = [
    { lat: southAfricaLat, lng: southAfricaLng, maxRadius: 2, propagationSpeed: 1, repeatPeriod: 1000, color: 'rgba(255,255,100,0.8)' },
    ...subSaharanCountries.map(c => ({
      lat: c.lat, lng: c.lng, maxRadius: 1.5, propagationSpeed: 1, repeatPeriod: 1000, color: 'rgba(255,165,0,0.6)'
    })),
    ...continentalConnections.map(c => ({
      lat: c.lat, lng: c.lng, maxRadius: 2, propagationSpeed: 1, repeatPeriod: 1000, color: hexToRgba(c.color, 0.8)
    }))
  ];

  // Only set up resize effect on client
  useEffect(() => {
    if (typeof window === 'undefined') return;
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!globeEl.current) return;
    const controls = globeEl.current.controls?.();
    if (controls) {
      controls.enableZoom = false;
    }
  }, []);

  useSwingRotation({
    globeRef: globeEl,
    centerLat: 0,
    centerLng: 20,
    altitude: 2,
    swingAngleDeg: 30, // rotates ±30° from center
    durationMs: 6000   // completes swing every 6s
  });

  const features = (countries as FeatureCollection<Geometry, GeoJsonProperties>).features as Feature<Geometry, GeoJsonProperties>[];
  const countryPaths = features.flatMap(f => {
    const geom = f.geometry;
    const continent = f.properties?.continent;
    const name = f.properties?.ADMIN;
    if (!geom) return [];
    if (geom.type === 'Polygon') {
      return (geom as Polygon).coordinates.map((ring: Position[]) => ({
        points: ring.map(([lng, lat]) => [lat, lng]),
        name,
        continent
      }));
    } else if (geom.type === 'MultiPolygon') {
      return (geom as MultiPolygon).coordinates.flatMap((poly: Position[][]) =>
        poly.map((ring: Position[]) => ({
          points: ring.map(([lng, lat]) => [lat, lng]),
          name,
          continent
        }))
      );
    }
    return [];
  });

  const continentBaseColors: Record<string, string> = {
    'North America': '#FF4B4B',
    'South America': '#4CAF50',
    'Europe': '#2196F3',
    'Asia': '#FFC107',
    'Australia': '#9C27B0',
    'Africa': '#FF9800',
    'Antarctica': '#607D8B'
  };

  return (
    <div className={className}>
      <Globe
        ref={globeEl}
        globeImageUrl={null}
        width={dimensions.width * 0.8}
        height={dimensions.height * 0.8}
        showGlobe
        pathsData={countryPaths}
        pathPoints={(d: object) => (d as CountryPath).points}
        pathColor={(d: object) => continentBaseColors[(d as CountryPath).continent] || '#CCCCCC'}
        pathStroke={1}
        pathLabel={(d: object) => (d as CountryPath).name}
        backgroundColor="rgba(0,0,0,0)"
        showGraticules
        showAtmosphere
        atmosphereColor="#ffffff"
        atmosphereAltitude={0.1}
        labelsData={continentCenters}
        labelLat={(d: object) => (d as ContinentCenter).lat}
        labelLng={(d: object) => (d as ContinentCenter).lng}
        labelText={(d: object) => (d as ContinentCenter).name}
        labelSize={() => 3}
        labelColor={(d: object) => continentBaseColors[(d as ContinentCenter).name] || 'white'}
        labelAltitude={0.1}
        labelIncludeDot={false}
        ringsData={ringsData}
        ringLat={(d: object) => (d as RingData).lat}
        ringLng={(d: object) => (d as RingData).lng}
        ringColor={(d: object) => (d as RingData).color}
        ringMaxRadius={(d: object) => (d as RingData).maxRadius}
        ringPropagationSpeed={(d: object) => (d as RingData).propagationSpeed}
        ringRepeatPeriod={(d: object) => (d as RingData).repeatPeriod}
        arcsData={arcsData}
        arcColor={(d: object) => (d as ArcData).color}
        arcDashLength={0.8}
        arcDashGap={1}
        arcDashAnimateTime={4000}
        arcStroke={(d: object) => (d as ArcData).type === 'continental' ? 2 : 1}
        arcLabel={(d: object) => `South Africa → ${(d as ArcData).name}`}
        arcAltitude={0.3}
      />
    </div>
  );
};

export default ConnectivityGlobe;
