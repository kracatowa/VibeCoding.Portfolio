// Base de données en mémoire pour la démo

import { Schedule, SchedulePreference } from "@/app/api/schedules/schedules.dto";
import { Source } from "@/app/api/sources/sources.dto";
import { Template } from "@/app/api/templates/templates.dto";

export interface Extraction {
  id: string;
  source: Source;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  recordsCount?: number;
  fileName?: string;
  currentStep?: number;
  error?: string;
  template?: Template;
  destination?: Destination;
  interval?: string;
}

export interface Destination{
  id: string;
  name: string;
}

interface Database {
  extractions: Extraction[];
  schedules: Schedule[];
  templates?: Template[];
  destinations?: Destination[];
  sources: Source[];
}

// Base de données en mémoire (simulée)
const db: Database = {
  extractions: [
    {
      id: '1',
      source: { id: '1', name: 'Salesforce' },
      status: 'completed',
      startedAt: '2026-01-08T10:30:00',
      completedAt: '2026-01-08T10:32:15',
      recordsCount: 1250,
      fileName: 'salesforce_export_20260108.csv',
      destination: { id: '1', name: 'S3 Bucket' },
      template: { id: '2', sourceId: '1', name: 'Catherine-Salesforce-2025' },
      interval: '30 jours'
    },
    {
      id: '2',
      source: { id: '2', name: 'HubSpot' },
      status: 'completed',
      startedAt: '2026-01-08T14:00:00',
      completedAt: '2026-01-08T14:01:45',
      recordsCount: 890,
      fileName: 'hubspot_export_20260108.csv',
      destination: { id: '1', name: 'S3 Bucket' },
      template: { id: '4', sourceId: '2', name: 'Sylvie-Hubspot-2025' },
      interval: '7 jours'
    },
    {
      id: '3',
      source: { id: '1', name: 'Salesforce' },
      status: 'failed',
      startedAt: '2026-01-07T09:00:00',
      completedAt: '2026-01-07T09:00:30',
      error: 'Timeout lors de la connexion à l\'API',
      destination: { id: '2', name: 'FTP Server' },
      template: { id: '2', sourceId: '1', name: 'Catherine-Salesforce-2025' },
      interval: 'Toute la période'
    },
    {
      id: '4',
      source: { id: '3', name: 'Zendesk' },
      status: 'completed',
      startedAt: '2026-01-06T16:45:00',
      completedAt: '2026-01-06T16:47:20',
      recordsCount: 456,
      fileName: 'zendesk_export_20260106.csv',
      destination: { id: '3', name: 'Local Storage' },
      template: { id: '5', sourceId: '3', name: 'Par defaut' },
      interval: '1 jour'
    },
  ],
  schedules: [
    {
      id: '1',
      sourceId: '1',
      templateId: '1',
      schedulePreferences: [
      { dayOfWeek: 1, time: '08:00', enabled: true },  // Lundi
      { dayOfWeek: 2, time: '08:00', enabled: true },  // Mardi
      { dayOfWeek: 3, time: '08:00', enabled: true },  // Mercredi
      { dayOfWeek: 4, time: '08:00', enabled: true },  // Jeudi
      { dayOfWeek: 5, time: '08:00', enabled: true },  // Vendredi
      { dayOfWeek: 6, time: '', enabled: false },      // Samedi
      { dayOfWeek: 0, time: '', enabled: false }]      // Dimanche
    },
    {
      id: '2',
      sourceId: '1',
      templateId: '2',
      schedulePreferences: [
      { dayOfWeek: 1, time: '08:00', enabled: true },  // Lundi
      { dayOfWeek: 2, time: '08:00', enabled: true },  // Mardi
      { dayOfWeek: 3, time: '08:00', enabled: true },  // Mercredi
      { dayOfWeek: 4, time: '08:00', enabled: true },  // Jeudi
      { dayOfWeek: 5, time: '08:00', enabled: true },  // Vendredi
      { dayOfWeek: 6, time: '', enabled: false },      // Samedi
      { dayOfWeek: 0, time: '', enabled: false }]      // Dimanche
    },
    {
      id: '3',
      sourceId: '2',
      templateId: '3',
      schedulePreferences: [
      { dayOfWeek: 1, time: '08:00', enabled: true },  // Lundi
      { dayOfWeek: 2, time: '08:00', enabled: true },  // Mardi
      { dayOfWeek: 3, time: '08:00', enabled: true },  // Mercredi
      { dayOfWeek: 4, time: '08:00', enabled: true },  // Jeudi
      { dayOfWeek: 5, time: '08:00', enabled: true },  // Vendredi
      { dayOfWeek: 6, time: '', enabled: false },      // Samedi
      { dayOfWeek: 0, time: '', enabled: false }]      // Dimanche
    },
    {
      id: '4',
      sourceId: '2',
      templateId: '4',
      schedulePreferences: [
      { dayOfWeek: 1, time: '08:00', enabled: true },  // Lundi
      { dayOfWeek: 2, time: '08:00', enabled: true },  // Mardi
      { dayOfWeek: 3, time: '08:00', enabled: true },  // Mercredi
      { dayOfWeek: 4, time: '08:00', enabled: true },  // Jeudi
      { dayOfWeek: 5, time: '08:00', enabled: true },  // Vendredi
      { dayOfWeek: 6, time: '', enabled: false },      // Samedi
      { dayOfWeek: 0, time: '', enabled: false }]      // Dimanche
    },
    {
      id: '5',
      sourceId: '3',
      templateId: '5',
      schedulePreferences: [
      { dayOfWeek: 1, time: '08:00', enabled: true },  // Lundi
      { dayOfWeek: 2, time: '08:00', enabled: true },  // Mardi
      { dayOfWeek: 3, time: '08:00', enabled: true },  // Mercredi
      { dayOfWeek: 4, time: '08:00', enabled: true },  // Jeudi
      { dayOfWeek: 5, time: '08:00', enabled: true },  // Vendredi
      { dayOfWeek: 6, time: '', enabled: false },      // Samedi
      { dayOfWeek: 0, time: '', enabled: false }]      // Dimanche
    },
    {
      id: '6',
      sourceId: '3',
      templateId: '6',
      schedulePreferences: [
      { dayOfWeek: 1, time: '08:00', enabled: true },  // Lundi
      { dayOfWeek: 2, time: '08:00', enabled: true },  // Mardi
      { dayOfWeek: 3, time: '08:00', enabled: true },  // Mercredi
      { dayOfWeek: 4, time: '08:00', enabled: true },  // Jeudi
      { dayOfWeek: 5, time: '08:00', enabled: true },  // Vendredi
      { dayOfWeek: 6, time: '', enabled: false },      // Samedi
      { dayOfWeek: 0, time: '', enabled: false }]      // Dimanche
    }
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
    { id: '1', name: 'S3 Bucket' },
    { id: '2', name: 'FTP Server' },
    { id: '3', name: 'Local Storage' }
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

export function getSchedules(): Schedule[] {
  return [...db.schedules];
}

export function updateSchedulePreferences(scheduleId: string, schedulePreferences: SchedulePreference[]): any {
  const index = db.schedules.findIndex((s) => s.id === scheduleId);
  if (index === -1) return null;

  db.schedules[index] = { ...db.schedules[index], schedulePreferences };
  return db.schedules[index];
}

export function getTemplates(sourceId?: string): Template[] {
  if (!sourceId) return [];
  const list = db.templates?.filter(t => t.sourceId === sourceId);
  if (!list || list.length === 0) return [{ id: 'default', sourceId: sourceId, name: 'has default' }];
  return [...list];
}

export function getSources(): Source[] {
  const list =  db.sources;
  if (!list || list.length === 0) return [{ id: 'default', name: 'has default'  }];
  return [...list];
}

export function getDestinations(): Destination[] {
  const list =  db.destinations;
  if (!list || list.length === 0) return [ { id: 'default', name: 'has default' } ];
  return [...list];
}
