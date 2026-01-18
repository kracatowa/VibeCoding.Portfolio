// Base de données en mémoire pour la démo

export interface Extraction {
  id: string;
  source: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  recordsCount?: number;
  fileName?: string;
  currentStep?: number;
  error?: string;
  template?: string;
  destination?: string;
}

export interface SchedulePreference {
  dayOfWeek: number; // 0 = Dimanche, 1 = Lundi, etc.
  time: string; // Format HH:mm
  enabled: boolean;
}

export interface Template {
  id: string;
  sourceId: string;
  name: string;
}

export interface Source{
  id: string;
  name: string;
}

interface Database {
  extractions: Extraction[];
  schedules: SchedulePreference[];
  templates?: Template[];
  destinations?: string[];
  sources: Source[];
}

// Base de données en mémoire (simulée)
const db: Database = {
  extractions: [
    {
      id: '1',
      source: 'Salesforce',
      status: 'completed',
      startedAt: '2026-01-08T10:30:00',
      completedAt: '2026-01-08T10:32:15',
      recordsCount: 1250,
      fileName: 'salesforce_export_20260108.csv',
      destination: 'S3 Bucket',
      template: 'Catherine-Salesforce-2025'
    },
    {
      id: '2',
      source: 'HubSpot',
      status: 'completed',
      startedAt: '2026-01-08T14:00:00',
      completedAt: '2026-01-08T14:01:45',
      recordsCount: 890,
      fileName: 'hubspot_export_20260108.csv',
      destination: 'S3 Bucket',
      template: 'Sylvie-Hubspot-2025'
    },
    {
      id: '3',
      source: 'Salesforce',
      status: 'failed',
      startedAt: '2026-01-07T09:00:00',
      completedAt: '2026-01-07T09:00:30',
      error: 'Timeout lors de la connexion à l\'API',
      destination: 'FTP Server',
      template: 'Steve-Zendesk-2025'
    },
    {
      id: '4',
      source: 'Zendesk',
      status: 'completed',
      startedAt: '2026-01-06T16:45:00',
      completedAt: '2026-01-06T16:47:20',
      recordsCount: 456,
      fileName: 'zendesk_export_20260106.csv',
      destination: 'Local Storage',
      template: 'Par defaut'
    },
  ],
  schedules: [
    { dayOfWeek: 1, time: '08:00', enabled: true },  // Lundi
    { dayOfWeek: 2, time: '08:00', enabled: true },  // Mardi
    { dayOfWeek: 3, time: '08:00', enabled: true },  // Mercredi
    { dayOfWeek: 4, time: '08:00', enabled: true },  // Jeudi
    { dayOfWeek: 5, time: '08:00', enabled: true },  // Vendredi
    { dayOfWeek: 6, time: '', enabled: false },      // Samedi
    { dayOfWeek: 0, time: '', enabled: false },      // Dimanche
  ],
  templates: [
    { id: '1', sourceId: '1', name: 'Par défault' },
    { id: '2', sourceId: '1', name: 'Catherine-Salesforce-2025' },
    { id: '3', sourceId: '2', name: 'Par défault' },
    { id: '4', sourceId: '2', name: 'Sylvie-Hubspot-2025' },
    { id: '5', sourceId: '3', name: 'Par défault' },
    { id: '6', sourceId: '3', name: 'Steve-Zendesk-2025' }
  ],
  destinations: [
    'S3 Bucket',
    'FTP Server',
    'Local Storage'
  ],
  sources: [
    { id: '1', name: 'Salesforce' },
    { id: '2', name: 'HubSpot' },
    { id: '3', name: 'Zendesk' },
  ]
};

// Fonctions CRUD pour les extractions
export function getAllExtractions(): Extraction[] {
  return [...db.extractions].sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  );
}

export function getExtractionById(id: string): Extraction | undefined {
  return db.extractions.find((e) => e.id === id);
}

export function createExtraction(extraction: Omit<Extraction, 'id'>): Extraction {
  const newExtraction: Extraction = {
    ...extraction,
    id: Date.now().toString(),
  };
  db.extractions.push(newExtraction);
  return newExtraction;
}

export function updateExtraction(id: string, updates: Partial<Extraction>): Extraction | null {
  const index = db.extractions.findIndex((e) => e.id === id);
  if (index === -1) return null;
  
  db.extractions[index] = { ...db.extractions[index], ...updates };
  return db.extractions[index];
}

// Fonctions CRUD pour les préférences de planification
export function getSchedules(): SchedulePreference[] {
  return [...db.schedules].sort((a, b) => {
    // Trier par jour de la semaine (Lundi = 1 en premier)
    const orderA = a.dayOfWeek === 0 ? 7 : a.dayOfWeek;
    const orderB = b.dayOfWeek === 0 ? 7 : b.dayOfWeek;
    return orderA - orderB;
  });
}

export function updateSchedule(dayOfWeek: number, updates: Partial<SchedulePreference>): SchedulePreference | null {
  const index = db.schedules.findIndex((s) => s.dayOfWeek === dayOfWeek);
  if (index === -1) return null;
  
  db.schedules[index] = { ...db.schedules[index], ...updates };
  return db.schedules[index];
}

export function updateAllSchedules(schedules: SchedulePreference[]): SchedulePreference[] {
  db.schedules = schedules;
  return getSchedules();
}

export function getTemplates(source?: string): Template[] {
  if (!source) return [];
  const list = db.templates?.filter(t => t.sourceId === source);
  if (!list || list.length === 0) return [{ id: 'default', sourceId: source, name: 'has default' }];
  return [...list];
}

export function getSources(): Source[] {
  const list =  db.sources;
  if (!list || list.length === 0) return [{ id: 'default', name: 'has default'  }];
  return [...list];
}

export function getDestinations(): string[] {
  const list =  db.destinations;
  if (!list || list.length === 0) return [ 'has default' ];
  return [...list];
}
