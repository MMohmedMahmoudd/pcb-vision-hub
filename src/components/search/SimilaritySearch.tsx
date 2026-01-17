import { useState } from 'react';
import { Search, Upload, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchResult } from '@/types';
import { cn } from '@/lib/utils';

interface SimilaritySearchProps {
  results: SearchResult[];
  onSearch: (file: File) => void;
  isSearching?: boolean;
}

export function SimilaritySearch({ results, onSearch, isSearching }: SimilaritySearchProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      onSearch(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="rounded-xl border border-border bg-card p-6 card-glow">
        <div className="flex items-center gap-4 mb-4">
          <Search className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Find Similar Defects</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">
          Upload an image to find similar defect patterns in the database
        </p>

        <div className="flex gap-4">
          <label className="flex-1 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-8 hover:border-primary/50 hover:bg-muted/30 transition-all">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">Drop image or click to upload</span>
            </div>
          </label>

          {selectedImage && (
            <div className="w-32 h-32 rounded-lg border border-border overflow-hidden">
              <img 
                src={selectedImage} 
                alt="Search query" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {isSearching ? (
        <div className="rounded-xl border border-border bg-card p-12">
          <div className="flex flex-col items-center justify-center">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
            <p className="font-medium text-foreground">Searching for similar patterns...</p>
            <p className="text-sm text-muted-foreground mt-1">Analyzing feature vectors</p>
          </div>
        </div>
      ) : results.length > 0 ? (
        <div className="rounded-xl border border-border bg-card overflow-hidden card-glow">
          <div className="border-b border-border bg-muted/30 px-6 py-4">
            <h3 className="font-semibold text-foreground">Search Results</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Found {results.length} similar defects
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {results.map((result, index) => (
              <div
                key={result.id}
                className="group relative rounded-lg border border-border bg-muted/30 overflow-hidden hover:border-primary/50 transition-all cursor-pointer"
              >
                {/* Similarity badge */}
                <div className={cn(
                  'absolute top-2 right-2 z-10 rounded-full px-2 py-1 text-xs font-mono font-medium',
                  result.similarity >= 0.9 
                    ? 'bg-primary/90 text-primary-foreground'
                    : result.similarity >= 0.75
                      ? 'bg-accent/90 text-accent-foreground'
                      : 'bg-muted/90 text-foreground'
                )}>
                  {(result.similarity * 100).toFixed(0)}%
                </div>

                {/* Rank badge */}
                <div className="absolute top-2 left-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background/90 text-xs font-bold">
                  #{index + 1}
                </div>

                {/* Image placeholder */}
                <div className="aspect-square bg-muted/50 flex items-center justify-center">
                  <Image className="h-12 w-12 text-muted-foreground/30" />
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground truncate">
                    {result.defectType}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">
                    {new Date(result.timestamp).toLocaleDateString()}
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      ) : selectedImage ? (
        <div className="rounded-xl border border-border bg-card p-12">
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <Search className="h-12 w-12 mb-4 opacity-30" />
            <p className="font-medium">No similar defects found</p>
            <p className="text-sm mt-1">Try uploading a different image</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
