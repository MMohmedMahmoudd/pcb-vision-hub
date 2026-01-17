import { 
  Defect, 
  Board, 
  DashboardStats, 
  TrendData, 
  ComponentHealth,
  SearchResult,
  DefectType,
  Severity,
  ComponentType
} from '@/types';

const defectTypes: DefectType[] = [
  'Open Circuit',
  'Short Circuit', 
  'Solder Bridge',
  'Missing Component',
  'Misaligned Component',
  'Cold Solder Joint',
  'Insufficient Solder',
  'Excess Solder'
];

const severities: Severity[] = ['Critical', 'High', 'Medium', 'Low'];
const componentTypes: ComponentType[] = ['IC Chip', 'Solder Joint', 'Trace', 'Capacitor', 'Resistor', 'Connector'];

function randomId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function randomDate(daysBack: number = 30): string {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date.toISOString();
}

export const mockDefects: Defect[] = Array.from({ length: 50 }, (_, i) => ({
  id: randomId(),
  timestamp: randomDate(),
  imagePath: `/placeholder.svg`,
  defectCount: Math.floor(Math.random() * 5) + 1,
  defectType: defectTypes[Math.floor(Math.random() * defectTypes.length)],
  confidence: 0.85 + Math.random() * 0.14,
  severity: severities[Math.floor(Math.random() * severities.length)],
  boardId: `board-${Math.floor(i / 5)}`,
  location: {
    x: Math.floor(Math.random() * 400),
    y: Math.floor(Math.random() * 300),
    width: 50 + Math.floor(Math.random() * 50),
    height: 50 + Math.floor(Math.random() * 50),
  }
}));

export const mockBoard: Board = {
  id: 'board-001',
  imagePath: '/placeholder.svg',
  healthScore: 78,
  totalComponents: 156,
  components: componentTypes.flatMap(type => 
    Array.from({ length: Math.floor(Math.random() * 20) + 10 }, () => ({
      id: randomId(),
      boardId: 'board-001',
      type,
      area: type === 'IC Chip' ? 800 + Math.random() * 500 : 100 + Math.random() * 400,
      healthPercentage: 60 + Math.random() * 40,
      location: { x: Math.random() * 500, y: Math.random() * 400 },
      status: Math.random() > 0.85 ? 'Defective' : Math.random() > 0.7 ? 'Warning' : 'Healthy' as const
    }))
  ),
  disruptions: [
    {
      id: randomId(),
      defectType: 'Short Circuit',
      severity: 'Critical',
      location: 'U7 - Main Controller',
      repairTime: 15,
      cost: 45,
      impact: 'Board non-functional'
    },
    {
      id: randomId(),
      defectType: 'Solder Bridge',
      severity: 'High',
      location: 'R23-R24 Array',
      repairTime: 8,
      cost: 20,
      impact: 'Signal interference'
    },
    {
      id: randomId(),
      defectType: 'Cold Solder Joint',
      severity: 'Medium',
      location: 'C15 Capacitor',
      repairTime: 5,
      cost: 10,
      impact: 'Intermittent connection'
    }
  ],
  estimatedRepairTime: 28,
  estimatedCost: 75,
  analyzedAt: new Date().toISOString()
};

export const mockDashboardStats: DashboardStats = {
  totalScans: 1247,
  totalDefects: 342,
  avgHealthScore: 82.5,
  defectRate: 0.27,
  scansToday: 23,
  defectsToday: 7
};

export const mockTrendData: TrendData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    defects: Math.floor(Math.random() * 20) + 5,
    scans: Math.floor(Math.random() * 40) + 20
  };
});

export const mockComponentHealth: ComponentHealth[] = componentTypes.map(type => ({
  type,
  count: Math.floor(Math.random() * 50) + 20,
  avgHealth: 70 + Math.random() * 25
}));

export const mockSearchResults: SearchResult[] = Array.from({ length: 8 }, () => ({
  id: randomId(),
  imagePath: '/placeholder.svg',
  similarity: 0.65 + Math.random() * 0.34,
  defectType: defectTypes[Math.floor(Math.random() * defectTypes.length)],
  timestamp: randomDate()
})).sort((a, b) => b.similarity - a.similarity);
