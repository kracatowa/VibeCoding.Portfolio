import { NextRequest, NextResponse } from 'next/server';
import { getSchedules, updateSchedulePreferences, type SchedulePreference } from '@/lib/database';

export async function GET() {
  const schedules = getSchedules();
  return NextResponse.json(schedules);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { scheduleId, updatedSchedulePreferences } = body as { scheduleId: string; updatedSchedulePreferences: SchedulePreference[] };

    if (!updatedSchedulePreferences || !Array.isArray(updatedSchedulePreferences)) {
      return NextResponse.json(
        { error: 'Préférences de planification requises' },
        { status: 400 }
      );
    }
    const updatedSchedules = updateSchedulePreferences(scheduleId, updatedSchedulePreferences);

    return NextResponse.json({
      success: true,
      schedules: updatedSchedules,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des planifications:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}
