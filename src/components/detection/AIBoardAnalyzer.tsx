import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Defect } from '@/types';
import { analyzeDefectsWithAI, generateBoardHealthReport, searchOnlineForDefect, ChatMessage } from '@/services/aiService';
import { cn } from '@/lib/utils';

interface AIBoardAnalyzerProps {
  defects: Defect[];
  isProcessing: boolean;
  imageUrl?: string;
}

export function AIBoardAnalyzer({ defects, isProcessing, imageUrl }: AIBoardAnalyzerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with a welcome message and health report when defects are available
  useEffect(() => {
    if (defects.length > 0 && messages.length === 0) {
      const initializeChat = async () => {
        const report = await generateBoardHealthReport(defects);
        const assistantMessage: ChatMessage = {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          content: report,
          timestamp: new Date(),
        };
        setMessages([assistantMessage]);
      };
      initializeChat();
    }
  }, [defects, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || defects.length === 0) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Get AI response
    const response = await analyzeDefectsWithAI(defects, inputValue);
    const assistantMessage: ChatMessage = {
      id: `msg-${Date.now()}-ai`,
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSearchOnline = async () => {
    if (defects.length === 0 || isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: '🔍 Search online for solutions',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Get search results
    const searchResults = await searchOnlineForDefect(defects);
    const assistantMessage: ChatMessage = {
      id: `msg-${Date.now()}-search`,
      role: 'assistant',
      content: searchResults,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <Card className="flex flex-col h-[600px] bg-card border-border">
      {/* Header */}
      <div className="border-b border-border bg-muted/30 p-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">AI Board Analyzer</h3>
            <p className="text-xs text-muted-foreground">
              {defects.length > 0 ? `Analyzing ${defects.length} defect(s)` : 'Capture or upload an image to start'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && defects.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <div className="text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-30" />
                <p>Capture or upload a board image to analyze</p>
                <p className="text-xs mt-1">I'll help explain any defects found</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn('flex gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {message.role === 'assistant' && (
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-xs rounded-lg px-4 py-2 text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground border border-border'
                  )}
                >
                  <p className="whitespace-pre-wrap text-left">{message.content}</p>
                  <p className={cn('text-xs mt-1', message.role === 'user' ? 'opacity-70' : 'opacity-60')}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
              <div className="max-w-xs rounded-lg px-4 py-2 text-sm bg-muted text-muted-foreground border border-border">
                <p>Analyzing...</p>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border bg-muted/30 p-4 space-y-3">
        {defects.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-2">
            {isProcessing ? 'Processing image...' : 'No defects detected yet'}
          </p>
        ) : (
          <div className="flex gap-2">
            <Input
              placeholder="Ask about the defects..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="text-sm"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="sm"
              className="px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Quick Actions */}
        {defects.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                setInputValue('How severe are these defects?');
              }}
            >
              Severity
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                setInputValue('How can I fix these issues?');
              }}
            >
              Fix Tips
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                setInputValue('Explain all defects in detail');
              }}
            >
              Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={handleSearchOnline}
              disabled={isLoading}
            >
              <Search className="h-3 w-3 mr-1" />
              Search Online
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
