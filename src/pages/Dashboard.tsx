
import React, { useState, useEffect } from 'react';
import { useLocale } from '@/context/LocaleContext';
import Header from '@/components/Header';
import DeviceGrid from '@/components/DeviceGrid';
import EnergyChart from '@/components/EnergyChart';
import QuickActions from '@/components/QuickActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DeviceProps } from '@/components/DeviceCard';

// Mock data for devices
const mockDevices: DeviceProps[] = [
  {
    id: '1',
    name: 'Living Room Light',
    type: 'light',
    status: 'online',
    isOn: true,
    room: 'livingRoom',
    data: {
      brightness: 80,
    },
  },
  {
    id: '2',
    name: 'Kitchen Light',
    type: 'light',
    status: 'online',
    isOn: false,
    room: 'kitchen',
    data: {
      brightness: 60,
    },
  },
  {
    id: '3',
    name: 'Bedroom Thermostat',
    type: 'thermostat',
    status: 'online',
    isOn: true,
    room: 'bedroom',
    data: {
      temperature: 22,
    },
  },
  {
    id: '4',
    name: 'Front Door Camera',
    type: 'camera',
    status: 'online',
    isOn: true,
    room: 'livingRoom',
  },
  {
    id: '5',
    name: 'Kitchen Speaker',
    type: 'speaker',
    status: 'offline',
    isOn: false,
    room: 'kitchen',
    data: {
      volume: 55,
    },
  },
  {
    id: '6',
    name: 'Office Outlet',
    type: 'outlet',
    status: 'online',
    isOn: true,
    room: 'office',
  },
  {
    id: '7',
    name: 'Front Door Lock',
    type: 'lock',
    status: 'online',
    isOn: true,
    room: 'livingRoom',
  },
  {
    id: '8',
    name: 'Bathroom Light',
    type: 'light',
    status: 'online',
    isOn: false,
    room: 'bathroom',
    data: {
      brightness: 70,
    },
  },
];

// Group devices by room
const devicesByRoom: Record<string, DeviceProps[]> = mockDevices.reduce((acc, device) => {
  if (!acc[device.room]) {
    acc[device.room] = [];
  }
  acc[device.room].push(device);
  return acc;
}, {} as Record<string, DeviceProps[]>);

// Get favorite devices (mock implementation)
const favoriteDevices = mockDevices.filter((_, index) => index % 3 === 0);

const Dashboard: React.FC = () => {
  const { t } = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-muted-foreground">{t('app.title')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pb-20">
        <div className="space-y-8">
          {/* Energy usage chart */}
          <section>
            <EnergyChart />
          </section>
          
          {/* Quick actions */}
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('dashboard.quickActions')}</h2>
            <QuickActions />
          </section>
          
          {/* Device tabs */}
          <section>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full sm:w-auto grid grid-cols-3 gap-1">
                <TabsTrigger value="all">{t('dashboard.allDevices')}</TabsTrigger>
                <TabsTrigger value="rooms">{t('dashboard.rooms')}</TabsTrigger>
                <TabsTrigger value="favorites">{t('dashboard.favorites')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6 animate-fade-in">
                <DeviceGrid devices={mockDevices} />
              </TabsContent>
              
              <TabsContent value="rooms" className="mt-6 animate-fade-in">
                <div className="space-y-10">
                  {Object.entries(devicesByRoom).map(([room, devices]) => (
                    <DeviceGrid 
                      key={room} 
                      devices={devices} 
                      title={t(`room.${room}`)}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="favorites" className="mt-6 animate-fade-in">
                <DeviceGrid 
                  devices={favoriteDevices} 
                  emptyMessage="You haven't added any favorites yet."
                />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
