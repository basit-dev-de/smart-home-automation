
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, Moon, Sun, Globe, Bell, Shield, User, 
  Home, Wifi, PersonStanding, Lock, Key, UserCog
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLocale();
  const { theme, toggleTheme } = useTheme();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pb-20">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('dashboard.title')}
        </Button>
        
        <div className="glass-panel p-6 mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold mb-6">{t('settings.title')}</h1>
          
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="appearance">
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? 
                    <Moon className="h-4 w-4" /> : 
                    <Sun className="h-4 w-4" />
                  }
                  <span className="hidden md:inline">Appearance</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden md:inline">Privacy</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden md:inline">Notifications</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="account">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">Account</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how HomeIQ looks on your devices.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        Toggle between light and dark mode.
                      </p>
                    </div>
                    <Switch 
                      checked={theme === 'dark'} 
                      onCheckedChange={toggleTheme} 
                    />
                  </div>
                  
                  <Button onClick={handleSave} className="w-full md:w-auto">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Configure how you want to be notified about device activities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications for important events.
                      </p>
                    </div>
                    <Switch 
                      checked={notificationsEnabled} 
                      onCheckedChange={setNotificationsEnabled} 
                    />
                  </div>
                  
                  <Button onClick={handleSave} className="w-full md:w-auto">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>
                    Manage your privacy and security settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Location Services</h4>
                      <p className="text-sm text-muted-foreground">
                        Allow the app to use your location for geofencing.
                      </p>
                    </div>
                    <Switch 
                      checked={locationEnabled} 
                      onCheckedChange={setLocationEnabled} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Auto-lock Devices</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically lock doors when you leave home.
                      </p>
                    </div>
                    <Switch 
                      checked={autoLockEnabled} 
                      onCheckedChange={setAutoLockEnabled} 
                    />
                  </div>
                  
                  <Button onClick={handleSave} className="w-full md:w-auto">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account information and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center gap-2 justify-start h-auto py-3">
                      <UserCog className="h-4 w-4" />
                      <div className="text-left">
                        <h4 className="font-medium">Profile Settings</h4>
                        <p className="text-xs text-muted-foreground">
                          Update your personal information
                        </p>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="flex items-center gap-2 justify-start h-auto py-3">
                      <Key className="h-4 w-4" />
                      <div className="text-left">
                        <h4 className="font-medium">Change Password</h4>
                        <p className="text-xs text-muted-foreground">
                          Update your password
                        </p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
