import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { CameraFeed } from '@/components/detection/CameraFeed';
import { ImageUploader } from '@/components/detection/ImageUploader';
import { DetectionResults } from '@/components/detection/DetectionResults';
import { AIBoardAnalyzer } from '@/components/detection/AIBoardAnalyzer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Upload } from 'lucide-react';
import { mockDefects } from '@/services/mockData';
import { Defect } from '@/types';

export default function Detection() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [detectedDefects, setDetectedDefects] = useState<Defect[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCameraToggle = () => {
    setIsCameraActive(!isCameraActive);
  };

  const handleCapture = () => {
    setIsProcessing(true);
    // Simulate detection process
    setTimeout(() => {
      setDetectedDefects(mockDefects.slice(0, 3));
      setIsProcessing(false);
    }, 2000);
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(URL.createObjectURL(file));
    setIsProcessing(true);
    // Simulate detection process
    setTimeout(() => {
      setDetectedDefects(mockDefects.slice(0, 4));
      setIsProcessing(false);
    }, 2000);
  };

  const handleClearImage = () => {
    setSelectedImage(undefined);
    setDetectedDefects([]);
  };

  return (
    <PageLayout 
      title="Defect Detection" 
      subtitle="Real-time PCB analysis and defect identification"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <Tabs defaultValue="camera" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-muted">
              <TabsTrigger value="camera" className="gap-2">
                <Camera className="h-4 w-4" />
                Camera
              </TabsTrigger>
              <TabsTrigger value="upload" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="camera">
              <CameraFeed
                isActive={isCameraActive}
                onToggle={handleCameraToggle}
                onCapture={handleCapture}
              />
            </TabsContent>

            <TabsContent value="upload">
              <ImageUploader
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
                onClear={handleClearImage}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-1">
          <DetectionResults 
            defects={detectedDefects} 
            isProcessing={isProcessing}
          />
        </div>

        {/* AI Chat Section */}
        <div className="lg:col-span-1">
          <AIBoardAnalyzer 
            defects={detectedDefects}
            isProcessing={isProcessing}
            imageUrl={selectedImage}
          />
        </div>
      </div>
    </PageLayout>
  );
}
