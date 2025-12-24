import { GoogleGenAI, Modality } from "@google/genai";
import { SYSTEM_PROMPT, SUPPORTED_LANGUAGES } from '../constants';
import { AnalysisResult, DealContext } from '../types';

export const generateValueAnalysis = async (query: string, languageCode: string = 'EN'): Promise<AnalysisResult> => {
  try {
    // UPDATED: Using Vite environment variable
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === languageCode);
    const targetLanguage = langObj ? langObj.promptName : 'English';

    // Using gemini-3-pro-preview for maximum reasoning capability
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze the following scenario: "${query}". 
      
      MANDATORY INSTRUCTIONS:
      1. Every one of the 9 BlackLine Value Drivers in "valueDriverImpacts" must have a detailed, unique "message" and a quantified "metric" (e.g. "$2M savings", "3x velocity"). 
      2. ZERO "N/A" values allowed. If a product doesn't directly impact a driver, explain the secondary strategic benefit.
      3. Provide a high-density "valueChain" with 5+ items.
      4. "talkTrack" must be at least 250 words of persuasive executive narrative.
      
      Respond in ${targetLanguage}. Keep JSON keys in English.`,
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
    return {
      valueDriverImpacts: {},
      kpiHighlights: [],
      valueChain: [],
      businessScenarios: [],
      objectionHandling: [],
      talkTrack: "Service temporarily unavailable. Please try a different query.",
      discoveryQuestions: [],
      cfoPunchline: "Strategic Analysis Failed",
      caoPunchline: "System Error",
      cioPunchline: "Platform Connectivity Issue",
      references: []
    };
  }
};

export const generateAudioOverview = async (text: string): Promise<string | undefined> => {
  try {
    // UPDATED: Using Vite environment variable
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
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
    // UPDATED: Using Vite environment variable
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context of user screen: ${context}. User Question: ${userQuestion}`,
      config: {
        systemInstruction: "You are a helpful BlackLine assistant. Concise, professional answers under 50 words.",
      },
    });
    return response.text || "I apologize, I couldn't generate a response.";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm having trouble connecting to the knowledge base.";
  }
};

export const parsePivotPrompt = async (prompt: string): Promise<Partial<DealContext> & { problem?: string }> => {
  try {
    // UPDATED: Using Vite environment variable
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Extract context from: "${prompt}". Return JSON with industry, companyName, annualRevenue, persona, problem.`,
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
