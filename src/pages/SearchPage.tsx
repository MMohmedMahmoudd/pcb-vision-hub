import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SimilaritySearch } from '@/components/search/SimilaritySearch';
import { mockSearchResults } from '@/services/mockData';
import { SearchResult } from '@/types';

export default function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (file: File) => {
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setResults(mockSearchResults);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <PageLayout 
      title="Similarity Search" 
      subtitle="Find matching defect patterns across the database"
    >
      <SimilaritySearch 
        results={results} 
        onSearch={handleSearch}
        isSearching={isSearching}
      />
    </PageLayout>
  );
}
