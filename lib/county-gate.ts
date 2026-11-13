// County allow-list gate (env ALLOWED_COUNTIES). Comma-separated "ST:Name"
// entries using Google's administrative_area_level_2 long_name, which matches
// the official Census name (e.g. "FL:Orange County,FL:Hillsborough County").
// The state prefix is required: Orange/Lake/Polk/Marion County exist in many
// states. Empty list (default) → gate off → legacy circle-only behavior.
// Combined with service-area circles as circle OR county.

export function parseAllowedCounties(raw: string): string[] {
  return raw.split(",").map(s => s.trim()).filter(Boolean)
}

export function isInAllowedCounty(state: string | undefined, county: string | undefined, allowedCounties: string[]): boolean {
  if (allowedCounties.length === 0) return false
  const st = (state || "").trim().toUpperCase()
  const co = (county || "").trim().toLowerCase()
  if (!st) return false
  const entries = allowedCounties.map(e => {
    const i = e.indexOf(":")
    return i < 0 ? { st: "", co: e.trim().toLowerCase() } : { st: e.slice(0, i).trim().toUpperCase(), co: e.slice(i + 1).trim().toLowerCase() }
  })
  // Google returned no county → pass if the state is listed (fail-open).
  if (!co) return entries.some(e => e.st === st)
  return entries.some(e => e.st === st && e.co === co)
}
