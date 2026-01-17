import { useState, useEffect, useRef } from 'react';
import { Camera, CameraOff, Circle, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CameraFeedProps {
  isActive: boolean;
  onToggle: () => void;
  onCapture: () => void;
}

export function CameraFeed({ isActive, onToggle, onCapture }: CameraFeedProps) {
  const [fps, setFps] = useState(30);
  const [isScanning, setIsScanning] = useState(false);
  const scanLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setFps(28 + Math.floor(Math.random() * 5));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const handleCapture = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onCapture();
    }, 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Camera viewport */}
      <div className="relative h-[400px] bg-muted/50">
        {isActive ? (
          <>
            {/* Simulated camera feed with grid overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/60">
              {/* Grid overlay */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, hsl(var(--primary) / 0.3) 1px, transparent 1px),
                    linear-gradient(to bottom, hsl(var(--primary) / 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}
              />
              
              {/* Corner markers */}
              <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-primary" />
              <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-primary" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-primary" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-primary" />

              {/* Scanning line animation */}
              {isScanning && (
                <div 
                  ref={scanLineRef}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan"
                />
              )}

              {/* Center crosshair */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute -top-6 left-1/2 w-px h-4 bg-primary/50" />
                  <div className="absolute -bottom-6 left-1/2 w-px h-4 bg-primary/50" />
                  <div className="absolute -left-6 top-1/2 h-px w-4 bg-primary/50" />
                  <div className="absolute -right-6 top-1/2 h-px w-4 bg-primary/50" />
                  <div className="h-3 w-3 rounded-full border-2 border-primary bg-primary/20" />
                </div>
              </div>

              {/* Placeholder PCB image area */}
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Camera className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p className="font-mono text-sm">Camera Feed Active</p>
                  <p className="text-xs mt-1">Position PCB in frame</p>
                </div>
              </div>
            </div>

            {/* Status overlays */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-xs font-mono text-foreground">LIVE</span>
            </div>

            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <span className="text-xs font-mono text-accent">{fps} FPS</span>
            </div>

            {isScanning && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <div className="text-center">
                  <div className="h-12 w-12 mx-auto mb-4 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  <p className="font-medium text-primary">Analyzing...</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <CameraOff className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="font-medium">Camera Inactive</p>
              <p className="text-sm mt-1">Click Start to enable camera feed</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between border-t border-border bg-muted/30 p-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={onToggle}
            variant={isActive ? 'destructive' : 'default'}
            className={cn(!isActive && 'bg-primary hover:bg-primary/90')}
          >
            {isActive ? (
              <>
                <CameraOff className="h-4 w-4 mr-2" />
                Stop Camera
              </>
            ) : (
              <>
                <Camera className="h-4 w-4 mr-2" />
                Start Camera
              </>
            )}
          </Button>

          <Button
            onClick={handleCapture}
            disabled={!isActive || isScanning}
            variant="outline"
          >
            <Circle className="h-4 w-4 mr-2 fill-destructive text-destructive" />
            Capture & Analyze
          </Button>
        </div>

        <Button variant="ghost" size="icon">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
