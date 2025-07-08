"use client";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Workspace() {
  // Chat-related state
  const [messages, setMessages] = useState([
    { role: "assistant", summary: "Hi! How can I help you turn your idea into content magic?", content: "Hi! How can I help you turn your idea into content magic?" },
  ]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef();
  const mainContentRef = useRef();

  // Send message
  const handleSend = async (fileTextOverride) => {
    if ((!input && !image && !fileTextOverride) || loading) return;
    setError("");
    let fileText = fileTextOverride || (image && image.text ? `\n\n[Content]\n${image.text}` : '');
    const newMessages = [...messages, { role: "user", content: (input ? input : "") + fileText, image }];
    setMessages(newMessages);
    setInput("");
    setImage(null);
    setLoading(true);
    try {

      const payload = newMessages.map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "AI error");
      // AI reply: summary and content
      setMessages([...newMessages, { role: "assistant", summary: data.summary, content: data.content }]);

      setTimeout(() => { mainContentRef.current?.scrollTo?.(0, 0); }, 100);
    } catch (e) {
      setError(e.message || "AI error");
    } finally {
      setLoading(false);
    }
  };

  // Handle file upload (PDF only, upload to server for parsing, auto-send to AI)
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type === 'application/pdf') {
      // go to server side to parse
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/parsepdf', {
        method: 'POST',
        body: formData,
      });
      let data;
      try {
        data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Unknown server error');
      } catch (err) {
        alert('PDF parse failed: ' + (err.message || 'Unexpected error'));
        return;
      }
      const pdfText = data.text;
      setImage({ url: '', name: file.name, type: file.type, text: pdfText });
      // Automatically send to AI
      await handleSend(pdfText);
    } else {
      alert('Only PDF files are supported');
    }
  };

  // Display only the last AI content
  const lastAIContent = [...messages].reverse().find(m => m.role === "assistant" && m.content)?.content;

  return (
    <main className="flex h-screen flex-row bg-[#F9F7F1] font-sans">
      {/* Sidebar: chatbox */}
      <aside className="flex flex-col w-[380px] min-w-[260px] max-w-[420px] bg-[#fafafa] border-r border-[#f0f0f0] ">
        {/* top logo and title */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-[#4b5563] tracking-tight">Thesis Gate</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#ececec] transition"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M4 12h16M10 6l-6 6 6 6" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#ececec] transition"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#4b5563" strokeWidth="2"/><path d="M8 8h8v8H8z" fill="#b6c6e6"/></svg></button>
          </div>
        </div>
      {/* Chat history */}
        <div className="flex-1 overflow-y-auto px-6 py-2 flex flex-col gap-4 ">
          {messages.filter(m => m.role !== "assistant" || m.summary).map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-base whitespace-pre-line ${msg.role === "user" ? "bg-[#e9f0fa] text-[#232946]" : "bg-white text-[#232946] border border-[#f0f0f0]"}`}>
                {msg.role === "assistant" && msg.summary ? msg.summary : msg.content}
                {msg.image}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start"><div className="max-w-[80%] rounded-2xl px-4 py-2 text-base bg-white text-[#b6c6e6] border border-[#f0f0f0] animate-pulse">AI Generating...</div></div>
          )}
          {error && (
            <div className="text-red-500 text-xs mt-2">{error}</div>
          )}
        </div>
        {/* Bottom input and model selection area */}
        <div className="px-0 pb-6 pt-2">
          {/* Model selection area */}
          <div className="flex items-center gap-2 px-6 pb-2">
            <span className="flex items-center gap-1 text-[#4b5563] text-base font-medium"><svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#b6c6e6"/><text x="7" y="16" fontSize="7" fill="#232946">🧠</text></svg>GPT 4o-mini</span>
          </div>
          {/* Input area */}
          <div className="px-2">
            <div className="flex items-end bg-white rounded-2xl shadow border border-[#ececec] px-4 py-3 gap-2">
              <button
                className="w-8 h-8 flex items-center justify-center bg-[#e9f0fa] rounded-full text-xl hover:bg-[#b6c6e6] transition border border-[#e9f0fa]"
                onClick={() => fileInputRef.current.click()}
                title="Upload the file"
                disabled={loading}
              >
                <span role="img" aria-label="upload">＋</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,.pdf"
                className="hidden"
                onChange={handleImageChange}
                disabled={loading}
              />
              <input
                className="flex-1 bg-transparent outline-none border-none text-black px-2 py-1"
                placeholder="Your Idea, Your Content: "
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleSend(); } }}
                disabled={loading}
              />
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#b6c6e6] hover:bg-[#232946] transition"
                onClick={() => handleSend()}
                disabled={(!input && !image) || loading}
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M2 21l21-9-21-9v7l15 2-15 2v7z" fill={(!input && !image || loading) ? '#b6c6e6' : '#fff'} /></svg>
              </button>
            </div>
            {image && (
              <div className="flex items-center gap-2 mt-2 px-2">
                <div className="flex flex-col text-xs text-[#232946] bg-[#f8fafc] rounded px-2 py-1 border max-w-[200px] overflow-x-auto">
                  <span>{image.name}</span>
                  <span className="text-gray-500">{image.type}</span>
                  {image.text && <span className="text-gray-400 mt-1 max-h-16 overflow-y-auto">{image.text.slice(0, 200)}{image.text.length > 200 ? '...' : ''}</span>}
                </div>
                <button className="text-xs text-red-500 underline" onClick={() => setImage(null)}>Remove file</button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 px-12 py-10 bg-[#F9F7F1] overflow-y-auto" ref={mainContentRef}>
        <div className="max-w-3xl mx-auto">
          {lastAIContent ? (
            <div className="prose prose-lg max-w-none text-[#232946] bg-white rounded-2xl shadow p-8">
              <ReactMarkdown>{lastAIContent}</ReactMarkdown>
            </div>
          ) : (
            <div className="text-[#b6c6e6] text-xl text-center mt-24">AI responses will appear here</div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="w-[370px] min-w-[300px] max-w-[400px] bg-white border-l border-[#e5e7eb] px-6 py-6 shadow-lg flex flex-col overflow-y-auto">
        <div className="text-lg font-bold text-[#232946] mb-4">Current Stage</div>
        <div className="flex-0.2overflow-y-auto flex flex-col gap-4">
          <div className="bg-[#f8fafc] rounded-xl p-4 shadow flex flex-col gap-1">
            <div className="text-[#232946] font-semibold text-base mb-1">Wave 1a - Idea Generation</div>
            <div className="text-xs text-gray-500 mb-1">Wave 1b - Critical Questioning</div>
            <div className="text-gray-500 text-xs line-clamp-3">Wave 2 - Data Collection</div>
          </div>
        </div>
        <div className="text-lg font-bold text-[#232946] mb-6 mt-4">Agent in Use</div>
        <div className="flex-0.2overflow-y-auto flex flex-col gap-4">
          <div className="bg-[#f8fafc] rounded-xl p-4 shadow flex flex-col gap-1">
            <div className="text-[#232946] font-semibold text-base mb-1">Thesis Gate</div>
            <div className="text-xs text-gray-500 mb-1">Thesis review and defense preparation support</div>
          </div>
        </div>
      </aside>
    </main>
  );
}