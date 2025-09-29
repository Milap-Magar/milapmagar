import Content from "./components/ui/Content";
import Navbar from "./components/ui/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-start justify-between min-h-screen relative">
      <div className="flex-1 bg-[#fd9596] relative z-0">
        {/* Navbar */}
        <Navbar />

        {/* HERO Section */}
        <figure className="flex justify-center h-[90vh] sticky top-0 z-10 pt-16">
          {/* Overlay Text */}
          <div className="absolute top-1/3 text-center z-20">
            <h1 className="text-6xl text-black font-[--font-tangerine] drop-shadow-lg">
              Hie, This is Milap
            </h1>
            <h2 className="text-xl text-gray-800 mt-2 font-[--font-tangerine] drop-shadow">
              A Full-stack developer
            </h2>
          </div>
          <Image
            src="/cat.png"
            alt="Cat Image"
            className="w-full max-w-xl object-contain max-h-[80vh] rounded-2xl"
          />
        </figure>

        {/* Content Section */}
        <Content />
      </div>
    </main>
  );
}
