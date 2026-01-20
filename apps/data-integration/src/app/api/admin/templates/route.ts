import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllTemplateConfigs, 
  createTemplateConfig, 
  deleteTemplateConfig,
  type TemplateConfig 
} from '@/lib/database';

/**
 * GET /api/admin/templates
 * Récupère tous les templates configurés
 */
export async function GET() {
  try {
    const templates = getAllTemplateConfigs();
    return NextResponse.json(templates);
  } catch (error) {
    console.error('Erreur lors de la récupération des templates:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des templates' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/templates
 * Crée un nouveau template
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, sourceId, fields } = body;

    if (!name || !sourceId || !fields || !Array.isArray(fields)) {
      return NextResponse.json(
        { error: 'Nom, sourceId et fields requis' },
        { status: 400 }
      );
    }

    const newTemplate: Omit<TemplateConfig, 'id' | 'createdAt'> = {
      name,
      sourceId,
      fields
    };

    const created = createTemplateConfig(newTemplate);
    return NextResponse.json(created, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la création du template:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du template' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/templates
 * Supprime un template
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID requis' },
        { status: 400 }
      );
    }

    const success = deleteTemplateConfig(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Template non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erreur lors de la suppression du template:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du template' },
      { status: 500 }
    );
  }
}
