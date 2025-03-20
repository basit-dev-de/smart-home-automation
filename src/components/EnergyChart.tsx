
import React, { useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';

// Mock data for the energy usage chart
const energyData = {
  today: [
    { time: '00:00', usage: 0.8 },
    { time: '03:00', usage: 0.5 },
    { time: '06:00', usage: 0.9 },
    { time: '09:00', usage: 1.8 },
    { time: '12:00', usage: 2.3 },
    { time: '15:00', usage: 1.9 },
    { time: '18:00', usage: 2.7 },
    { time: '21:00', usage: 2.2 },
  ],
  week: [
    { time: 'Mon', usage: 10.5 },
    { time: 'Tue', usage: 12.2 },
    { time: 'Wed', usage: 9.8 },
    { time: 'Thu', usage: 11.3 },
    { time: 'Fri', usage: 14.2 },
    { time: 'Sat', usage: 16.5 },
    { time: 'Sun', usage: 13.8 },
  ],
  month: [
    { time: 'Week 1', usage: 68 },
    { time: 'Week 2', usage: 72 },
    { time: 'Week 3', usage: 65 },
    { time: 'Week 4', usage: 70 },
  ],
};

const getTotal = (data: { time: string; usage: number }[]): number => {
  return data.reduce((sum, entry) => sum + entry.usage, 0);
};

const EnergyChart: React.FC = () => {
  const { t } = useLocale();
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');
  
  const primaryColor = theme === 'dark' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(37, 99, 235, 0.8)';
  const secondaryColor = theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.2)';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  
  return (
    <Card className="glass-panel overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>{t('dashboard.energy.title')}</CardTitle>
        <div className="mt-2">
          <Tabs defaultValue="today" className="w-full" onValueChange={(value) => setTimeRange(value as any)}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="today">{t('dashboard.energy.today')}</TabsTrigger>
              <TabsTrigger value="week">{t('dashboard.energy.week')}</TabsTrigger>
              <TabsTrigger value="month">{t('dashboard.energy.month')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-64 w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={energyData[timeRange]}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              className="animate-fade-in"
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="time" 
                stroke={theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'} 
              />
              <YAxis 
                stroke={theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'} 
                tickFormatter={(value) => `${value} ${t('dashboard.energy.units')}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                  borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
                  color: theme === 'dark' ? '#ffffff' : '#000000',
                }} 
                formatter={(value: number) => [`${value} ${t('dashboard.energy.units')}`, t('dashboard.energy.title')]}
              />
              <defs>
                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={secondaryColor} stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="usage" 
                stroke={primaryColor}
                strokeWidth={2}
                fill="url(#colorUsage)" 
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {t('dashboard.energy.title')}
          </div>
          <div className="text-lg font-semibold">
            {getTotal(energyData[timeRange]).toFixed(1)} {t('dashboard.energy.units')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyChart;
