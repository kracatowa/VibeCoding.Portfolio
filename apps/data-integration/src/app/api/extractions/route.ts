import { NextRequest, NextResponse } from 'next/server';
import {
  getAllExtractions,
  createExtraction,
  updateExtraction,
  getExtractionById,
  getSources,
  Source,
} from '@/lib/database';
import { randomInt } from 'crypto';

// Store pour les extractions en cours (pour le SSE)
const runningExtractions = new Map<string, { step: number; status: string }>();

export async function GET() {
  const extractions = getAllExtractions();
  return NextResponse.json(extractions);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceId, destination, template, interval } = body;

    if (!sourceId || !template || !destination || !interval) {
      return NextResponse.json({ error: 'Source, template, destination et interval requis' }, { status: 400 });
    }

    // Créer l'extraction
    const source = getSources().find(s => s.id === sourceId);

    if (!source) {
      return NextResponse.json({ error: 'Source invalide' }, { status: 400 });
    }

    const extraction = createExtraction({
      source,
      status: 'running',
      startedAt: new Date().toISOString(),
      currentStep: 1,
      template,
      destination,
      interval,
    });

    // Démarrer le processus d'extraction en arrière-plan
    processExtraction(extraction.id, source);

    return NextResponse.json(extraction);
  } catch (error) {
    console.error('Erreur lors de la création de l\'extraction:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'extraction' },
      { status: 500 }
    );
  }
}

async function processExtraction(extractionId: string, source: Source) {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    // Étape 1: Appel des APIs
    updateExtraction(extractionId, { currentStep: 1 });
    runningExtractions.set(extractionId, { step: 1, status: 'processing' });

    runningExtractions.set(extractionId, { step: 1, status: 'processed' });
    await delay(500);

    // Étape 2: Nettoyage des données
    updateExtraction(extractionId, { currentStep: 2 });
    runningExtractions.set(extractionId, { step: 2, status: 'processing' });
    await delay(1500);

    // Simuler le nettoyage (suppression des doublons, validation emails, etc.)

    runningExtractions.set(extractionId, { step: 2, status: 'processed' });
    await delay(500);

    // Étape 3: Création du fichier
    updateExtraction(extractionId, { currentStep: 3 });
    runningExtractions.set(extractionId, { step: 3, status: 'processing' });
    await delay(1000);

    const fileName = `${source.name.toLowerCase()}_export_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.csv`;

    runningExtractions.set(extractionId, { step: 3, status: 'processed' });
    await delay(500);

    // Étape 4: Dépôt du fichier
    updateExtraction(extractionId, { currentStep: 4 });
    runningExtractions.set(extractionId, { step: 4, status: 'processing' });
    await delay(1200);

    // Simuler le dépôt (dans un vrai projet, on enverrait à S3, SFTP, etc.

    runningExtractions.set(extractionId, { step: 4, status: 'processed' });
    await delay(500);

    // Finaliser l'extraction
    updateExtraction(extractionId, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      recordsCount: randomInt(1000) + 500,
      fileName,
      currentStep: 4,
    });

    runningExtractions.delete(extractionId);
  } catch (error) {
    console.error('Erreur lors du processus d\'extraction:', error);
    updateExtraction(extractionId, {
      status: 'failed',
      completedAt: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
    runningExtractions.delete(extractionId);
  }
}

// Endpoint pour obtenir le statut d'une extraction spécifique
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }

    const extraction = getExtractionById(id);
    if (!extraction) {
      return NextResponse.json({ error: 'Extraction non trouvée' }, { status: 404 });
    }

    const runningStatus = runningExtractions.get(id);

    return NextResponse.json({
      ...extraction,
      stepStatus: runningStatus || null,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du statut:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du statut' },
      { status: 500 }
    );
  }
}
