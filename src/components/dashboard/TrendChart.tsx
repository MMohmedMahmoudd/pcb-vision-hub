import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendData } from '@/types';

interface TrendChartProps {
  data: TrendData[];
}

export function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 card-glow">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Detection Trends</h3>
        <p className="text-sm text-muted-foreground">Defects and scans over the last 30 days</p>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="defectsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 70%, 50%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(0, 70%, 50%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="scansGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 60%, 45%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(142, 60%, 45%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(220, 10%, 55%)"
              tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 12 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              stroke="hsl(220, 10%, 55%)"
              tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(220, 18%, 12%)',
                border: '1px solid hsl(220, 15%, 18%)',
                borderRadius: '8px',
                color: 'hsl(160, 30%, 90%)'
              }}
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Area 
              type="monotone" 
              dataKey="scans" 
              stroke="hsl(142, 60%, 45%)" 
              strokeWidth={2}
              fill="url(#scansGradient)"
              name="Scans"
            />
            <Area 
              type="monotone" 
              dataKey="defects" 
              stroke="hsl(0, 70%, 50%)" 
              strokeWidth={2}
              fill="url(#defectsGradient)"
              name="Defects"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Scans</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-destructive" />
          <span className="text-sm text-muted-foreground">Defects</span>
        </div>
      </div>
    </div>
  );
}
