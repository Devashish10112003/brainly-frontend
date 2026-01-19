import { Link } from "react-router-dom";
import heroBg from "../assets/herobg.avif";
import { TypeAnimation } from "react-type-animation";

const BrandMark = () => (
  <div className="flex items-center text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-brain text-indigo-200 mr-3"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
      <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
      <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
      <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
      <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
      <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
    </svg>
    <p className="text-2xl font-semibold">Second Brain</p>
  </div>
);

const Landing = () => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 via-indigo-900/60 to-indigo-950/90" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 lg:px-12">
        <div className="pt-6 flex items-center">
          <BrandMark />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl w-full text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Smart content management, powered by AI
            </h1>
            
            <p className="text-lg md:text-xl text-indigo-100">
            <TypeAnimation sequence={['Capture notes, links, tweets, and videos in one place. Let AI organize, summarize, and surface what matters when you need it.',2000,]}></TypeAnimation>
              
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/login"
                className="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-indigo-900/40 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 border border-indigo-200 text-white rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 focus:ring-offset-indigo-900/40 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

