interface SuggestTagsInput {
  title: string
  description: string
  url: string
}

const STOP_WORDS = new Set([
  'the',
  'and',
  'or',
  'for',
  'with',
  'from',
  'this',
  'that',
  'your',
  'you',
  'are',
  'not',
  'but',
  'into',
  'over',
  'under',
  'about',
  'more',
  'less',
])

const TLD_TOKENS = new Set(['com', 'org', 'net', 'io', 'co', 'app', 'dev', 'edu', 'gov', 'uk', 'us', 'ca'])

const normalizeToken = (token: string) => token.toLowerCase().trim()

const titleCase = (value: string) =>
  value.length ? value[0].toUpperCase() + value.slice(1).toLowerCase() : value

const tokenize = (text: string) =>
  text
    .split(/[^a-z0-9]+/gi)
    .map((t) => t.trim())
    .filter(Boolean)

const isProbablyRealWordToken = (tokenLower: string) => {
  if (!tokenLower) return false
  if (tokenLower.length < 3 || tokenLower.length > 20) return false
  if (!/[a-z]/.test(tokenLower)) return false
  if (!/[aeiou]/.test(tokenLower)) return false
  if (/^(.)\1+$/.test(tokenLower)) return false
  return true
}

const takeTagCandidates = (tokens: string[], limit: number) => {
  const seen = new Set<string>()
  const out: string[] = []

  for (const token of tokens) {
    const t = normalizeToken(token)
    if (!isProbablyRealWordToken(t)) continue
    if (STOP_WORDS.has(t)) continue
    if (TLD_TOKENS.has(t)) continue

    // Avoid duplicates ignoring case.
    if (seen.has(t)) continue
    seen.add(t)

    out.push(titleCase(t))
    if (out.length >= limit) break
  }

  return out
}

export function suggestTags({ title, description, url }: SuggestTagsInput): string[] {
  const urlStr = String(url ?? '').trim()
  const titleStr = String(title ?? '').trim()
  const descStr = String(description ?? '').trim()

  if (!urlStr && !titleStr && !descStr) return []

  // Try to extract tokens from the hostname + path.
  const cleaned = urlStr
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/[?#].*$/, '')

  const [host, ...pathParts] = cleaned.split('/')
  const hostTokens = host ? tokenize(host) : []
  const pathTokens = pathParts.flatMap((p) => tokenize(p))

  const urlTokens = [...hostTokens, ...pathTokens]
  const titleTokens = tokenize(titleStr)
  const descTokens = tokenize(descStr)

  const urlAndTitle = [...urlTokens, ...titleTokens]
  const base = takeTagCandidates(urlAndTitle, 6)
  if (base.length >= 3) return base

  const withDescription = takeTagCandidates([...urlAndTitle, ...descTokens], 6)
  return withDescription
}

