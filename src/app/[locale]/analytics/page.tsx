import { CompactLayout } from '@/components/layout/CompactLayout';
import { AIInsights } from '@/components/advanced/AIInsights';
import { RealtimeMetrics } from '@/components/advanced/RealtimeMetrics';
import { PredictiveAnalytics } from '@/components/advanced/PredictiveAnalytics';
import { SmartNotifications } from '@/components/advanced/SmartNotifications';
import { CompactCard } from '@/components/ui/compact-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AnalyticsPage() {
  const header = (
    <div className="flex items-center justify-between py-4">
      <div>
        <h1 className="text-2xl font-bold">Business Analytics</h1>
        <p className="text-muted-foreground">AI-powered insights and predictions</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge className="bg-green-500 text-white">Live Data</Badge>
        <Button size="sm">Export Report</Button>
      </div>
    </div>
  );

  return (
    <CompactLayout header={header} maxWidth="2xl">
      <div className="space-y-8">
        <RealtimeMetrics />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AIInsights />
          <PredictiveAnalytics />
          <SmartNotifications />
        </div>

        <CompactCard>
          <h2 className="text-lg font-semibold mb-4">Performance Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <p className="text-2xl font-bold text-green-600">+127%</p>
              <p className="text-sm text-muted-foreground">Revenue Growth</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-2xl font-bold text-blue-600">94%</p>
              <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-2xl font-bold text-purple-600">2.3s</p>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
            </div>
          </div>
        </CompactCard>
      </div>
    </CompactLayout>
  );
}