import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Globe, MapPin, Users } from 'lucide-react';
import { GlobalDriverGeoItem, CircuitGeoItem } from '../types';

interface DriverMapProps {
  driverGeo: GlobalDriverGeoItem[];
  circuitsGeo: CircuitGeoItem[];
}

export const DriverMap: React.FC<DriverMapProps> = ({ driverGeo, circuitsGeo }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const [mapMode, setMapMode] = useState<'drivers' | 'circuits'>('drivers');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize Leaflet Map with CartoDB Dark Matter tiles
      const map = L.map(mapContainerRef.current, {
        center: [28, 15],
        zoom: 2,
        minZoom: 1.5,
        maxZoom: 10,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      // cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when mapMode changes
  useEffect(() => {
    const layerGroup = layerGroupRef.current;
    if (!layerGroup || !mapInstanceRef.current) return;

    layerGroup.clearLayers();

    if (mapMode === 'drivers') {
      // Driver Distribution Markers
      driverGeo.forEach((item) => {
        const radius = Math.max(12, Math.min(26, item.count * 8));

        const icon = L.divIcon({
          className: 'custom-driver-pin',
          html: `
            <div style="
              width: ${radius * 2}px;
              height: ${radius * 2}px;
              background: radial-gradient(circle, rgba(225, 6, 0, 0.9) 0%, rgba(150, 0, 0, 0.7) 100%);
              border: 2px solid #FFFFFF;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: 11px;
              box-shadow: 0 0 12px rgba(225, 6, 0, 0.6);
              cursor: pointer;
            ">
              ${item.count}
            </div>
          `,
          iconSize: [radius * 2, radius * 2],
          iconAnchor: [radius, radius],
        });

        const popupContent = `
          <div style="padding: 6px 2px; min-width: 170px; font-family: sans-serif;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; border-bottom: 1px solid #242B3D; padding-bottom: 4px;">
              <span style="font-size: 18px;">${item.flag}</span>
              <strong style="color: #FFFFFF; font-size: 13px;">${item.country}</strong>
            </div>
            <div style="font-size: 11px; color: #9CA3AF; margin-bottom: 4px;">
              Drivers: <span style="color: #E10600; font-weight: bold;">${item.count}</span>
            </div>
            <ul style="margin: 0; padding-left: 16px; font-size: 11px; color: #E5E7EB; line-height: 1.4;">
              ${item.drivers.map((d) => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        `;

        L.marker([item.lat, item.lng], { icon })
          .bindPopup(popupContent)
          .addTo(layerGroup);
      });
    } else {
      // Circuit Location Markers
      circuitsGeo.forEach((circ) => {
        if (!circ.lat && !circ.lng) return;

        const isStreet = circ.type.toLowerCase().includes('street');
        const pinColor = isStreet ? '#FF8000' : '#00D2BE';

        const icon = L.divIcon({
          className: 'custom-circuit-pin',
          html: `
            <div style="
              width: 22px;
              height: 22px;
              background: ${pinColor};
              border: 2px solid #0B0E14;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #0B0E14;
              font-weight: 800;
              font-size: 11px;
              box-shadow: 0 0 10px ${pinColor}88;
              transform: rotate(45deg);
              cursor: pointer;
            ">
              <span style="transform: rotate(-45deg);">🏁</span>
            </div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });

        const popupContent = `
          <div style="padding: 6px 2px; min-width: 210px; font-family: sans-serif;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px; border-bottom: 1px solid #242B3D; padding-bottom: 4px;">
              <span style="font-size: 16px;">${circ.flag}</span>
              <strong style="color: #FFFFFF; font-size: 13px;">${circ.circuit_name}</strong>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 11px; color: #9CA3AF;">
              <div>Location: <strong style="color: #E5E7EB;">${circ.city}, ${circ.country}</strong></div>
              <div>Type: <strong style="color: ${pinColor};">${circ.type}</strong></div>
              <div>Lap Length: <strong style="color: #E5E7EB;">${circ.lap_km} km</strong></div>
              <div>Race Laps: <strong style="color: #E5E7EB;">${circ.laps}</strong></div>
              <div>Altitude: <strong style="color: #E5E7EB;">${circ.altitude_m} m</strong></div>
              <div>Direction: <strong style="color: #E5E7EB;">${circ.direction}</strong></div>
            </div>
          </div>
        `;

        L.marker([circ.lat, circ.lng], { icon })
          .bindPopup(popupContent)
          .addTo(layerGroup);
      });
    }
  }, [mapMode, driverGeo, circuitsGeo]);

  return (
    <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-4 shadow-lg flex flex-col h-full">
      {/* Map Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-[#E10600]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {mapMode === 'drivers'
                ? 'Global Driver Geographic Distribution'
                : 'Grand Prix Racing Circuits Across The Globe'}
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            {mapMode === 'drivers'
              ? '19 Formula 1 drivers mapped by country of nationality and FIA license'
              : '29 World Championship circuits categorized by permanent vs street configurations'}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-[#0B0E14] p-1 rounded-lg border border-[#242B3D] self-start sm:self-auto">
          <button
            onClick={() => setMapMode('drivers')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              mapMode === 'drivers'
                ? 'bg-[#E10600] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-3 h-3" />
            <span>Driver Distribution ({driverGeo.length} Nations)</span>
          </button>

          <button
            onClick={() => setMapMode('circuits')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              mapMode === 'circuits'
                ? 'bg-[#00D2BE] text-[#0B0E14]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3 h-3" />
            <span>Circuits ({circuitsGeo.length} Venues)</span>
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1 min-h-[360px] rounded-lg overflow-hidden border border-[#1E2330]">
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />
      </div>

      {/* Map Legend / Stats Bar */}
      <div className="mt-3 pt-2.5 border-t border-[#1E2330] flex flex-wrap items-center justify-between text-xs text-gray-400 gap-2">
        {mapMode === 'drivers' ? (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E10600]" />
              <span>Marker Size: Driver Density (1 to 3 drivers per nation)</span>
            </div>
            <span className="text-gray-600">•</span>
            <span>Top Country: United Kingdom (3 Drivers: Hamilton, Norris, Russell)</span>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#00D2BE]" />
              <span>Permanent Track</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FF8000]" />
              <span>Street Circuit</span>
            </div>
          </div>
        )}

        <span className="text-[11px] text-gray-500 font-mono">
          Click any pin for full telemetry & metadata
        </span>
      </div>
    </div>
  );
};
