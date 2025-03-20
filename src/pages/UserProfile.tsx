
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '@/context/LocaleContext';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Mail, Phone, Home, MapPin } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLocale();
  
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (123) 456-7890',
    address: '123 Smart Home Ave, Tech City, CA 94043',
  });
  
  const handleSave = () => {
    toast({
      title: "Profile Saved",
      description: "Your profile has been updated successfully.",
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-muted-foreground">{userData.email}</p>
              </div>
            </div>
            
            <Button size="sm">Change Photo</Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                    <div className="px-3 py-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input 
                      id="name" 
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                      className="border-0 focus-visible:ring-0"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                    <div className="px-3 py-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input 
                      id="email" 
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      className="border-0 focus-visible:ring-0"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                    <div className="px-3 py-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input 
                      id="phone" 
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      className="border-0 focus-visible:ring-0"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                    <div className="px-3 py-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input 
                      id="address" 
                      value={userData.address}
                      onChange={(e) => setUserData({...userData, address: e.target.value})}
                      className="border-0 focus-visible:ring-0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
