"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export function SmartNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'urgent',
      title: 'High-Value Customer Alert',
      message: 'Premium customer John Doe has been waiting 15+ minutes',
      time: '2 min ago',
      actionable: true
    },
    {
      id: '2', 
      type: 'opportunity',
      title: 'Upsell Opportunity',
      message: 'Customer booking oil change - suggest brake inspection (87% acceptance rate)',
      time: '5 min ago',
      actionable: true
    },
    {
      id: '3',
      type: 'info',
      title: 'Inventory Alert',
      message: 'Brake pads running low - 3 units remaining',
      time: '1 hour ago',
      actionable: false
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'opportunity': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Smart Notifications
          <Badge className="bg-red-500 text-white">{notifications.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start gap-3 p-3 border rounded-lg">
            {getIcon(notification.type)}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => dismissNotification(notification.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">{notification.message}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{notification.time}</span>
                {notification.actionable && (
                  <Button size="sm" className="h-6 text-xs">Take Action</Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}