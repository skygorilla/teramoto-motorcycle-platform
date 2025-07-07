"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

export function AIInsights() {
  const [insights] = useState([
    {
      id: '1',
      type: 'opportunity',
      title: 'Peak Service Demand Predicted',
      description: 'AI forecasts 40% increase in brake service requests next week.',
      confidence: 94,
      impact: 'high'
    },
    {
      id: '2',
      type: 'warning', 
      title: 'Customer Churn Risk Detected',
      description: '3 high-value customers showing early churn signals.',
      confidence: 87,
      impact: 'high'
    },
    {
      id: '3',
      type: 'success',
      title: 'Revenue Optimization Success',
      description: 'Dynamic pricing increased profit margins by 23%.',
      confidence: 100,
      impact: 'medium'
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <Zap className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-purple-500" />
          AI Business Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              {getIcon(insight.type)}
              <h3 className="font-medium">{insight.title}</h3>
              <Badge variant={insight.impact === 'high' ? 'destructive' : 'secondary'}>
                {insight.impact}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{insight.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs">Confidence:</span>
              <Progress value={insight.confidence} className="flex-1 h-2" />
              <span className="text-xs font-medium">{insight.confidence}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}