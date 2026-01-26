import { Destination } from "../destinations/destinations.dto";
import { Source } from "../sources/sources.dto";
import { Template } from "../templates/templates.dto";

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