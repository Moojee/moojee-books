// Hero Section Component

import { useState, useEffect } from "react";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fafaf8] pt-16">
      {/* Decorative floating elements with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Monochrome book shapes with subtle blue/yellow accents */}

        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px),
        repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px)
      `,
          }}
        ></div>

        <div
          className="absolute top-40 right-20 w-32 h-40 bg-yellow-400 opacity-60 rounded-lg -rotate-6  shadow-2xl animate-float-delayed transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -40}px, ${
              mousePosition.y * 40 - scrollY * 0.4
            }px) rotate(${-6 + mousePosition.x * -8}deg)`,
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 opacity-60"></div>
        </div>

        <div
          className="absolute bottom-32 left-1/4 w-28 h-36 bg-gradient-to-br from-red-800 to-rose-700 rounded-lg rotate-6 opacity-80 shadow-2xl animate-float-slow transition-transform duration-300 ease-out border border-gray-300"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${
              mousePosition.y * -35 - scrollY * 0.2
            }px) rotate(${6 + mousePosition.y * 7}deg)`,
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-900 opacity-70"></div>
        </div>

        <div
          className="absolute top-1/3 right-1/4 w-20 h-28 bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg -rotate-12 opacity-80 shadow-2xl animate-float transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${
              mousePosition.y * 25 - scrollY * 0.35
            }px) rotate(${-12 + mousePosition.y * -6}deg)`,
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-950 opacity-60"></div>
        </div>

        {/* Decorative shapes - minimal color accents */}
        <div
          className="absolute top-1/4 left-1/3 w-16 h-20 bg-gradient-to-br from-red-800 to-rose-700  rounded-lg -rotate-12 opacity-80 animate-bounce-slow transition-transform duration-200 ease-out shadow-lg"
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${
              mousePosition.y * 15 - scrollY * 0.25
            }px) scale(${1 + mousePosition.y * 0.1})`,
          }}
        >
          {/* Blue accent dot */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-900 opacity-60"></div>
        </div>

        <div
          className="absolute bottom-1/4 right-1/3 w-12 h-18 bg-gradient-to-br from-yellow-500 to-yellow-400 -rotate-8 rounded-lg opacity-90 animate-spin-slow transition-transform duration-300 ease-out "
          style={{
            transform: `translate(${mousePosition.x * -10}px, ${
              mousePosition.y * -10 - scrollY * 0.3
            }px) rotate(${45 + mousePosition.x * 20}deg)`,
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-600 opacity-60"></div>
         
        </div>

        {/* Subtle background elements */}
        <div className="absolute top-1/2 left-10 w-32 h-32 bg-gray-200 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-20 right-1/3 w-24 h-24 bg-yellow-50 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-300"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          opacity: 1 - scrollY / 500,
        }}
      >
        <div className="mb-8">
          <h1 className="text-6xl md:text-9xl font-black mb-4 leading-none">
            <span
              className="text-6xl md:text-7xl block text-transparent bg-clip-text bg-gradient-to-r from-zinc-400  to-zinc-500 transition-transform duration-300"
              style={{
                transform: `translateX(${mousePosition.x * -10}px)`,
              }}
            >
              ฝังร่างกับ
            </span>
            <span
              className="block bg-clip-text text-gray-700 transition-transform duration-300"
              style={{
                transform: `translateX(${mousePosition.x * 15}px)`,
              }}
            >
              กองหนังสือ
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}

// <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200 pt-16">
//   {/* Decorative floating elements with parallax */}
//   <div className="absolute inset-0 overflow-hidden pointer-events-none">
//     {/* Colorful book shapes */}
//     <div
//       className="absolute top-20 left-10 w-24 h-32 bg-red-400 rounded-lg rotate-12 opacity-80 shadow-2xl animate-float transition-transform duration-300 ease-out"
//       style={{
//         transform: `translate(${mousePosition.x * 30}px, ${
//           mousePosition.y * 30 - scrollY * 0.3
//         }px) rotate(${12 + mousePosition.x * 5}deg)`,
//       }}
//     ></div>
//     <div
//       className="absolute top-40 right-20 w-32 h-40 bg-blue-400 rounded-lg -rotate-6 opacity-80 shadow-2xl animate-float-delayed transition-transform duration-300 ease-out"
//       style={{
//         transform: `translate(${mousePosition.x * -40}px, ${
//           mousePosition.y * 40 - scrollY * 0.4
//         }px) rotate(${-6 + mousePosition.x * -8}deg)`,
//       }}
//     ></div>
//     <div
//       className="absolute bottom-32 left-1/4 w-28 h-36 bg-yellow-400 rounded-lg rotate-6 opacity-80 shadow-2xl animate-float-slow transition-transform duration-300 ease-out"
//       style={{
//         transform: `translate(${mousePosition.x * 25}px, ${
//           mousePosition.y * -35 - scrollY * 0.2
//         }px) rotate(${6 + mousePosition.y * 7}deg)`,
//       }}
//     ></div>
//     <div
//       className="absolute top-1/3 right-1/4 w-20 h-28 bg-green-400 rounded-lg -rotate-12 opacity-80 shadow-2xl animate-float transition-transform duration-300 ease-out"
//       style={{
//         transform: `translate(${mousePosition.x * -20}px, ${
//           mousePosition.y * 25 - scrollY * 0.35
//         }px) rotate(${-12 + mousePosition.y * -6}deg)`,
//       }}
//     ></div>

//     {/* Decorative shapes */}
//     <div
//       className="absolute top-1/4 left-1/3 w-16 h-16 bg-purple-400 rounded-full opacity-60 animate-bounce-slow transition-transform duration-200 ease-out"
//       style={{
//         transform: `translate(${mousePosition.x * 15}px, ${
//           mousePosition.y * 15 - scrollY * 0.25
//         }px) scale(${1 + mousePosition.y * 0.1})`,
//       }}
//     ></div>
//     <div
//       className="absolute bottom-1/4 right-1/3 w-12 h-12 bg-orange-400 rotate-45 opacity-60 animate-spin-slow transition-transform duration-200 ease-out"
//       style={{
//         transform: `translate(${mousePosition.x * -10}px, ${
//           mousePosition.y * -10 - scrollY * 0.3
//         }px) rotate(${45 + mousePosition.x * 20}deg)`,
//       }}
//     ></div>
//   </div>

//   <div
//     className="relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-300"
//     style={{
//       transform: `translateY(${scrollY * 0.5}px)`,
//       opacity: 1 - scrollY / 500,
//     }}
//   >
//     <div className="mb-8">
//       <h1 className="text-7xl md:text-9xl font-black mb-4 leading-none">
//         <span
//           className="block text-black transition-transform duration-300"
//           style={{
//             transform: `translateX(${mousePosition.x * -10}px)`,
//           }}
//         >
//           ฝังร่างกับ
//         </span>
//         <span
//           className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-transform duration-300"
//           style={{
//             transform: `translateX(${mousePosition.x * 15}px)`,
//           }}
//         >
//           กองหนังสือ
//         </span>
//       </h1>
//     </div>

//   </div>
// </section>
