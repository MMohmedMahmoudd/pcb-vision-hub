import { PageLayout } from '@/components/layout/PageLayout';
import { BoardAnalysis } from '@/components/analysis/BoardAnalysis';
import { mockBoard } from '@/services/mockData';

export default function Analysis() {
  return (
    <PageLayout 
      title="Board Analysis" 
      subtitle="Comprehensive PCB component and health analysis"
    >
      <BoardAnalysis board={mockBoard} />
    </PageLayout>
  );
}
