export interface SchedulePreference {
  dayOfWeek: number; // 0 = Dimanche, 1 = Lundi, etc.
  time?: string; // Format HH:mm
  enabled: boolean;
}

export interface Schedule{
  id: string;
  sourceId: string;
  templateId: string;
  schedulePreferences: SchedulePreference[];
}