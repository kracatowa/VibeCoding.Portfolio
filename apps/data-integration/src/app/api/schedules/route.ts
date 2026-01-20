import { NextRequest, NextResponse } from 'next/server';
import { getSchedules, updateSchedulePreferences } from '@/lib/database';
import { SchedulePreference } from './schedules.dto';

export async function GET() {
  try{
    const schedules = getSchedules();
    return NextResponse.json(schedules);
  }
  catch (err) {
    return NextResponse.json({ error: 'Failed to fetch schedules' }, { status: 500 });
  }
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
