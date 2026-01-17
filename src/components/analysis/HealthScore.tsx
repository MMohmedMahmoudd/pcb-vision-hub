import { cn } from '@/lib/utils';

interface HealthScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function HealthScore({ score, size = 'md', showLabel = true }: HealthScoreProps) {
  const sizeConfig = {
    sm: { dimension: 80, stroke: 6, fontSize: 'text-lg' },
    md: { dimension: 140, stroke: 10, fontSize: 'text-3xl' },
    lg: { dimension: 200, stroke: 14, fontSize: 'text-5xl' },
  };

  const config = sizeConfig[size];
  const radius = (config.dimension - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - score) / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return 'text-primary stroke-primary';
    if (score >= 60) return 'text-warning stroke-warning';
    return 'text-destructive stroke-destructive';
  };

  const getGlow = () => {
    if (score >= 80) return 'drop-shadow-[0_0_20px_hsl(142,60%,45%,0.5)]';
    if (score >= 60) return 'drop-shadow-[0_0_20px_hsl(38,90%,50%,0.5)]';
    return 'drop-shadow-[0_0_20px_hsl(0,70%,50%,0.5)]';
  };

  return (
    <div className="flex flex-col items-center">
      <div className={cn('relative', getGlow())}>
        <svg
          width={config.dimension}
          height={config.dimension}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={config.dimension / 2}
            cy={config.dimension / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={config.stroke}
          />
          {/* Progress circle */}
          <circle
            cx={config.dimension / 2}
            cy={config.dimension / 2}
            r={radius}
            fill="none"
            className={getColor()}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-bold font-mono', config.fontSize, getColor())}>
            {score}%
          </span>
          {showLabel && size !== 'sm' && (
            <span className="text-xs text-muted-foreground mt-1">Health Score</span>
          )}
        </div>
      </div>
      
      {showLabel && size === 'sm' && (
        <span className="text-xs text-muted-foreground mt-2">Health</span>
      )}
    </div>
  );
}
