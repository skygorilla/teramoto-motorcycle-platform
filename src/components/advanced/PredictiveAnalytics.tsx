"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, Zap } from 'lucide-react';

export function PredictiveAnalytics() {
  const predictions = [
    {
      metric: 'Service Demand',
      current: 85,
      predicted: 120,
      change: '+41%',
      confidence: 94,
      timeframe: 'Next 7 days'
    },
    {
      metric: 'Revenue Growth',
      current: 15000,
      predicted: 18500,
      change: '+23%',
      confidence: 89,
      timeframe: 'This month'
    },
    {
      metric: 'Customer Retention',
      current: 78,
      predicted: 85,
      change: '+9%',
      confidence: 92,
      timeframe: 'Next quarter'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-500" />
          Predictive Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {predictions.map((pred, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{pred.metric}</h3>
              <Badge className="bg-blue-500 text-white">
                <Target className="h-3 w-3 mr-1" />
                {pred.change}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Current</p>
                <p className="font-semibold">{pred.current.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Predicted</p>
                <p className="font-semibold text-blue-600">{pred.predicted.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Confidence Level</span>
                <span>{pred.confidence}%</span>
              </div>
              <Progress value={pred.confidence} className="h-2" />
            </div>

            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Zap className="h-3 w-3" />
              {pred.timeframe}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}