import { Defect } from '@/types';
import { cn } from '@/lib/utils';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface RecentDefectsProps {
  defects: Defect[];
}

const severityConfig = {
  Critical: { icon: AlertTriangle, class: 'status-critical' },
  High: { icon: AlertCircle, class: 'status-high' },
  Medium: { icon: Info, class: 'status-medium' },
  Low: { icon: Info, class: 'status-low' },
};

export function RecentDefects({ defects }: RecentDefectsProps) {
  const recentDefects = defects.slice(0, 5);

  return (
    <div className="rounded-xl border border-border bg-card p-6 card-glow">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Defects</h3>
        <p className="text-sm text-muted-foreground">Latest detected issues</p>
      </div>

      <div className="space-y-4">
        {recentDefects.map((defect) => {
          const config = severityConfig[defect.severity];
          const Icon = config.icon;
          
          return (
            <div
              key={defect.id}
              className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4 transition-all hover:bg-muted/50"
            >
              <div className={cn('rounded-lg border p-2', config.class)}>
                <Icon className="h-4 w-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {defect.defectType}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {new Date(defect.timestamp).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-mono font-medium text-accent">
                  {(defect.confidence * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">confidence</p>
              </div>
            </div>
          );
        })}
      </div>

      {recentDefects.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No recent defects detected</p>
        </div>
      )}
    </div>
  );
}
