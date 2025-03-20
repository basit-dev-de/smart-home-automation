
import React from 'react';
import DeviceCard, { DeviceProps } from './DeviceCard';
import { useLocale } from '@/context/LocaleContext';

interface DeviceGridProps {
  devices: DeviceProps[];
  title?: string;
  emptyMessage?: string;
}

const DeviceGrid: React.FC<DeviceGridProps> = ({ 
  devices, 
  title, 
  emptyMessage = "No devices found" 
}) => {
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      {title && <h2 className="text-xl font-semibold">{title}</h2>}
      
      {devices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
          {devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center p-8 bg-secondary/30 rounded-lg">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default DeviceGrid;
