import { GoogleGenAI, Modality } from "@google/genai";
import { SYSTEM_PROMPT, SUPPORTED_LANGUAGES } from '../constants';
import { AnalysisResult, DealContext } from '../types';

export const generateValueAnalysis = async (query: string, languageCode: string = 'EN'): Promise<AnalysisResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === languageCode);
    const targetLanguage = langObj ? langObj.promptName : 'English';

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', // Using standard flash for speed/reliability
      contents: `Analyze the following scenario: "${query}". 
      
      MANDATORY INSTRUCTIONS:
      1. Every one of the 9 BlackLine Value Drivers in "valueDriverImpacts" must have a detailed, unique "message" and a quantified "metric" (e.g. "$2M savings", "3x velocity"). 
      2. ZERO "N/A" values allowed.
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
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp", // Updated model name for TTS if available, or fallback
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: ["AUDIO"], // Corrected Enum usage
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
