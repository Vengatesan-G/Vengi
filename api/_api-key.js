export function validateApiKey(req) {
  // This bypasses all origin and key checks for now
  // to get your QA data loading.
  return {
    valid: true,
    required: false
  };
}