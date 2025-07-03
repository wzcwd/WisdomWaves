"use client";
import Image from "next/image";

export default function Workspace() {
  return (
   
    <main className=" flex flex-1 flex-row p-4 gap-4 ">
      {/* Left Panel: Chat Area */}
      <div className="bg-[#b6c6e6] rounded-2xl p-6 flex flex-1 flex-col w-[400px] min-w-[340px] max-w-[440px] ">
        {/* Chat/Dataset */}
        <div className="flex flex-row gap-4 mb-4">
          {/* Chat List */}
          <div className="flex-1 bg-white rounded-lg p-2 flex flex-col h-[180px]">
            <div className="font-bold underline mb-2 cursor-pointer">Chats</div>
            <div className="flex-1 overflow-y-auto">
              <div>Chat 1</div>
              <div>Chat 2</div>
              <div>Chat 3</div>
            </div>
          </div>
          {/* Synthetic Datasets */}
          <div className="flex-1 bg-white rounded-lg p-2 flex flex-col h-[180px]">
            <div className="font-bold underline mb-2 cursor-pointer">Synthetic Datasets</div>
            <div className="flex-1 overflow-y-auto">
              <div>DS 1</div>
              <div>DS 2</div>
              <div>DS 3</div>
            </div>
          </div>
        </div>
        {/* Chat Input Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="bg-white rounded-xl flex-1 p-4 mb-2 flex flex-col min-h-0">
            <div className="font-bold mb-2">Ask anything</div>
            {/* Chat content area can add overflow-y-auto */}
          </div>
          <div className="flex items-center mt-2">
            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2 text-xl">+</button>
            <input className="flex-1 rounded-full px-4 py-2 border border-gray-300" placeholder="Type a message..." />
            <button className="ml-2 text-2xl">🎤</button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col flex-1 min-w-[400px]  gap-4 min-h-0">
        <div className="flex flex-row gap-4 mb-4">
          {/* Current Stage */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[120px] flex-1">
            <div className="font-bold mb-2">Current Stage</div>
            <div className="flex flex-row gap-4">
              <StageBox title="Wave 1a – Idea Generation" desc="Brainstorm, refine, and validate your research topic" />
              <StageBox title="Wave 1b – Critical Questioning" desc="Organize critical questions, methods, and scientific context" />
              <StageBox title="Wave 2 – Data Collection" desc="Upload existing data or simulate with synthetic/clinical datasets" />
              <StageBox title="Wave 3 – Drafting" desc="Transform your insights into structured research drafts" />
            </div>
          </div>
          {/* Agent in use */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[80px] min-w-[220px] items-center">
            <div className="font-bold mb-2">Agent in use</div>
            <div className="bg-[#e9f0fa] rounded-lg p-3 w-full text-center">
              <div className="font-semibold">ArticleGate</div>
              <div className="text-xs text-gray-500">Research article drafting and publication guidance</div>
            </div>
          </div>
        </div>
        {/* Output Area */}
        <div className="bg-[#c2bdb6] rounded-2xl p-6 flex-1 flex flex-col min-h-0">
          <div className="font-bold text-2xl mb-4">Title of Output</div>
          <div className="flex-1 overflow-y-auto pr-2">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec leo id felis pharetra consequat vitae et nisi. Aliquam nibh velit, gravida et est sed, pulvinar fringilla ligula. ...
            </p>
            {/* Here you can dynamically render thesis/article/patent content */}
          </div>
        </div>
      </div>
    </main>
  );
}

// Stage box component
function StageBox({ title, desc }) {
  return (
    <div className="flex flex-col items-start bg-[#f8fafc] rounded-lg p-2 min-w-[160px]">
      <div className="text-xs font-bold mb-1">{title}</div>
      <div className="text-xs text-gray-500">{desc}</div>
    </div>
  );
} 