import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ScanLine, 
  Cpu, 
  Search, 
  History, 
  Settings,
  CircuitBoard
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/detection', icon: ScanLine, label: 'Detection' },
  { to: '/analysis', icon: Cpu, label: 'Analysis' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/history', icon: History, label: 'History' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 animate-pulse-glow">
            <CircuitBoard className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-sidebar-foreground">PCB Inspect</h1>
            <p className="text-xs text-muted-foreground font-mono">v2.0</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-accent text-primary shadow-lg shadow-primary/10'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                )
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* System Status */}
        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground">System Online</span>
            </div>
            <div className="space-y-1 text-xs font-mono text-muted-foreground">
              <p>ML Model: Active</p>
              <p>Accuracy: 94.2%</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
