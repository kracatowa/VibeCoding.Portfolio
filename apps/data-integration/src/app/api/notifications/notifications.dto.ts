export interface Notification {
  id: string;
  type: 'start' | 'success' | 'error';
  extractionId: string;
  sourceName: string;
  timestamp: string;
  read: boolean;
}
