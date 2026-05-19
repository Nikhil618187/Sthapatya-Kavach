export const validationData = [
  {
    id: "gateway-of-india",
    monument: "Gateway of India",
    predicted: "HIGH",
    expected: "HIGH",
    predictedScore: 3,
    expectedScore: 3,
    aligned: true,
    explanation: "High humidity and coastal aerosol deposition correctly captured by the baseline vulnerability indices."
  },
  {
    id: "konark-sun-temple",
    monument: "Konark Sun Temple",
    predicted: "MODERATE",
    expected: "HIGH",
    predictedScore: 2,
    expectedScore: 3,
    aligned: false,
    explanation: "Mismatch. Framework underestimated degradation rate. Missing granular modeling for rapid salt crystallization cycling unique to the regional coastal microclimate."
  },
  {
    id: "shore-temple",
    monument: "Shore Temple",
    predicted: "MODERATE",
    expected: "MODERATE",
    predictedScore: 2,
    expectedScore: 2,
    aligned: true,
    explanation: "Environmental proxy models correctly aligned with physical observation of moderate surface erosion."
  },
  {
    id: "taj-mahal",
    monument: "Taj Mahal",
    predicted: "MODERATE",
    expected: "MODERATE",
    predictedScore: 2,
    expectedScore: 2,
    aligned: true,
    explanation: "Atmospheric pollution metrics accurately shifted the baseline vulnerability from low to moderate."
  },
  {
    id: "qutub-minar",
    monument: "Qutub Minar",
    predicted: "MODERATE",
    expected: "MODERATE",
    predictedScore: 2,
    expectedScore: 2,
    aligned: true,
    explanation: "Thermal stress indicators appropriately reflect the observed localized sandstone micro-fracturing."
  },
  {
    id: "ajanta-caves",
    monument: "Ajanta Caves",
    predicted: "LOW",
    expected: "LOW",
    predictedScore: 1,
    expectedScore: 1,
    aligned: true,
    explanation: "Geological stability and buffering from extreme diurnal shifts accurately registered as low environmental vulnerability."
  },
  {
    id: "hampi",
    monument: "Hampi",
    predicted: "LOW",
    expected: "LOW",
    predictedScore: 1,
    expectedScore: 1,
    aligned: true,
    explanation: "Arid granite baseline metrics correlate with minimal observed environmental structural degradation."
  }
];
