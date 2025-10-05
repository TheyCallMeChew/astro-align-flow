import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Mic, Square, Loader2, Volume2, Sparkles, Keyboard } from 'lucide-react';
import { voiceRecorder } from '@/services/voiceRecorder';
import { aiReflectionService, type TranscriptionResult } from '@/services/aiReflection';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/store';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

export default function Reflection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateDayEntry, getTodayEntry } = useStore();
  
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [result, setResult] = useState<TranscriptionResult | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [useTextMode, setUseTextMode] = useState(false);
  const [textReflection, setTextReflection] = useState('');

  useEffect(() => {
    checkPermission();
    
    let interval: number;
    if (isRecording) {
      interval = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const checkPermission = async () => {
    const granted = await voiceRecorder.hasPermission();
    setHasPermission(granted);
  };

  const requestPermission = async () => {
    const granted = await voiceRecorder.requestPermission();
    setHasPermission(granted);
    
    if (!granted) {
      toast({
        title: 'Microphone access denied',
        description: "No problem! You can type your reflection instead.",
      });
      setUseTextMode(true);
    }
  };

  const processTextReflection = async () => {
    if (!textReflection.trim()) {
      toast({
        title: 'Empty reflection',
        description: 'Please write something before continuing.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    try {
      const insights = await aiReflectionService.generateInsights(textReflection);
      setResult(insights);

      const today = getTodayEntry();
      updateDayEntry(today.date, {
        reflection: insights.transcript,
      });

      toast({
        title: 'Reflection complete ✨',
        description: 'Your insights are ready',
      });
    } catch (error) {
      console.error('Error processing reflection:', error);
      toast({
        title: 'Processing failed',
        description: 'Could not process your reflection. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const startRecording = async () => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Medium });
    }

    if (!hasPermission) {
      await requestPermission();
      return;
    }

    try {
      await voiceRecorder.startRecording();
      setIsRecording(true);
      setRecordingTime(0);
      setResult(null);
      
      toast({
        title: 'Recording started',
        description: 'Speak your reflection...',
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: 'Recording failed',
        description: 'Could not start recording. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const stopRecording = async () => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    }

    try {
      const recording = await voiceRecorder.stopRecording();
      setIsRecording(false);
      setIsProcessing(true);

      toast({
        title: 'Processing reflection...',
        description: 'Generating insights with AI',
      });

      // Process with AI
      const insights = await aiReflectionService.processReflection(
        recording.value.recordDataBase64
      );

      setResult(insights);
      setIsProcessing(false);

      // Save to today's entry
      const today = getTodayEntry();
      updateDayEntry(today.date, {
        reflection: insights.transcript,
      });

      toast({
        title: 'Reflection complete ✨',
        description: 'Your insights are ready',
      });
    } catch (error) {
      console.error('Error processing recording:', error);
      setIsProcessing(false);
      toast({
        title: 'Processing failed',
        description: 'Could not process your reflection. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const speakAffirmation = async () => {
    if (result?.affirmation) {
      await aiReflectionService.speakAffirmation(result.affirmation);
      
      if (Capacitor.isNativePlatform()) {
        await Haptics.impact({ style: ImpactStyle.Light });
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 pb-24 pt-6">
      <div className="container max-w-2xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            Voice Reflection
          </h1>
          <p className="text-muted-foreground">
            Speak your thoughts and receive compassionate insights
          </p>
        </div>

        {/* Mode Toggle */}
        {!result && (
          <div className="flex items-center justify-center gap-3">
            <Button
              variant={!useTextMode ? 'cosmic' : 'outline'}
              size="sm"
              onClick={() => setUseTextMode(false)}
              className="gap-2"
            >
              <Mic className="w-4 h-4" />
              Voice
            </Button>
            <Button
              variant={useTextMode ? 'cosmic' : 'outline'}
              size="sm"
              onClick={() => setUseTextMode(true)}
              className="gap-2"
            >
              <Keyboard className="w-4 h-4" />
              Text
            </Button>
          </div>
        )}

        {/* Recording Interface */}
        {!useTextMode && !result && (
          <Card className="p-8 space-y-6">
            <div className="flex flex-col items-center gap-6">
              {/* Recording Button */}
              <div className="relative">
                <Button
                  variant={isRecording ? 'destructive' : 'cosmic'}
                  size="icon"
                  className={`w-24 h-24 rounded-full transition-all duration-300 ${
                    isRecording ? 'animate-pulse' : ''
                  }`}
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="w-12 h-12 animate-spin" />
                  ) : isRecording ? (
                    <Square className="w-12 h-12" />
                  ) : (
                    <Mic className="w-12 h-12" />
                  )}
                </Button>

                {isRecording && (
                  <div className="absolute -inset-3 border-4 border-primary rounded-full animate-ping opacity-20" />
                )}
              </div>

              {/* Recording Timer */}
              {isRecording && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <Badge variant="secondary" className="text-lg px-4 py-1">
                    {formatTime(recordingTime)}
                  </Badge>
                </div>
              )}

              {/* Status Text */}
              <p className="text-center text-sm text-muted-foreground">
                {isProcessing
                  ? 'Processing your reflection...'
                  : isRecording
                  ? 'Recording... Tap the square to stop'
                  : 'Tap the microphone to start recording'}
              </p>

              {!hasPermission && !isRecording && (
                <Button
                  variant="outline"
                  onClick={requestPermission}
                  className="w-full"
                >
                  Enable Microphone Access
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Text Input Interface */}
        {useTextMode && !result && (
          <Card className="p-6 space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold">Write Your Reflection</h3>
              <Textarea
                placeholder="Share your thoughts, feelings, or what's on your mind..."
                value={textReflection}
                onChange={(e) => setTextReflection(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <Button
                variant="cosmic"
                size="lg"
                className="w-full"
                onClick={processTextReflection}
                disabled={isProcessing || !textReflection.trim()}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Insights
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {/* AI Insights */}
        {result && (
          <>
            <Card className="p-6 space-y-4 bg-gradient-subtle border-primary/20">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Your Reflection</h2>
              </div>
              <p className="text-foreground leading-relaxed">
                {result.transcript}
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-primary">Compassionate Summary</h3>
              <p className="text-foreground leading-relaxed">
                {result.summary}
              </p>
            </Card>

            <Card className="p-6 space-y-4 bg-primary/10 border-primary/30">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-primary">Your Affirmation</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={speakAffirmation}
                  className="h-8 w-8"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-lg italic text-foreground">
                "{result.affirmation}"
              </p>
            </Card>

            <Button
              variant="cosmic"
              size="lg"
              className="w-full"
              onClick={() => navigate('/home')}
            >
              Save & Continue
            </Button>
          </>
        )}

        {/* Instructions */}
        {!result && !isRecording && (
          <Card className="p-6 space-y-3 bg-muted/30">
            <h3 className="font-semibold">How it works:</h3>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Tap the microphone to start recording</li>
              <li>Speak your reflection naturally (no time limit)</li>
              <li>Tap the square to stop when finished</li>
              <li>AI will transcribe and generate compassionate insights</li>
              <li>Receive a personalized affirmation</li>
            </ol>
          </Card>
        )}
      </div>
    </div>
  );
}
