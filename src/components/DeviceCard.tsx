
import React, { useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { useNavigate } from 'react-router-dom';
import { 
  Lightbulb, Thermometer, Camera, Speaker, Power, Lock, 
  ChevronsUpDown, MoreHorizontal, AlertTriangle 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export interface DeviceProps {
  id: string;
  name: string;
  type: 'light' | 'thermostat' | 'camera' | 'speaker' | 'outlet' | 'lock';
  status: 'online' | 'offline';
  isOn: boolean;
  room: string;
  data?: {
    brightness?: number;
    temperature?: number;
    color?: string;
    batteryLevel?: number;
    volume?: number;
  };
}

const DeviceCard: React.FC<{ device: DeviceProps }> = ({ device }) => {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(device.isOn);
  const [isHovered, setIsHovered] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const getDeviceIcon = () => {
    const iconProps = { className: "h-6 w-6" };
    
    switch (device.type) {
      case 'light':
        return <Lightbulb {...iconProps} />;
      case 'thermostat':
        return <Thermometer {...iconProps} />;
      case 'camera':
        return <Camera {...iconProps} />;
      case 'speaker':
        return <Speaker {...iconProps} />;
      case 'outlet':
        return <Power {...iconProps} />;
      case 'lock':
        return <Lock {...iconProps} />;
      default:
        return <AlertTriangle {...iconProps} />;
    }
  };

  const toggleDevice = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (device.status === 'offline') {
      toast({
        title: t("device.status.offlineTitle"),
        description: t("device.status.offlineDescription", { name: device.name }),
        variant: "destructive",
      });
      return;
    }
    
    setIsOn(!isOn);
    
    toast({
      title: isOn ? t("device.action.turningOff", { name: device.name }) : t("device.action.turningOn", { name: device.name }),
      description: t(isOn ? "device.action.poweringDown" : "device.action.poweringUp"),
    });
  };

  const handleCardClick = () => {
    navigate(`/device/${device.id}`);
  };

  const handleExpandControls = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowControls(!showControls);
  };

  return (
    <div 
      className={`device-card card-hover-effect ${isOn ? 'device-card-active' : ''} ${
        showControls ? 'z-10' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`device-icon-container ${
              isOn 
                ? 'bg-primary/10 text-primary' 
                : 'bg-secondary text-muted-foreground'
            }`}
          >
            {getDeviceIcon()}
          </div>
          
          <div>
            <h3 className="font-medium text-card-foreground">{device.name}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className={`device-status-indicator ${
                device.status === 'online' ? 'device-status-online' : 'device-status-offline'
              }`}></div>
              <span>{t(`device.status.${device.status}`)}</span>
              <span className="px-1">•</span>
              <span>{t(`room.${device.room}`)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            className={`p-1.5 rounded-full transition-colors duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              // Open device options
            }}
          >
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </button>
          
          <button 
            className={`p-1.5 rounded-full transition-colors duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleExpandControls}
          >
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
      
      {/* Device-specific controls */}
      <div className={`mt-4 transition-all duration-300 overflow-hidden ${
        showControls ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        {device.type === 'light' && (
          <div className="space-y-2">
            <label htmlFor={`brightness-${device.id}`} className="text-xs font-medium flex justify-between">
              <span>{t('device.control.brightness')}</span>
              <span>{device.data?.brightness || 0}%</span>
            </label>
            <input 
              id={`brightness-${device.id}`}
              type="range" 
              min="0" 
              max="100" 
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer" 
              value={device.data?.brightness || 0}
              onChange={(e) => e.stopPropagation()}
            />
          </div>
        )}
        
        {device.type === 'thermostat' && (
          <div className="space-y-2">
            <label htmlFor={`temperature-${device.id}`} className="text-xs font-medium flex justify-between">
              <span>{t('device.control.temperature')}</span>
              <span>{device.data?.temperature || 21}°C</span>
            </label>
            <input 
              id={`temperature-${device.id}`}
              type="range" 
              min="16" 
              max="30" 
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer" 
              value={device.data?.temperature || 21}
              onChange={(e) => e.stopPropagation()}
            />
          </div>
        )}
        
        {device.type === 'speaker' && (
          <div className="space-y-2">
            <label htmlFor={`volume-${device.id}`} className="text-xs font-medium flex justify-between">
              <span>{t('device.control.volume')}</span>
              <span>{device.data?.volume || 0}%</span>
            </label>
            <input 
              id={`volume-${device.id}`}
              type="range" 
              min="0" 
              max="100" 
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer" 
              value={device.data?.volume || 0}
              onChange={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
      
      {/* Power toggle button */}
      <button
        className={`mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors duration-200 ${
          isOn
            ? 'bg-primary/10 text-primary hover:bg-primary/20'
            : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
        }`}
        onClick={toggleDevice}
      >
        <Power className="h-4 w-4" />
        <span>{isOn ? t('device.control.turnOff') : t('device.control.turnOn')}</span>
      </button>
    </div>
  );
};

export default DeviceCard;
