import { Defect } from '@/types';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertTriangle, XCircle, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DetectionResultsProps {
  defects: Defect[];
  isProcessing?: boolean;
}

const severityColors = {
  Critical: 'bg-destructive/20 text-destructive border-destructive/30',
  High: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Low: 'bg-primary/20 text-primary border-primary/30',
};

export function DetectionResults({ defects, isProcessing }: DetectionResultsProps) {
  if (isProcessing) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <div>
            <p className="font-medium text-foreground">Processing Image...</p>
            <p className="text-sm text-muted-foreground">Running defect detection algorithms</p>
          </div>
        </div>
      </div>
    );
  }

  if (defects.length === 0) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
            <CheckCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">No Defects Detected</p>
            <p className="text-sm text-muted-foreground">The PCB appears to be in good condition</p>
          </div>
        </div>
      </div>
    );
  }

  const criticalCount = defects.filter(d => d.severity === 'Critical').length;
  const highCount = defects.filter(d => d.severity === 'High').length;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className={cn(
        'rounded-xl border p-6',
        criticalCount > 0 
          ? 'border-destructive/30 bg-destructive/5' 
          : highCount > 0 
            ? 'border-orange-500/30 bg-orange-500/5'
            : 'border-yellow-500/30 bg-yellow-500/5'
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full',
              criticalCount > 0 ? 'bg-destructive/20' : 'bg-warning/20'
            )}>
              {criticalCount > 0 ? (
                <XCircle className="h-6 w-6 text-destructive" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-warning" />
              )}
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">
                {defects.length} Defect{defects.length !== 1 ? 's' : ''} Found
              </p>
              <p className="text-sm text-muted-foreground">
                {criticalCount} critical, {highCount} high severity
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="outline" className={severityColors.Critical}>
              {criticalCount} Critical
            </Badge>
            <Badge variant="outline" className={severityColors.High}>
              {highCount} High
            </Badge>
          </div>
        </div>
      </div>

      {/* Defect list */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border bg-muted/30 px-4 py-3">
          <h3 className="font-medium text-foreground">Detected Issues</h3>
        </div>
        
        <div className="divide-y divide-border">
          {defects.map((defect, index) => (
            <div 
              key={defect.id}
              className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-mono text-sm font-medium text-muted-foreground">
                {index + 1}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{defect.defectType}</p>
                  <Badge variant="outline" className={severityColors[defect.severity]}>
                    {defect.severity}
                  </Badge>
                </div>
                {defect.location && (
                  <p className="text-xs text-muted-foreground font-mono mt-1">
                    Location: ({defect.location.x}, {defect.location.y}) — {defect.location.width}×{defect.location.height}px
                  </p>
                )}
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-accent">
                  <Zap className="h-4 w-4" />
                  <span className="font-mono font-medium">
                    {(defect.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">confidence</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
