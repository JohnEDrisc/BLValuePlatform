
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Volume2, Loader2, StopCircle, User, Bot, Sparkles } from 'lucide-react';
import { askAiAssistant, generateAudioOverview } from '../services/geminiService';

interface AiAssistantProps {
  context: string;
  embedded?: boolean; // New prop to control display mode
  isOpenProp?: boolean; // Control visibility from parent in embedded mode
  onCloseProp?: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
  isAudioLoading?: boolean;
}

// Reusing audio decode helper
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ context, embedded = false, isOpenProp, onCloseProp }) => {
  // Internal state for standalone mode
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Derived state based on mode
  const isOpen = embedded ? isOpenProp : internalIsOpen;
  const toggleOpen = () => {
    if (embedded && onCloseProp) onCloseProp();
    else setInternalIsOpen(!internalIsOpen);
  };

  const [showHint, setShowHint] = useState(false); 
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hi! I can help you interpret the data on this screen. What would you like to know?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Audio state
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null);
  const [playingMessageIndex, setPlayingMessageIndex] = useState<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Hint logic - only for standalone mode
  useEffect(() => {
    if (embedded) return;
    const timer = setTimeout(() => {
      if (!isOpen) setShowHint(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [embedded, isOpen]);

  useEffect(() => {
    if (isOpen) setShowHint(false);
  }, [isOpen]);

  // Clean up audio
  useEffect(() => {
    return () => {
      if (audioSource) audioSource.stop();
      if (audioContext) audioContext.close();
    };
  }, [audioSource, audioContext]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg = inputText;
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const answer = await askAiAssistant(context, userMsg);
      setMessages(prev => [...prev, { role: 'assistant', text: answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I encountered an error." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePlayAudio = async (text: string, index: number) => {
    if (audioSource) {
      audioSource.stop();
      setAudioSource(null);
    }
    
    if (playingMessageIndex === index) {
      setPlayingMessageIndex(null);
      return;
    }

    setMessages(prev => prev.map((m, i) => i === index ? { ...m, isAudioLoading: true } : m));

    try {
      const base64Audio = await generateAudioOverview(text);
      if (base64Audio) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
        setAudioContext(ctx);
        const dataInt16 = new Int16Array(decode(base64Audio).buffer);
        const frameCount = dataInt16.length;
        const buffer = ctx.createBuffer(1, frameCount, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < frameCount; i++) {
           channelData[i] = dataInt16[i] / 32768.0;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => setPlayingMessageIndex(null);
        source.start();
        setAudioSource(source);
        setPlayingMessageIndex(index);
      }
    } catch (e) {
      console.error("Audio playback failed", e);
    } finally {
      setMessages(prev => prev.map((m, i) => i === index ? { ...m, isAudioLoading: false } : m));
    }
  };

  // Reusable Message List to avoid duplication errors
  const MessageList = () => (
    <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide">
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          {msg.role === 'assistant' && (
            <div className="w-8 h-8 rounded-full bg-blackline-yellow flex items-center justify-center flex-shrink-0 mt-1">
              <Bot size={16} className="text-black" />
            </div>
          )}
          
          <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-zinc-800 text-white rounded-br-none' : 'bg-black border border-zinc-800 text-gray-200 rounded-bl-none'}`}>
            {msg.text}
            
            {msg.role === 'assistant' && (
              <div className="mt-2 pt-2 border-t border-zinc-800 flex justify-end">
                <button 
                  onClick={() => handlePlayAudio(msg.text, idx)}
                  disabled={msg.isAudioLoading}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-blackline-yellow transition-colors"
                >
                  {msg.isAudioLoading ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : playingMessageIndex === idx ? (
                    <>
                      <StopCircle size={12} className="text-red-500" /> <span className="text-red-500">Stop</span>
                    </>
                  ) : (
                    <>
                      <Volume2 size={12} /> Listen
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blackline-yellow flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-black" />
            </div>
            <div className="bg-black border border-zinc-800 p-3 rounded-xl rounded-bl-none flex gap-1 items-center h-10">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200"></div>
            </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );

  const InputArea = () => (
    <div className="p-3 border-t border-zinc-800 bg-black">
      <div className="flex gap-2">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={embedded ? "Ask a question..." : "Ask..."}
          className="flex-grow bg-zinc-900 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blackline-yellow outline-none"
        />
        <button 
          onClick={handleSend}
          disabled={!inputText.trim() || isTyping}
          className="p-2 bg-blackline-yellow text-black rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );

  if (embedded) {
    if (!isOpen) return null;
    return (
      <div className="flex flex-col h-full bg-zinc-900">
         <MessageList />
         <InputArea />
      </div>
    );
  }

  // Standalone Mode (with FAB)
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end pointer-events-none">
      
      {/* CHAT WINDOW */}
      <div 
        className={`bg-zinc-900 border border-zinc-700 shadow-2xl rounded-2xl w-[350px] md:w-[400px] mb-4 overflow-hidden transition-all duration-300 origin-bottom-right pointer-events-auto
        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none h-0'}`}
      >
        {/* Header */}
        <div className="bg-black/50 p-4 border-b border-zinc-800 flex justify-between items-center backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-bold text-white text-sm">Value Assistant</span>
          </div>
          <button onClick={() => setInternalIsOpen(false)} className="text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="h-[400px] flex flex-col bg-zinc-900/90">
           <MessageList />
        </div>

        <InputArea />
      </div>

      {/* FAB TRIGGER */}
      <div className="relative pointer-events-auto group">
        {/* HINT BUBBLE */}
        <div 
          className={`absolute bottom-full right-0 mb-4 w-48 bg-white text-black p-3 rounded-xl rounded-br-none shadow-xl transform transition-all duration-500 origin-bottom-right
          ${showHint ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2 pointer-events-none'}`}
        >
           <div className="flex items-start gap-2">
              <Sparkles size={16} className="text-blackline-yellow flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold leading-tight">Need insights?</p>
                <p className="text-[10px] text-gray-600 leading-tight mt-1">Ask me about the data on this screen.</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setShowHint(false); }} className="text-gray-400 hover:text-black absolute top-1 right-1">
                <X size={12} />
              </button>
           </div>
        </div>

        <button 
          onClick={toggleOpen}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110
            ${isOpen ? 'bg-zinc-800 text-gray-400' : 'bg-blackline-yellow text-black animate-bounce-slow'}`}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        </button>
      </div>
    </div>
  );
};
