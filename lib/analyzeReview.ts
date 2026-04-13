import { AnalysisResult, SuspiciousPhrase, Explanation } from "./types";

// ─── Fake Phrase Patterns ────────────────────────────────────────────────────
const FAKE_PHRASES: { pattern: RegExp; reason: string; severity: "low" | "medium" | "high" }[] = [
  { pattern: /\bbest product ever\b/i, reason: "Overly generic superlative", severity: "high" },
  { pattern: /\bhighly recommend\b/i, reason: "Common fake-review filler phrase", severity: "medium" },
  { pattern: /\bmust buy\b/i, reason: "Unwarranted purchase pressure", severity: "medium" },
  { pattern: /\bchanged my life\b/i, reason: "Hyperbolic life-impact claim", severity: "high" },
  { pattern: /\bamazing product\b/i, reason: "Generic superlative without detail", severity: "medium" },
  { pattern: /\bwow\b/i, reason: "Emotional filler without substance", severity: "low" },
  { pattern: /\b5 stars\b/i, reason: "Self-referencing rating in text", severity: "medium" },
  { pattern: /\bperfect\b/i, reason: "Absolute claim with no nuance", severity: "low" },
  { pattern: /\bno complaints\b/i, reason: "Suspiciously zero-flaw review", severity: "medium" },
  { pattern: /\bworks as described\b/i, reason: "Generic template-style phrase", severity: "medium" },
  { pattern: /\bfast delivery\b/i, reason: "Off-topic logistics focus (not product)", severity: "low" },
  { pattern: /\bexceeded (my )?expectations\b/i, reason: "Vague superlative without specifics", severity: "medium" },
  { pattern: /\bvalue for money\b/i, reason: "Marketing cliché language", severity: "low" },
  { pattern: /\bdo not hesitate\b/i, reason: "Pressuring language pattern", severity: "high" },
  { pattern: /\btrust me\b/i, reason: "Social engineering phrase", severity: "high" },
  { pattern: /\blegit\b/i, reason: "Defensive authenticity claim", severity: "medium" },
  { pattern: /\bnot disappointed\b/i, reason: "Double-negative generic praise", severity: "low" },
  { pattern: /\bwould buy again\b/i, reason: "Template closing phrase", severity: "medium" },
  { pattern: /\bgreat quality\b/i, reason: "Unspecified quality claim", severity: "low" },
  { pattern: /\bvery happy\b/i, reason: "Vague positive sentiment filler", severity: "low" },
  { pattern: /\bexcellent\b/i, reason: "Overused empty superlative", severity: "low" },
  { pattern: /\bperfect quality\b/i, reason: "Redundant absolute quality claim", severity: "medium" },
  { pattern: /\bfabulous\b/i, reason: "Emotionally charged non-descriptive word", severity: "low" },
  { pattern: /\bsuper fast\b/i, reason: "Irrelevant shipping-focused praise", severity: "low" },
  { pattern: /\bno regrets\b/i, reason: "Defensive purchase validation phrase", severity: "medium" },
];

// ─── Spam / Bot Patterns ────────────────────────────────────────────────────
const SPAM_PATTERNS: RegExp[] = [
  /(.)\1{4,}/,           // Repeated characters: "aaaaa"
  /!{3,}/,               // Excessive exclamation marks
  /[A-Z]{5,}/,           // ALL CAPS words
  /(\b\w+\b)(\s+\1){2,}/, // Word repeated 3+ times
];

// ─── Legitimate Signals ──────────────────────────────────────────────────────
const REAL_SIGNALS: RegExp[] = [
  /\b(however|but|although|despite|unfortunately)\b/i, // Balanced opinion
  /\b(specifically|particularly|especially)\b/i,         // Specific details
  /\b(compared to|versus|vs\.?)\b/i,                    // Comparative analysis
  /\b(after \d+ (days?|weeks?|months?))\b/i,            // Time-based feedback
  /\b(model|version|serial|sku|variant)\b/i,             // Product-specific reference
  /\b(instruction|manual|setup|install)\b/i,             // Usage details
  /\b(size|weight|dimension|color|material)\b/i,         // Physical attributes
  /\b(broke|stopped working|failed|defective|returned)\b/i, // Problem reporting
];

// ─── Sentiment Analysis ──────────────────────────────────────────────────────
const POSITIVE_WORDS = ["good","great","excellent","amazing","wonderful","love","perfect","best","awesome","fantastic","superb","outstanding","brilliant","happy","pleased","impressive","quality","recommend","satisfied","glad"];
const NEGATIVE_WORDS = ["bad","poor","terrible","awful","horrible","worst","hate","disappointing","useless","broken","defective","poor","waste","refund","returned","stopped","failed","cheap","fragile","misleading"];

function sentimentScore(text: string): number {
  const words = text.toLowerCase().split(/\W+/);
  let score = 0;
  for (const word of words) {
    if (POSITIVE_WORDS.includes(word)) score += 1;
    if (NEGATIVE_WORDS.includes(word)) score -= 1;
  }
  // Normalize to -1 to 1
  return Math.max(-1, Math.min(1, score / 10));
}

// ─── Core Analysis Engine ────────────────────────────────────────────────────
export function analyzeReview(review: string): AnalysisResult {
  const text = review.trim();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  let fakeScore = 0; // Higher = more fake
  const suspiciousPhrases: SuspiciousPhrase[] = [];
  const explanations: Explanation[] = [];

  // ── 1. Check fake phrase patterns ────────────────────────────────────────
  let phraseMatchCount = 0;
  for (const { pattern, reason, severity } of FAKE_PHRASES) {
    const match = text.match(pattern);
    if (match) {
      phraseMatchCount++;
      const weight = severity === "high" ? 15 : severity === "medium" ? 8 : 4;
      fakeScore += weight;
      suspiciousPhrases.push({ phrase: match[0], reason, severity });
    }
  }

  if (phraseMatchCount > 0) {
    explanations.push({
      category: "Suspicious Language Patterns",
      description: `Found ${phraseMatchCount} generic marketing phrase${phraseMatchCount > 1 ? "s" : ""} commonly used in fake reviews.`,
      icon: "🔍",
      impact: "negative",
    });
  }

  // ── 2. Spam patterns ────────────────────────────────────────────────────
  let spamHits = 0;
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(text)) spamHits++;
  }
  if (spamHits > 0) {
    fakeScore += spamHits * 10;
    explanations.push({
      category: "Bot-like Formatting",
      description: `Detected ${spamHits} spam pattern${spamHits > 1 ? "s" : ""}: excessive caps, repeated characters, or exclamations.`,
      icon: "🤖",
      impact: "negative",
    });
  }

  // ── 3. Review length analysis ────────────────────────────────────────────
  if (wordCount < 15) {
    fakeScore += 20;
    explanations.push({
      category: "Extremely Short Review",
      description: `Review is only ${wordCount} words. Authentic reviews typically contain more detail (30+ words).`,
      icon: "📏",
      impact: "negative",
    });
  } else if (wordCount >= 15 && wordCount < 30) {
    fakeScore += 8;
    explanations.push({
      category: "Brief Review",
      description: `Review is ${wordCount} words — on the shorter side. Genuine reviews tend to be more descriptive.`,
      icon: "📝",
      impact: "negative",
    });
  } else if (wordCount >= 80) {
    fakeScore -= 10;
    explanations.push({
      category: "Detailed Review",
      description: `Review contains ${wordCount} words — detailed reviews are a positive authenticity signal.`,
      icon: "✅",
      impact: "positive",
    });
  }

  // ── 4. Sentiment extremity ────────────────────────────────────────────────
  const sentiment = sentimentScore(text);
  const sentimentExtremity = Math.abs(sentiment);

  if (sentimentExtremity > 0.8) {
    fakeScore += 15;
    explanations.push({
      category: "Extreme Sentiment",
      description: `Review shows unusually ${sentiment > 0 ? "positive" : "negative"} sentiment with no balanced perspective.`,
      icon: "⚡",
      impact: "negative",
    });
  } else if (sentimentExtremity < 0.3 && wordCount > 20) {
    fakeScore -= 8;
    explanations.push({
      category: "Balanced Sentiment",
      description: "Review expresses a balanced perspective — a strong authenticity signal.",
      icon: "⚖️",
      impact: "positive",
    });
  }

  // ── 5. Real signals ───────────────────────────────────────────────────────
  let realSignalCount = 0;
  for (const pattern of REAL_SIGNALS) {
    if (pattern.test(text)) realSignalCount++;
  }
  if (realSignalCount > 0) {
    fakeScore -= realSignalCount * 12;
    explanations.push({
      category: "Authentic Detail Signals",
      description: `Found ${realSignalCount} specific detail${realSignalCount > 1 ? "s" : ""} (comparisons, time-based feedback, product specifics).`,
      icon: "🏆",
      impact: "positive",
    });
  }

  // ── 6. Sentence quality ───────────────────────────────────────────────────
  const avgSentenceLength = wordCount / Math.max(sentences.length, 1);
  if (avgSentenceLength < 4 && sentences.length > 2) {
    fakeScore += 10;
    explanations.push({
      category: "Fragmented Writing Style",
      description: "Very short, choppy sentences often indicate automated or template-based content.",
      icon: "✂️",
      impact: "negative",
    });
  }

  // ── 7. Over-punctuation ───────────────────────────────────────────────────
  const exclamations = (text.match(/!/g) || []).length;
  if (exclamations >= 3) {
    fakeScore += exclamations * 3;
    explanations.push({
      category: "Excessive Punctuation",
      description: `${exclamations} exclamation marks detected. Over-enthusiasm is a common fake-review trait.`,
      icon: "❗",
      impact: "negative",
    });
  }

  // ── 8. Repetition check ───────────────────────────────────────────────────
  const wordFreq: Record<string, number> = {};
  for (const word of text.toLowerCase().split(/\W+/).filter((w) => w.length > 4)) {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  }
  const maxRepeat = Math.max(...Object.values(wordFreq), 0);
  if (maxRepeat >= 4) {
    fakeScore += 12;
    explanations.push({
      category: "Word Repetition",
      description: `A single word appears ${maxRepeat} times — repetitive phrasing is a red flag for automated content.`,
      icon: "🔄",
      impact: "negative",
    });
  }

  // ── Final score calculation ────────────────────────────────────────────────
  const clampedFakeScore = Math.max(0, Math.min(100, fakeScore));
  const trustScore = Math.max(0, Math.min(100, Math.round(100 - clampedFakeScore)));

  let classification: "FAKE" | "REAL" | "SUSPICIOUS";
  let confidence: number;

  if (trustScore >= 65) {
    classification = "REAL";
    confidence = Math.round(60 + (trustScore - 65) * 1.1);
  } else if (trustScore >= 35) {
    classification = "SUSPICIOUS";
    confidence = Math.round(50 + Math.abs(trustScore - 50));
  } else {
    classification = "FAKE";
    confidence = Math.round(60 + (35 - trustScore) * 1.3);
  }
  confidence = Math.min(99, confidence);

  // ── Highlight suspicious phrases in text ─────────────────────────────────
  let highlightedText = text;
  for (const { phrase } of suspiciousPhrases) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    highlightedText = highlightedText.replace(
      new RegExp(escaped, "gi"),
      `__HIGHLIGHT__${phrase}__END__`
    );
  }

  return {
    trustScore,
    classification,
    suspiciousPhrases,
    explanations,
    highlightedText,
    reviewLength: wordCount,
    sentimentScore: Math.round(sentiment * 100),
    confidence,
  };
}
