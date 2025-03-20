
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocale } from '@/context/LocaleContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, Power, Settings, Info, History, Clock, 
  Calendar, Lightbulb, Thermometer, Camera, Speaker, Lock,
  AlertTriangle, RefreshCw, BarChart3, Plus
} from 'lucide-react';
import { DeviceProps } from '@/components/DeviceCard';

// Mock data for device details (would normally come from an API)
const mockDevices: Record<string, DeviceProps & { 
  details?: { 
    manufacturer: string;
    model: string;
    firmwareVersion: string;
    ipAddress: string;
    macAddress: string;
    lastUpdated: string;
  };
  history?: Array<{
    timestamp: string;
    action: string;
    user?: string;
  }>;
}> = {
  '1': {
    id: '1',
    name: 'Living Room Light',
    type: 'light',
    status: 'online',
    isOn: true,
    room: 'livingRoom',
    data: {
      brightness: 80,
      color: '#FFFFFF',
    },
    details: {
      manufacturer: 'Philips',
      model: 'Hue White A19',
      firmwareVersion: '1.0.5',
      ipAddress: '192.168.1.101',
      macAddress: 'A1:B2:C3:D4:E5:F6',
      lastUpdated: '2023-08-15T14:30:00Z',
    },
    history: [
      { timestamp: '2023-08-15T14:30:00Z', action: 'Turned On', user: 'John' },
      { timestamp: '2023-08-15T08:15:00Z', action: 'Turned Off', user: 'John' },
      { timestamp: '2023-08-14T22:45:00Z', action: 'Brightness set to 60%', user: 'Alice' },
      { timestamp: '2023-08-14T18:30:00Z', action: 'Turned On', user: 'Alice' },
    ],
  },
  // More devices would be here
};

const DeviceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLocale();
  const navigate = useNavigate();
  const [device, setDevice] = useState<(typeof mockDevices)[string] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState(0);
  const [temperature, setTemperature] = useState(21);
  const [volume, setVolume] = useState(0);
  
  useEffect(() => {
    if (id && mockDevices[id]) {
      setDevice(mockDevices[id]);
      setIsOn(mockDevices[id].isOn);
      
      if (mockDevices[id].data?.brightness) {
        setBrightness(mockDevices[id].data.brightness);
      }
      
      if (mockDevices[id].data?.temperature) {
        setTemperature(mockDevices[id].data.temperature);
      }
      
      if (mockDevices[id].data?.volume) {
        setVolume(mockDevices[id].data.volume);
      }
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);

  const getDeviceIcon = () => {
    const iconProps = { className: "h-6 w-6" };
    
    if (!device) return <AlertTriangle {...iconProps} />;
    
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

  const toggleDevice = () => {
    if (!device || device.status === 'offline') {
      toast({
        title: "Device Offline",
        description: "This device is currently offline and cannot be controlled.",
        variant: "destructive",
      });
      return;
    }
    
    setIsOn(!isOn);
    
    toast({
      title: isOn ? `Turning Off ${device.name}` : `Turning On ${device.name}`,
      description: `Your device is ${isOn ? 'powering down' : 'powering up'}...`,
    });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Device Refreshed",
        description: "Latest device status has been retrieved.",
      });
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('dashboard.title')}
          </Button>
          
          <Card className="glass-panel p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Device Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The device you're looking for does not exist or has been removed.
            </p>
            <Button onClick={() => navigate('/')}>
              Return to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pb-20">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('dashboard.title')}
        </Button>
        
        <div className="glass-panel p-6 mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isOn 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {getDeviceIcon()}
              </div>
              
              <div>
                <h1 className="text-2xl font-bold">{device.name}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className={`device-status-indicator ${
                    device.status === 'online' ? 'device-status-online' : 'device-status-offline'
                  }`}></div>
                  <span>{t(`device.status.${device.status}`)}</span>
                  <span className="px-1">•</span>
                  <span>{t(`room.${device.room}`)}</span>
                  <span className="px-1">•</span>
                  <span>{t(`device.type.${device.type}`)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleRefresh}
                className="rounded-full"
              >
                <RefreshCw className="h-5 w-5" />
              </Button>
              
              <Button 
                variant={isOn ? "default" : "outline"}
                className="flex-1 sm:flex-none"
                onClick={toggleDevice}
              >
                <Power className="h-4 w-4 mr-2" />
                {isOn ? t('device.control.turnOff') : t('device.control.turnOn')}
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="controls" className="w-full">
            <TabsList className="w-full sm:w-auto grid grid-cols-3 gap-1">
              <TabsTrigger value="controls">
                <Settings className="h-4 w-4 mr-2" />
                Controls
              </TabsTrigger>
              <TabsTrigger value="details">
                <Info className="h-4 w-4 mr-2" />
                Details
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>
            
            {/* Controls tab */}
            <TabsContent value="controls" className="mt-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {device.type === 'light' && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">{t('device.control.brightness')}</h3>
                        <span className="font-medium">{brightness}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={brightness}
                        onChange={(e) => setBrightness(parseInt(e.target.value))}
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer" 
                      />
                      <div className="grid grid-cols-4 gap-2 mt-4">
                        {[25, 50, 75, 100].map((value) => (
                          <Button 
                            key={value} 
                            variant="outline" 
                            size="sm"
                            onClick={() => setBrightness(value)}
                          >
                            {value}%
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {device.type === 'thermostat' && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">{t('device.control.temperature')}</h3>
                        <span className="font-medium">{temperature}°C</span>
                      </div>
                      <input 
                        type="range" 
                        min="16" 
                        max="30" 
                        value={temperature}
                        onChange={(e) => setTemperature(parseInt(e.target.value))}
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer" 
                      />
                      <div className="grid grid-cols-4 gap-2 mt-4">
                        {[18, 20, 22, 24].map((value) => (
                          <Button 
                            key={value} 
                            variant="outline" 
                            size="sm"
                            onClick={() => setTemperature(value)}
                          >
                            {value}°C
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {device.type === 'speaker' && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">{t('device.control.volume')}</h3>
                        <span className="font-medium">{volume}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={volume}
                        onChange={(e) => setVolume(parseInt(e.target.value))}
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer" 
                      />
                      <div className="grid grid-cols-4 gap-2 mt-4">
                        {[0, 25, 50, 75].map((value) => (
                          <Button 
                            key={value} 
                            variant="outline" 
                            size="sm"
                            onClick={() => setVolume(value)}
                          >
                            {value}%
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {/* Schedule card for all device types */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-medium">Schedule</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Morning Routine</p>
                            <p className="text-xs text-muted-foreground">Every day at 7:00 AM</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Evening Routine</p>
                            <p className="text-xs text-muted-foreground">Weekdays at 6:00 PM</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Details tab */}
            <TabsContent value="details" className="mt-6 animate-fade-in">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">{t('device.detail.status')}</span>
                        <span className="font-medium flex items-center gap-2">
                          <div className={`device-status-indicator ${
                            device.status === 'online' ? 'device-status-online' : 'device-status-offline'
                          }`}></div>
                          {t(`device.status.${device.status}`)}
                        </span>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">{t('device.detail.room')}</span>
                        <span className="font-medium">{t(`room.${device.room}`)}</span>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">{t('device.detail.manufacturer')}</span>
                        <span className="font-medium">{device.details?.manufacturer || 'Unknown'}</span>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">{t('device.detail.model')}</span>
                        <span className="font-medium">{device.details?.model || 'Unknown'}</span>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">{t('device.detail.firmwareVersion')}</span>
                        <span className="font-medium">{device.details?.firmwareVersion || 'Unknown'}</span>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">{t('device.detail.lastUpdated')}</span>
                        <span className="font-medium">
                          {device.details?.lastUpdated 
                            ? new Date(device.details.lastUpdated).toLocaleString() 
                            : 'Unknown'
                          }
                        </span>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">{t('device.detail.ipAddress')}</span>
                        <span className="font-medium">{device.details?.ipAddress || 'Unknown'}</span>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">{t('device.detail.macAddress')}</span>
                        <span className="font-medium">{device.details?.macAddress || 'Unknown'}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        Energy Usage
                      </h3>
                      <div className="h-3 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary animate-pulse-slow rounded-full"
                          style={{ width: '65%' }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>0.2 kWh today</span>
                        <span>5.8 kWh this month</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* History tab */}
            <TabsContent value="history" className="mt-6 animate-fade-in">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {device.history ? (
                      device.history.map((entry, index) => (
                        <div 
                          key={index} 
                          className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg"
                        >
                          <div className="mt-0.5">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{entry.action}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-muted-foreground">
                                {new Date(entry.timestamp).toLocaleString()}
                              </p>
                              {entry.user && (
                                <p className="text-xs text-muted-foreground">
                                  by {entry.user}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        No history available for this device.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default DeviceDetail;
