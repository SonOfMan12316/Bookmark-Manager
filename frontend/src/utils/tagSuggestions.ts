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

const takeTagCandidates = (tokens: string[], limit: number) => {
  const seen = new Set<string>()
  const out: string[] = []

  for (const token of tokens) {
    const t = normalizeToken(token)
    if (t.length < 3) continue
    if (t.length > 20) continue
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

  // Tokens from title/description.
  const textTokens = tokenize(`${titleStr} ${descStr}`)

  // Rank: hostname/path first, then the surrounding text.
  const candidates = [...hostTokens, ...pathTokens, ...textTokens]

  return takeTagCandidates(candidates, 6)
}

