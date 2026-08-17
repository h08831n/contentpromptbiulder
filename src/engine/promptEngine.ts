import { SEOProject, BrandIdentity, WebsiteProfile, CompiledPromptResult } from '../types';
import { compileMasterSEOPrompt } from './promptCompiler';

export { compileMasterSEOPrompt };

export function buildSeoPrompt(
  project: SEOProject,
  brand?: BrandIdentity,
  website?: WebsiteProfile
): CompiledPromptResult {
  return compileMasterSEOPrompt(project, brand, website);
}
