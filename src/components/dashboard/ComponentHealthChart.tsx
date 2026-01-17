import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ComponentHealth } from '@/types';

interface ComponentHealthChartProps {
  data: ComponentHealth[];
}

const COLORS = [
  'hsl(142, 60%, 45%)',  // Primary green
  'hsl(185, 70%, 50%)',  // Accent cyan
  'hsl(38, 90%, 50%)',   // Warning orange
  'hsl(280, 60%, 50%)',  // Purple
  'hsl(200, 70%, 50%)',  // Blue
  'hsl(340, 70%, 50%)',  // Pink
];

export function ComponentHealthChart({ data }: ComponentHealthChartProps) {
  const chartData = data.map(item => ({
    name: item.type,
    value: item.count,
    health: item.avgHealth
  }));

  return (
    <div className="rounded-xl border border-border bg-card p-6 card-glow">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Component Distribution</h3>
        <p className="text-sm text-muted-foreground">Components detected across all boards</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  stroke="hsl(220, 18%, 10%)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(220, 18%, 12%)',
                border: '1px solid hsl(220, 15%, 18%)',
                borderRadius: '8px',
                color: 'hsl(160, 30%, 90%)'
              }}
              formatter={(value: number, name: string, props: any) => [
                `${value} components (${props.payload.health.toFixed(1)}% avg health)`,
                name
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {chartData.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-xs text-muted-foreground truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
