export interface SuspiciousPhrase {
  phrase: string;
  reason: string;
  severity: "low" | "medium" | "high";
}

export interface Explanation {
  category: string;
  description: string;
  icon: string;
  impact: "positive" | "negative" | "neutral";
}

export interface AnalysisResult {
  trustScore: number;
  classification: "FAKE" | "REAL" | "SUSPICIOUS";
  suspiciousPhrases: SuspiciousPhrase[];
  explanations: Explanation[];
  highlightedText: string;
  reviewLength: number;
  sentimentScore: number;
  confidence: number;
}

export interface AnalyzeRequest {
  review: string;
}
