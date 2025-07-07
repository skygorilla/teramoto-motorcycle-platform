"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Users, DollarSign, Clock } from 'lucide-react';

export function RealtimeMetrics() {
  const [metrics, setMetrics] = useState({
    activeUsers: 0,
    revenue: 0,
    bookings: 0,
    avgResponse: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        activeUsers: Math.floor(Math.random() * 50) + 120,
        revenue: Math.floor(Math.random() * 1000) + 15000,
        bookings: Math.floor(Math.random() * 10) + 45,
        avgResponse: Math.floor(Math.random() * 500) + 800
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold">{metrics.activeUsers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
          <Badge className="mt-2 bg-green-500 text-white">
            <Activity className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Revenue Today</p>
              <p className="text-2xl font-bold">${metrics.revenue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-xs text-green-600 mt-2">+12% vs yesterday</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Bookings</p>
              <p className="text-2xl font-bold">{metrics.bookings}</p>
            </div>
            <Clock className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-xs text-purple-600 mt-2">3 pending approval</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Response</p>
              <p className="text-2xl font-bold">{metrics.avgResponse}ms</p>
            </div>
            <Activity className="h-8 w-8 text-orange-500" />
          </div>
          <p className="text-xs text-green-600 mt-2">Excellent</p>
        </CardContent>
      </Card>
    </div>
  );
}