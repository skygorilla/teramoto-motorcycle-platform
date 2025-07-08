"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CompactLayout } from '@/components/layout/CompactLayout';
import { CompactCard, CompactGrid } from '@/components/ui/compact-card';
import { 
  Calendar, 
  Package, 
  Wrench, 
  Star, 
  TrendingUp, 
  Award,
  Bell,
  CreditCard,
  Settings,
  Bike
} from 'lucide-react';
import { UserProfile, ServiceBooking } from '@/types/enhanced';
export function UserDashboard() {
  // const { user } = useAuth(); // Removed auth dependency
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loyaltyProgress, setLoyaltyProgress] = useState(0);

  useEffect(() => {
    const mockProfile: UserProfile = {
      id: '1',
      email: 'user@example.com',
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      motorcycles: [
        {
          make: 'Honda',
          model: 'CBR600RR',
          year: 2020,
          engine: '599cc',
          mileage: 15000,
          lastService: new Date('2024-01-15'),
        }
      ],
      loyaltyPoints: 2450,
      membershipTier: 'gold',
      preferences: {
        notifications: {
          email: true,
          sms: true,
          push: true,
          serviceReminders: true,
          promotions: true,
        },
        language: 'en',
        currency: 'USD',
      },
    };
    setUserProfile(mockProfile);
    setLoyaltyProgress(75);
  }, [user]);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-500';
      case 'gold': return 'bg-yellow-500';
      case 'silver': return 'bg-gray-400';
      case 'bronze': return 'bg-orange-600';
      default: return 'bg-gray-500';
    }
  };

  if (!userProfile) return <div>Loading...</div>;

  return (
    <CompactLayout maxWidth="xl" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userProfile.name}!</h1>
          <p className="text-muted-foreground">Manage your motorcycles and services</p>
        </div>
        <Badge className={`${getTierColor(userProfile.membershipTier)} text-white`}>
          <Award className="h-3 w-3 mr-1" />
          {userProfile.membershipTier.toUpperCase()}
        </Badge>
      </div>

      <CompactGrid cols={4} gap="md">
        <CompactCard padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Loyalty Points</p>
              <p className="text-2xl font-bold">{userProfile.loyaltyPoints}</p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </CompactCard>

        <CompactCard padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Motorcycles</p>
              <p className="text-2xl font-bold">{userProfile.motorcycles.length}</p>
            </div>
            <Bike className="h-8 w-8 text-blue-500" />
          </div>
        </CompactCard>

        <CompactCard padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Services This Year</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <Wrench className="h-8 w-8 text-green-500" />
          </div>
        </CompactCard>

        <CompactCard padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Saved</p>
              <p className="text-2xl font-bold">$340</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </CompactCard>
      </CompactGrid>

      <Tabs defaultValue="motorcycles" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="motorcycles">My Motorcycles</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="motorcycles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProfile.motorcycles.map((motorcycle, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{motorcycle.year} {motorcycle.make} {motorcycle.model}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Engine</p>
                      <p className="font-medium">{motorcycle.engine}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Mileage</p>
                      <p className="font-medium">{motorcycle.mileage.toLocaleString()} km</p>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Loyalty Program Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium">Current Tier: {userProfile.membershipTier.toUpperCase()}</p>
                  <p className="text-sm text-muted-foreground">{loyaltyProgress}% to Platinum tier</p>
                </div>
                <Badge className={`${getTierColor(userProfile.membershipTier)} text-white`}>
                  <Award className="h-4 w-4 mr-1" />
                  {userProfile.membershipTier.toUpperCase()}
                </Badge>
              </div>
              <Progress value={loyaltyProgress} className="h-3" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Language</span>
                <Badge variant="outline">{userProfile.preferences.language.toUpperCase()}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Currency</span>
                <Badge variant="outline">{userProfile.preferences.currency}</Badge>
              </div>
              <Button className="w-full mt-4">
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Payment Methods
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </CompactLayout>
  );
}