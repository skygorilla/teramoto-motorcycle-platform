import { CompactLayout } from '@/components/layout/CompactLayout';
import { CompactCard, CompactGrid } from '@/components/ui/compact-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function CompactDemoPage() {
  const header = (
    <div className="flex items-center justify-between py-4">
      <h1 className="text-xl font-semibold">Compact Layout Demo</h1>
      <div className="flex items-center gap-2">
        <Badge>Live</Badge>
        <Button size="sm">Action</Button>
      </div>
    </div>
  );

  const sidebar = (
    <div className="space-y-4">
      <CompactCard padding="sm">
        <h3 className="font-medium mb-2">Navigation</h3>
        <div className="space-y-1">
          <Button variant="ghost" size="sm" className="w-full justify-start">Dashboard</Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">Analytics</Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">Settings</Button>
        </div>
      </CompactCard>
    </div>
  );

  return (
    <CompactLayout header={header} sidebar={sidebar} maxWidth="xl">
      <div className="space-y-6">
        <CompactCard>
          <h2 className="text-lg font-semibold mb-4">Clean, Compact Layout</h2>
          <p className="text-muted-foreground mb-4">
            Optimized for full-width viewports with centered, readable content.
          </p>
          
          <div className="flex gap-2 mb-6">
            <Input placeholder="Search..." className="max-w-xs" />
            <Button>Search</Button>
          </div>
        </CompactCard>

        <CompactGrid cols={3} gap="md">
          <CompactCard padding="sm">
            <h3 className="font-medium">Metric 1</h3>
            <p className="text-2xl font-bold mt-1">42</p>
            <p className="text-xs text-muted-foreground">+12% growth</p>
          </CompactCard>
          
          <CompactCard padding="sm">
            <h3 className="font-medium">Metric 2</h3>
            <p className="text-2xl font-bold mt-1">128</p>
            <p className="text-xs text-muted-foreground">+5% growth</p>
          </CompactCard>
          
          <CompactCard padding="sm">
            <h3 className="font-medium">Metric 3</h3>
            <p className="text-2xl font-bold mt-1">89%</p>
            <p className="text-xs text-muted-foreground">High efficiency</p>
          </CompactCard>
        </CompactGrid>
      </div>
    </CompactLayout>
  );
}