export interface AdminSource {
  id: string;
  name: string;
  apiUrl: string;
  authType: 'none' | 'bearer' | 'apikey';
  authToken?: string;
  headers?: Record<string, string>;
  createdAt: string;
}
