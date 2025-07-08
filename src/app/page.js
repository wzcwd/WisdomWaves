"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-[#F9F7F1] min-h-screen flex flex-col">

      {/* Main Title */}
      <section className="h-130 flex flex-col  justify-center items-center text-center px-4">
      {/* Logo */}
      <header className= "flex flex-row items-center gap-2 pt-12 pb-6">
         <Image src="/logo.svg" alt="WisdomWaves Logo" width={64} height={64} />
        <span className="text-2xl font-semibold text-[#2d3748] font-serif">WisdomWaves</span>
      </header> 
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#232946] leading-tight mb-4 font-serif">
          Your Partner for Academic<br />Research and Innovation
        </h1>
        <p className="font-bold text-lg text-[#4b5563] mb-6 max-w-2xl font-serif">
          WisdomWaves helps you turn ideas into articles, proposals, patents, <br />or thesis-ready documents using a guided, structured process.
        </p>
        <button className="bg-[#232946] text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-[#1a1a2e] transition mb-10 cursor-pointer font-serif"
         onClick={() => router.push('/login')}>
          Get Started →
        </button>
      </section>

      {/* Our Partners */}
      <section className="h-50 bg-[#7fb7bd] py-6 px-4 mt-2">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-xl font-extrabold text-[#ffffff] mb-4 font-sans text-outline-black font-serif justify-center">Our Partners</span>
          <div className="flex flex-wrap justify-center gap-50 items-center">
            <Image src="/hotchkiss.svg" alt="Hotchkiss" width={120} height={0} />
            <Image src="/UCalgary.svg" alt="UCalgary" width={140} height={0} />
            <Image src="/sail.svg" alt="SAIL" width={100} height={0} className="rounded-full" />
          </div>
        </div>
      </section>

      {/* What is WisdomWaves */}
      <section className="h-90 py-12 px-4 text-center bg-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#00296f] font-serif">What Is WisdomWaves?</h2>
        <p className="text-[#00296f] text-xl max-w-3xl mx-auto font-medium font-serif mb-6 font-extrabold">
          <Typewriter
            words={[
              "WisdomWaves is an AI-guided academic research platform that helps you move from an early-stage idea to a fully structured output. Whether you're working on a thesis, proposal, research article, or patent, WisdomWaves guides you step by step through your journey using a structured flow and specialized final-stage modules called 'Gates'."
            ]}
            typeSpeed={45}
            deleteSpeed={10}
            
            loop={false}
          />
        </p>
      </section>

      {/* 4 Waves*/}
      <section className="py-12 px-4 bg-[#F9F7F1] text-center font-serif">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#232946]">Personalized Research Guidance in 4 Waves</h2>
        <p className="mb-8 text-[#4b5563]">Move from idea to output using our guided process—no matter your research experience.</p>
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">

          <div className="bg-[#e0f7fa] rounded-lg shadow p-6 text-left">
            <h3 className="font-semibold text-[#232946]">Wave 1a – Idea Generation</h3>
            <p className="text-[#4b5563]">Brainstorm, refine, and validate your research topic with AI assistance.</p>
          </div>

          <div className="bg-[#fce4ec] rounded-lg shadow p-6 text-left">
            <h3 className="font-semibold text-[#232946]">Wave 1b – Critical Questioning</h3>
            <p className="text-[#4b5563]">Develop key questions, methods, and scientific workflows.</p>
          </div>

          <div className="bg-[#fff3e0] rounded-lg shadow p-6 text-left">
            <h3 className="font-semibold text-[#232946]">Wave 2 – Data Collection</h3>
            <p className="text-[#4b5563]">Collect, analyze, and structure your research data.</p>
          </div>

          <div className="bg-[#ede7f6] rounded-lg shadow p-6 text-left">
            <h3 className="font-semibold text-[#232946]">Wave 3 – Drafting</h3>
            <p className="text-[#4b5563]">Transform your analysis into structured research drafts.</p>
          </div>

        </div>
      </section>

      {/* Explore The Gates */}
      <section className="py-12 px-4 bg-white text-center font-serif ">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#232946] text-center">Explore the Gates</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-[#f1f5f9] rounded-xl p-6 w-60 shadow text-left">
            <div className="text-2xl mb-2">🎓</div>
            <div className="font-bold text-[#232946] mb-1">ThesisGate</div>
            <div className="text-[#4b5563] text-sm">Thesis review and defense preparation support</div>
          </div>
          <div className="bg-[#f1f5f9] rounded-xl p-6 w-60 shadow text-left">
            <div className="text-2xl mb-2">📝</div>
            <div className="font-bold text-[#232946] mb-1">ArticleGate</div>
            <div className="text-[#4b5563] text-sm">Research article drafting and publication guidance</div>
          </div>
          <div className="bg-[#f1f5f9] rounded-xl p-6 w-60 shadow text-left">
            <div className="text-2xl mb-2">📄</div>
            <div className="font-bold text-[#232946] mb-1">ProposalGate</div>
            <div className="text-[#4b5563] text-sm">Grant and project proposal development support</div>
          </div>
          <div className="bg-[#f1f5f9] rounded-xl p-6 w-60 shadow text-left">
            <div className="text-2xl mb-2">🔏</div>
            <div className="font-bold text-[#232946] mb-1">PatentGate</div>
            <div className="text-[#4b5563] text-sm">Patent structure and technical language assistance</div>
          </div>
        </div>
        <p className="mt-8 text-[#232946] max-w-3xl mx-auto text-center">
          Each Gate within WisdomWaves is designed to support a different kind of academic or technical work. Whether you're preparing a thesis, writing an article, developing a proposal, or drafting a patent, WisdomWaves guides you through the process in a way that is tailored to you.
        </p>
      </section>

      {/* Bottom */}
      <section className="py-12 px-4 bg-[#F9F7F1] flex justify-center font-serif">
        <div className="bg-[#b6c6e6] rounded-2xl p-8 w-full max-w-2xl text-center shadow">
          <h3 className="text-2xl font-bold mb-4 text-[#232946]">Ready to Transform Your Research?</h3>
          <p className="mb-6 text-[#232946]">Join researchers and academics who trust WisdomWaves to guide their journey from idea to publication.</p>
          <button
            className="bg-[#232946] text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-[#1a1a2e] transition"
            onClick={() => router.push('/login')}
          >
            Get Started →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F9F7F1] border-t border-[#e5e7eb] py-8 px-4 mt-auto font-serif">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <Image src="/logo.png" alt="WisdomWaves Logo" width={32} height={32} />
              <span className="font-semibold text-[#232946]">WisdomWaves</span>
            </div>
            <p className="text-[#4b5563] text-sm text-center md:text-left">
              AI-powered research platform helping academics and professionals move from ideas to publication-ready outputs.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 text-sm text-[#232946]">
            <div>
              <div className="font-bold mb-1">Product</div>
              <ul>
                <li><a href="#" className="hover:underline">Features</a></li>
                <li><a href="#" className="hover:underline">Pricing</a></li>
                <li><a href="#" className="hover:underline">FAQ</a></li>
              </ul>
            </div>
            <div>
              <div className="font-bold mb-1">Support</div>
              <ul>
                <li><a href="#" className="hover:underline">Contact</a></li>
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-[#9ca3af] mt-6">
          © 2025 WisdomWaves. Trusted by academic institutions and researchers worldwide.
        </div>
      </footer>
    </div>
  );
}
