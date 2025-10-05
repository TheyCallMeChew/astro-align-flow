import { VoiceRecorder } from 'capacitor-voice-recorder';
import { Filesystem, Directory } from '@capacitor/filesystem';

export interface RecordingResult {
  value: {
    recordDataBase64: string;
    mimeType: string;
    msDuration: number;
  };
}

class VoiceRecorderService {
  private isRecording = false;

  async requestPermission(): Promise<boolean> {
    try {
      const result = await VoiceRecorder.requestAudioRecordingPermission();
      return result.value;
    } catch (error) {
      console.error('Error requesting microphone permission:', error);
      return false;
    }
  }

  async hasPermission(): Promise<boolean> {
    try {
      const result = await VoiceRecorder.hasAudioRecordingPermission();
      return result.value;
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  }

  async startRecording(): Promise<void> {
    if (this.isRecording) {
      throw new Error('Already recording');
    }

    const hasPermission = await this.hasPermission();
    if (!hasPermission) {
      const granted = await this.requestPermission();
      if (!granted) {
        throw new Error('Microphone permission denied');
      }
    }

    try {
      await VoiceRecorder.startRecording();
      this.isRecording = true;
    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }

  async stopRecording(): Promise<RecordingResult> {
    if (!this.isRecording) {
      throw new Error('Not currently recording');
    }

    try {
      const result = await VoiceRecorder.stopRecording();
      this.isRecording = false;
      return result as RecordingResult;
    } catch (error) {
      console.error('Error stopping recording:', error);
      this.isRecording = false;
      throw error;
    }
  }

  async pauseRecording(): Promise<void> {
    if (!this.isRecording) {
      throw new Error('Not currently recording');
    }

    try {
      await VoiceRecorder.pauseRecording();
    } catch (error) {
      console.error('Error pausing recording:', error);
      throw error;
    }
  }

  async resumeRecording(): Promise<void> {
    if (!this.isRecording) {
      throw new Error('Not currently recording');
    }

    try {
      await VoiceRecorder.resumeRecording();
    } catch (error) {
      console.error('Error resuming recording:', error);
      throw error;
    }
  }

  async getCurrentStatus() {
    try {
      return await VoiceRecorder.getCurrentStatus();
    } catch (error) {
      console.error('Error getting status:', error);
      return { status: 'NONE' };
    }
  }

  async saveRecording(base64Data: string, filename: string): Promise<string> {
    try {
      const result = await Filesystem.writeFile({
        path: `recordings/${filename}`,
        data: base64Data,
        directory: Directory.Data,
      });
      return result.uri;
    } catch (error) {
      console.error('Error saving recording:', error);
      throw error;
    }
  }

  isCurrentlyRecording(): boolean {
    return this.isRecording;
  }
}

export const voiceRecorder = new VoiceRecorderService();
