'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleNavigation = (path: string) => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <main className="h-screen relative overflow-hidden bg-[url('/images/bcg.png')] bg-cover bg-center bg-no-repeat">
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/5 z-[1]"></div>

      {/* Content Container */}
      <div className="relative z-[3] h-full flex flex-col items-center justify-center">
        {/* Title Section */}
        <div className="text-center pt-20">
          <h1 className="text-[#f5e6d3] font-serif animate-[titleAppear_3s_ease-out_forwards]">
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-3 sm:mb-4 opacity-0 animate-[titleAppear_3s_ease-out_0.3s_forwards]">Welcome to</span>
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-3 sm:mb-4 opacity-0 animate-[titleAppear_3s_ease-out_0.6s_forwards]">the Plant</span>
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl opacity-0 animate-[titleAppear_3s_ease-out_0.9s_forwards]">World</span>
          </h1>
          {/* Tagline */}
          <p className="text-[#f5e6d3]/90 mt-6 max-w-[800px] mx-auto px-4 opacity-0 animate-[titleAppear_3s_ease-out_1.2s_forwards]">
            <span className="text-lg sm:text-xl md:text-2xl font-light">
              Discover the power of AI in plant disease detection. Upload, analyze, and protect your plants with just a click.
            </span>
          </p>
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-[500px] px-4 sm:px-0 gap-4 sm:gap-8 mt-8">
          {/* First Button */}
          <a 
            href="/login"
            onClick={handleNavigation('/login')}
            className="group w-full sm:w-auto opacity-0 animate-[titleAppear_3s_ease-out_1.5s_forwards] cursor-pointer"
          >
            <div className="relative overflow-hidden bg-[#2D5A27] text-[#F7F4EB] rounded-2xl text-center shadow-xl flex items-center justify-center w-full sm:w-[180px] h-[50px] sm:h-[60px] transition-all duration-300 
              hover:scale-110 hover:shadow-[0_0_20px_rgba(54,125,46,0.6)] hover:bg-[#367D2E]
              active:scale-110 active:shadow-[0_0_20px_rgba(54,125,46,0.6)] active:bg-[#367D2E]">
              <span className="absolute transition-all duration-300 
                group-hover:-translate-y-10 group-hover:opacity-0
                group-active:-translate-y-10 group-active:opacity-0
                text-sm sm:text-base">Grow With Us</span>
              <span className="absolute transition-all duration-300 
                group-hover:translate-y-0 group-hover:opacity-100
                group-active:translate-y-0 group-active:opacity-100
                translate-y-10 opacity-0 
                text-sm sm:text-base">Login</span>
            </div>
          </a>

          {/* Second Button */}
          <a 
            href="/signup"
            onClick={handleNavigation('/signup')}
            className="group w-full sm:w-auto opacity-0 animate-[titleAppear_3s_ease-out_1.8s_forwards] cursor-pointer"
          >
            <div className="relative overflow-hidden bg-[#2D5A27] text-[#F7F4EB] rounded-2xl text-center shadow-xl flex items-center justify-center w-full sm:w-[180px] h-[50px] sm:h-[60px] transition-all duration-300 
              hover:scale-110 hover:shadow-[0_0_20px_rgba(54,125,46,0.6)] hover:bg-[#367D2E]
              active:scale-110 active:shadow-[0_0_20px_rgba(54,125,46,0.6)] active:bg-[#367D2E]">
              <span className="absolute transition-all duration-300 
                group-hover:-translate-y-10 group-hover:opacity-0
                group-active:-translate-y-10 group-active:opacity-0
                text-sm sm:text-base">Plant Your Roots</span>
              <span className="absolute transition-all duration-300 
                group-hover:translate-y-0 group-hover:opacity-100
                group-active:translate-y-0 group-active:opacity-100
                translate-y-10 opacity-0 
                text-sm sm:text-base">Signup</span>
            </div>
          </a>
        </div>
      </div>

      {/* Plant Illustration */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="relative">
          {/* Main Plant */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[250px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[250px] md:h-[300px] animate-float">
            <Image
              src="/images/plant-illustration.svg"
              alt="Plant Illustration"
              fill
              priority
              className="object-contain object-bottom"
            />
          </div>
          
          {/* Background Plants */}
          <div className="absolute bottom-0 w-full h-16 sm:h-20 md:h-24 bg-[#1B5E20]" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-30 opacity-0 animate-[titleAppear_3s_ease-out_2.1s_forwards]">
        <div className="animate-bounce-slow">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-80"
          >
            <path 
              d="M12 4L12 20M12 20L6 14M12 20L18 14" 
              stroke="#F7F4EB" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </main>
  );
}
