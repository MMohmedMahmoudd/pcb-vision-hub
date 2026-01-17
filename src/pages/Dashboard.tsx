import { PageLayout } from '@/components/layout/PageLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { ComponentHealthChart } from '@/components/dashboard/ComponentHealthChart';
import { RecentDefects } from '@/components/dashboard/RecentDefects';
import { 
  mockDashboardStats, 
  mockTrendData, 
  mockComponentHealth, 
  mockDefects 
} from '@/services/mockData';
import { ScanLine, AlertTriangle, Activity, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = mockDashboardStats;

  return (
    <PageLayout 
      title="Dashboard" 
      subtitle="PCB Defect Detection System Overview"
    >
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard
          title="Total Scans"
          value={stats.totalScans.toLocaleString()}
          subtitle={`${stats.scansToday} today`}
          icon={<ScanLine className="h-6 w-6" />}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Defects Detected"
          value={stats.totalDefects.toLocaleString()}
          subtitle={`${stats.defectsToday} today`}
          icon={<AlertTriangle className="h-6 w-6" />}
          variant="destructive"
          trend={{ value: 8, isPositive: false }}
        />
        <MetricCard
          title="Avg Health Score"
          value={`${stats.avgHealthScore.toFixed(1)}%`}
          subtitle="Across all boards"
          icon={<Activity className="h-6 w-6" />}
          variant="primary"
          trend={{ value: 3, isPositive: true }}
        />
        <MetricCard
          title="Defect Rate"
          value={`${(stats.defectRate * 100).toFixed(1)}%`}
          subtitle="Defects per scan"
          icon={<TrendingUp className="h-6 w-6" />}
          variant="warning"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <TrendChart data={mockTrendData} />
        </div>
        <ComponentHealthChart data={mockComponentHealth} />
      </div>

      {/* Recent Defects */}
      <RecentDefects defects={mockDefects} />
    </PageLayout>
  );
}
