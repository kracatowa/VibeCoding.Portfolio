import { NextRequest, NextResponse } from 'next/server';
import { getSchedules, updateAllSchedules, type SchedulePreference } from '@/lib/database';

export async function GET() {
  const schedules = getSchedules();
  return NextResponse.json(schedules);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { schedules } = body as { schedules: SchedulePreference[] };

    if (!schedules || !Array.isArray(schedules)) {
      return NextResponse.json(
        { error: 'Préférences de planification requises' },
        { status: 400 }
      );
    }

    const updatedSchedules = updateAllSchedules(schedules);

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
