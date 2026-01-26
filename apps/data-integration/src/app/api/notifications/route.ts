import { NextRequest, NextResponse } from 'next/server';
import {
  getAllNotifications,
  createNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearAllNotifications,
} from '@/lib/database';
import { Notification } from './notifications.dto';

// GET /api/notifications - Récupérer toutes les notifications
export async function GET() {
  const notifications = getAllNotifications();
  return NextResponse.json(notifications);
}

// POST /api/notifications - Créer une nouvelle notification
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, extractionId, sourceName } = body;

  if (!type || !extractionId || !sourceName) {
    return NextResponse.json(
      { error: 'Missing required fields: type, extractionId, sourceName' },
      { status: 400 }
    );
  }

  const notification = createNotification({
    type,
    extractionId,
    sourceName,
    timestamp: new Date().toISOString(),
    read: false,
  });

  return NextResponse.json(notification, { status: 201 });
}

// PATCH /api/notifications - Marquer comme lu ou tout marquer comme lu
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, markAllAsRead } = body;

  if (markAllAsRead) {
    markAllNotificationsAsRead();
    return NextResponse.json({ success: true });
  }

  if (!id) {
    return NextResponse.json(
      { error: 'Missing notification id' },
      { status: 400 }
    );
  }

  const updated = markNotificationAsRead(id);
  if (!updated) {
    return NextResponse.json(
      { error: 'Notification not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}

// DELETE /api/notifications - Supprimer toutes les notifications
export async function DELETE() {
  clearAllNotifications();
  return NextResponse.json({ success: true });
}
