import { Board } from '@/types';
import { HealthScore } from './HealthScore';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Clock, 
  DollarSign, 
  Cpu, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface BoardAnalysisProps {
  board: Board;
}

const severityColors = {
  Critical: 'status-critical',
  High: 'status-high',
  Medium: 'status-medium',
  Low: 'status-low',
};

export function BoardAnalysis({ board }: BoardAnalysisProps) {
  const healthyComponents = board.components.filter(c => c.status === 'Healthy').length;
  const warningComponents = board.components.filter(c => c.status === 'Warning').length;
  const defectiveComponents = board.components.filter(c => c.status === 'Defective').length;

  return (
    <div className="space-y-6">
      {/* Header with health score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Score Card */}
        <div className="rounded-xl border border-border bg-card p-6 card-glow flex flex-col items-center justify-center">
          <HealthScore score={board.healthScore} size="lg" />
          <p className="text-muted-foreground mt-4">Overall Board Health</p>
        </div>

        {/* Component Summary */}
        <div className="rounded-xl border border-border bg-card p-6 card-glow">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            Component Status
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Healthy</span>
              </div>
              <span className="font-mono font-medium text-primary">{healthyComponents}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm text-muted-foreground">Warning</span>
              </div>
              <span className="font-mono font-medium text-warning">{warningComponents}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm text-muted-foreground">Defective</span>
              </div>
              <span className="font-mono font-medium text-destructive">{defectiveComponents}</span>
            </div>

            <div className="border-t border-border pt-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Total Components</span>
                <span className="font-mono font-bold text-accent">{board.totalComponents}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Repair Estimates */}
        <div className="rounded-xl border border-border bg-card p-6 card-glow">
          <h3 className="font-semibold text-foreground mb-4">Repair Estimates</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Estimated Time</span>
              </div>
              <p className="text-3xl font-bold font-mono text-foreground">
                {board.estimatedRepairTime} <span className="text-lg font-normal text-muted-foreground">min</span>
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">Estimated Cost</span>
              </div>
              <p className="text-3xl font-bold font-mono text-foreground">
                ${board.estimatedCost}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disruption Analysis */}
      <div className="rounded-xl border border-border bg-card overflow-hidden card-glow">
        <div className="border-b border-border bg-muted/30 px-6 py-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Disruption Analysis
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {board.disruptions.length} issue{board.disruptions.length !== 1 ? 's' : ''} requiring attention
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Defect Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Impact
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Repair Time
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {board.disruptions.map((disruption) => (
                <tr key={disruption.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {disruption.defectType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline" className={cn('border', severityColors[disruption.severity])}>
                      {disruption.severity}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-muted-foreground">
                    {disruption.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                    {disruption.impact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-foreground text-right">
                    {disruption.repairTime} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-accent text-right">
                    ${disruption.cost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
