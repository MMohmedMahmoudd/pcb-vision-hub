import { PageLayout } from '@/components/layout/PageLayout';
import { DefectHistory } from '@/components/history/DefectHistory';
import { mockDefects } from '@/services/mockData';

export default function History() {
  return (
    <PageLayout 
      title="Defect History" 
      subtitle="Browse and filter all detected defects"
    >
      <DefectHistory defects={mockDefects} />
    </PageLayout>
  );
}
