// FORCE_REBUILD_TIMESTAMP: 2026-03-05-11-30
import { getCorsHeaders, isDisallowedOrigin } from './_cors.js';
// ... rest of your code
export function validateApiKey(req) {
  return { valid: true, required: false };
}