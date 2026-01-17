export interface Defect {
  id: string;
  timestamp: string;
  imagePath: string;
  defectCount: number;
  defectType: DefectType;
  confidence: number;
  severity: Severity;
  boardId?: string;
  location?: { x: number; y: number; width: number; height: number };
}

export type DefectType = 
  | 'Open Circuit'
  | 'Short Circuit'
  | 'Solder Bridge'
  | 'Missing Component'
  | 'Misaligned Component'
  | 'Cold Solder Joint'
  | 'Insufficient Solder'
  | 'Excess Solder';

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Component {
  id: string;
  boardId: string;
  type: ComponentType;
  area: number;
  healthPercentage: number;
  location: { x: number; y: number };
  status: 'Healthy' | 'Warning' | 'Defective';
}

export type ComponentType = 'IC Chip' | 'Solder Joint' | 'Trace' | 'Capacitor' | 'Resistor' | 'Connector';

export interface Board {
  id: string;
  imagePath: string;
  healthScore: number;
  totalComponents: number;
  components: Component[];
  disruptions: Disruption[];
  estimatedRepairTime: number;
  estimatedCost: number;
  analyzedAt: string;
}

export interface Disruption {
  id: string;
  defectType: DefectType;
  severity: Severity;
  location: string;
  repairTime: number;
  cost: number;
  impact: string;
}

export interface SearchResult {
  id: string;
  imagePath: string;
  similarity: number;
  defectType: DefectType;
  timestamp: string;
}

export interface DashboardStats {
  totalScans: number;
  totalDefects: number;
  avgHealthScore: number;
  defectRate: number;
  scansToday: number;
  defectsToday: number;
}

export interface TrendData {
  date: string;
  defects: number;
  scans: number;
}

export interface ComponentHealth {
  type: ComponentType;
  count: number;
  avgHealth: number;
}
