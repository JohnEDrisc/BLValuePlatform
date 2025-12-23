import { GoogleGenAI, Modality } from "@google/genai";
import { SYSTEM_PROMPT, SUPPORTED_LANGUAGES } from '../constants';
import { AnalysisResult, DealContext } from '../types';

// Fix: instantiation moved inside functions to ensure the most up-to-date API key is used

export const generateValueAnalysis = async (query: string, languageCode: string = 'EN'): Promise<AnalysisResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === languageCode);
    const targetLanguage = langObj ? langObj.promptName : 'English';

    // Upgraded to gemini-2.0-flash for speed and complex reasoning
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Analyze the following BlackLine product or business scenario: "${query}". 
      
      CRITICAL INSTRUCTION:
      You must output the entire JSON response in ${targetLanguage}.
      The tone must be formal business ${targetLanguage}. 
      Translate all keys' values into ${targetLanguage}.
      
      Do NOT translate the JSON keys themselves.
      
      RETURN STRICT JSON ONLY. The structure must match exactly:
      
      {
        "valueDriverImpacts": {
           "Process Efficiency": {
              "message": "Standard benefit summary...",
              "metric": "e.g., 50% reduction in time",
              "relevance": "High",
              "powerMessage": "A punchy, aggressive one-sentence hook (e.g., 'Stop acting like a data janitor').",
              "objectionHandling": "A specific rebuttal to a common objection for this driver.",
              "competitorDiff": "A 'Kill Point' - why BlackLine beats the competition here."
           },
           ... (repeat for all 9 drivers)
        },
        "kpiHighlights": [...],
        "valueChain": [...],
        "businessScenarios": [...],
        "objectionHandling": [...],
        "talkTrack": "...",
        "discoveryQuestions": [...],
        "cfoPunchline": "...",
        "caoPunchline": "...",
        "cioPunchline": "...",
        "references": ["..."]
      }
      
      Remember to include bracketed citations like [1] in text and list the sources in the "references" array.`,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback mock data
    return {
      valueDriverImpacts: {},
      kpiHighlights: [],
      valueChain: [{ feature: "Error", benefit: "Analysis unavailable", value: "Check configuration" }],
      businessScenarios: [],
      objectionHandling: [],
      talkTrack: "System is currently offline or misconfigured.",
      discoveryQuestions: [],
      cfoPunchline: "Service Unavailable",
      caoPunchline: "Service Unavailable",
      cioPunchline: "Service Unavailable",
      references: []
    };
  }
};

export const generateAudioOverview = async (text: string): Promise<string | undefined> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp", 
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("Audio Generation Error:", error);
    return undefined;
  }
};

export const askAiAssistant = async (context: string, userQuestion: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Context of user screen: ${context}. User Question: ${userQuestion}`,
      config: {
        systemInstruction: "You are a helpful BlackLine assistant embedded in the 'Excellence Quantified' tool. Your answers should be concise (under 50 words unless asked for more), helpful, and directly related to the user's current context in the app. Use a professional but friendly tone.",
      },
    });
    return response.text || "I apologize, I couldn't generate a response.";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm having trouble connecting to the knowledge base right now.";
  }
};

// Function to parse natural language pivot requests
export const parsePivotPrompt = async (prompt: string): Promise<Partial<DealContext> & { problem?: string }> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Extract the organizational context from this user prompt: "${prompt}".
      
      Return a JSON object with these keys (all optional, use null if not found):
      - industry (string, infer standard industry names like Manufacturing, Retail, etc.)
      - companyName (string)
      - annualRevenue (number, convert to integer)
      - persona (string, e.g. CFO, Controller)
      - problem (string, the core business problem mentioned)
      
      Example Input: "Switch to a large retail company with $5B revenue worrying about high turnover"
      Example Output: { "industry": "Retail", "annualRevenue": 5000000000, "problem": "High Turnover", "companyName": null, "persona": null }`,
      config: {
        responseMimeType: "application/json",
      },
    });
    
    if (!response.text) return {};
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Pivot Parsing Error:", error);
    return {};
  }
};
