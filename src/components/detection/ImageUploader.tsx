import { useCallback, useState } from 'react';
import { Upload, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedImage?: string;
  onClear?: () => void;
}

export function ImageUploader({ onImageSelect, selectedImage, onClear }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  if (selectedImage) {
    return (
      <div className="relative rounded-xl border border-border bg-card overflow-hidden">
        <img 
          src={selectedImage} 
          alt="Selected PCB" 
          className="w-full h-[400px] object-contain bg-muted/30"
        />
        {onClear && (
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-4 right-4"
            onClick={onClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all duration-300',
        isDragging
          ? 'border-primary bg-primary/10'
          : 'border-border bg-card hover:border-primary/50 hover:bg-muted/30'
      )}
    >
      <div className={cn(
        'flex h-16 w-16 items-center justify-center rounded-full mb-4 transition-all',
        isDragging ? 'bg-primary/20' : 'bg-muted'
      )}>
        <Upload className={cn(
          'h-8 w-8 transition-colors',
          isDragging ? 'text-primary' : 'text-muted-foreground'
        )} />
      </div>
      
      <p className="text-lg font-medium text-foreground mb-2">
        Drop your PCB image here
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        Supports PNG, JPG, BMP up to 10MB
      </p>
      
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button variant="outline" className="pointer-events-none">
          <Image className="h-4 w-4 mr-2" />
          Select Image
        </Button>
      </label>
    </div>
  );
}
