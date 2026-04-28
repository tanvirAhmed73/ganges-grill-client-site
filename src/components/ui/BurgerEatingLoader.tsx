export default function BurgerEatingLoader() {
  return (
    <div
      className="flex min-h-[46vh] flex-col items-center justify-center gap-4 px-4"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="scene relative h-44 w-80">
        <div className="table absolute bottom-7 left-1/2 h-5 w-64 -translate-x-1/2 rounded-full bg-black/10" />

        <div className="chef absolute left-9 top-6">
          <div className="hat absolute -top-7 left-1/2 h-8 w-16 -translate-x-1/2">
            <div className="absolute left-4 top-0 h-5 w-8 rounded-full bg-white shadow-sm" />
            <div className="absolute left-0 top-2 h-5 w-8 rounded-full bg-white shadow-sm" />
            <div className="absolute right-0 top-2 h-5 w-8 rounded-full bg-white shadow-sm" />
            <div className="absolute bottom-0 left-2 h-3 w-12 rounded-md bg-white" />
          </div>

          <div className="head relative h-16 w-16 rounded-full bg-[#ffd9bf] shadow-sm">
            <div className="hair-back absolute -left-0.5 -top-0.5 h-11 w-17 rounded-t-full bg-[#2f2436]" />
            <div className="hair-side-left absolute -left-2 top-4 h-8 w-4 rounded-l-full bg-[#2f2436]" />
            <div className="hair-side-right absolute -right-2 top-4 h-8 w-4 rounded-r-full bg-[#2f2436]" />
            <div className="eye-left absolute left-4 top-6 h-2 w-2 rounded-full bg-[#2b1f31]" />
            <div className="eye-right absolute right-4 top-6 h-2 w-2 rounded-full bg-[#2b1f31]" />
            <div className="blush absolute left-3 top-8 h-2 w-3 rounded-full bg-pink-300/70" />
            <div className="blush absolute right-3 top-8 h-2 w-3 rounded-full bg-pink-300/70" />
            <div className="jaw absolute left-1/2 top-9 h-4 w-8 -translate-x-1/2 rounded-b-full bg-[#f6ccab]" />
            <div className="mouth absolute left-1/2 top-10 h-1.5 w-5 -translate-x-1/2 rounded-full bg-[#ac4f57]" />
          </div>
          <div className="uniform mt-1 h-10 w-16 rounded-2xl bg-white shadow-sm">
            <div className="mx-auto h-full w-1 rounded-full bg-brand-primary/70" />
          </div>
        </div>

        <div className="arm upper-arm absolute left-[92px] top-[78px] h-3 w-11 rounded-full bg-[#ffd9bf]" />
        <div className="arm fore-arm absolute left-[124px] top-[78px] h-3 w-11 rounded-full bg-[#ffd9bf]" />
        <div className="hand absolute left-[160px] top-[76px] h-7 w-7 rounded-full bg-[#ffd9bf]" />

        <div className="burger absolute left-[174px] top-[64px]">
          <div className="top-bun relative h-4 w-14 overflow-hidden rounded-t-full bg-amber-300 shadow-inner" />
          <div className="h-1.5 w-14 bg-emerald-500" />
          <div className="h-2 w-14 bg-yellow-300" />
          <div className="h-3 w-14 bg-[#6d3a12]" />
          <div className="h-4 w-14 rounded-b-full bg-amber-400" />
        </div>

        <div className="crumb crumb-one absolute left-[166px] top-[67px] h-1.5 w-1.5 rounded-full bg-amber-200" />
        <div className="crumb crumb-two absolute left-[170px] top-[71px] h-1 w-1 rounded-full bg-amber-100" />
        <div className="crumb crumb-three absolute left-[164px] top-[73px] h-1 w-1 rounded-full bg-amber-100" />

        <div className="steam steam-one absolute left-[212px] top-[47px] h-5 w-1 rounded-full bg-white/60" />
        <div className="steam steam-two absolute left-[221px] top-[45px] h-6 w-1 rounded-full bg-white/60" />
        <div className="steam steam-three absolute left-[230px] top-[47px] h-5 w-1 rounded-full bg-white/60" />
      </div>

      <div className="space-y-1 text-center">
        <p className="text-sm font-semibold text-brand-dark">Loading your food feed...</p>
        <p className="text-xs text-brand-muted">Chef is taking a realistic burger bite</p>
      </div>

      <style jsx>{`
        .chef {
          animation: head-nod 1.2s cubic-bezier(0.45, 0.05, 0.2, 1) infinite;
          transform-origin: 80% 65%;
          will-change: transform;
          transform: translateZ(0);
        }

        .jaw {
          animation: jaw-chew 1.2s ease-in-out infinite;
          transform-origin: center top;
          will-change: transform;
          transform: translateZ(0);
        }

        .upper-arm {
          animation: upper-arm-move 1.2s cubic-bezier(0.45, 0.05, 0.2, 1) infinite;
          transform-origin: left center;
          will-change: transform;
          transform: translateZ(0);
        }

        .fore-arm,
        .hand {
          animation: fore-arm-move 1.2s cubic-bezier(0.45, 0.05, 0.2, 1) infinite;
          transform-origin: left center;
          will-change: transform;
          transform: translateZ(0);
        }

        .burger {
          animation: burger-approach 1.2s cubic-bezier(0.45, 0.05, 0.2, 1) infinite;
          transform-origin: left center;
          will-change: transform;
          transform: translateZ(0);
        }

        .top-bun::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(#fef3c7 1.2px, transparent 1.2px);
          background-size: 8px 8px;
          opacity: 0.52;
        }

        .crumb {
          opacity: 0;
        }

        .crumb-one {
          animation: crumb-pop 1.2s ease-out infinite;
          will-change: transform, opacity;
        }

        .crumb-two {
          animation: crumb-pop 1.2s ease-out 0.05s infinite;
          will-change: transform, opacity;
        }

        .crumb-three {
          animation: crumb-pop 1.2s ease-out 0.1s infinite;
          will-change: transform, opacity;
        }

        .steam {
          opacity: 0;
          will-change: transform, opacity;
          transform: translateZ(0);
        }

        .steam-one {
          animation: steam-rise 1.5s ease-out infinite;
        }

        .steam-two {
          animation: steam-rise 1.5s ease-out 0.18s infinite;
        }

        .steam-three {
          animation: steam-rise 1.5s ease-out 0.34s infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .chef,
          .jaw,
          .upper-arm,
          .fore-arm,
          .hand,
          .burger,
          .crumb-one,
          .crumb-two,
          .crumb-three,
          .steam-one,
          .steam-two,
          .steam-three {
            animation: none !important;
          }
        }

        @keyframes head-nod {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          20% {
            transform: translateY(0.5px) rotate(3deg);
          }
          45% {
            transform: translateY(1px) rotate(6deg);
          }
          62% {
            transform: translateY(0.5px) rotate(4deg);
          }
        }

        @keyframes jaw-chew {
          0%,
          100% {
            transform: scaleY(1);
          }
          28% {
            transform: scaleY(0.62);
          }
          42% {
            transform: scaleY(0.82);
          }
          56% {
            transform: scaleY(0.68);
          }
        }

        @keyframes upper-arm-move {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
          }
          32% {
            transform: translateX(6px) rotate(-7deg);
          }
          55% {
            transform: translateX(5px) rotate(-6deg);
          }
        }

        @keyframes fore-arm-move {
          0%,
          100% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          32% {
            transform: translateX(11px) translateY(-2px) rotate(-14deg);
          }
          55% {
            transform: translateX(9px) translateY(-1px) rotate(-12deg);
          }
        }

        @keyframes burger-approach {
          0%,
          100% {
            transform: translateX(0) translateY(0) scale(1);
          }
          32% {
            transform: translateX(-26px) translateY(-4px) scale(0.95);
          }
          44% {
            transform: translateX(-31px) translateY(-5px) scale(0.9);
          }
          58% {
            transform: translateX(-22px) translateY(-2px) scale(0.96);
          }
        }

        @keyframes crumb-pop {
          0%,
          100% {
            opacity: 0;
            transform: translate(0, 0) scale(0.5);
          }
          42% {
            opacity: 0.95;
            transform: translate(-10px, -8px) scale(1);
          }
          58% {
            opacity: 0;
            transform: translate(-16px, -11px) scale(0.6);
          }
        }

        @keyframes steam-rise {
          0% {
            opacity: 0;
            transform: translateY(4px) scaleY(0.9);
          }
          30% {
            opacity: 0.55;
          }
          100% {
            opacity: 0;
            transform: translateY(-10px) scaleY(1.1);
          }
        }
      `}</style>
    </div>
  );
}
