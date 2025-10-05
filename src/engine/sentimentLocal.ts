const lex: Record<string, number> = {
  calm: 2,
  grateful: 3,
  peace: 2,
  joy: 3,
  flow: 2,
  tired: -1,
  stressed: -2,
  anxious: -3,
  angry: -3,
  stuck: -2,
};

export function scoreSentiment(text = '') {
  return text
    .toLowerCase()
    .split(/\W+/)
    .reduce((s, w) => s + (lex[w] || 0), 0);
}
