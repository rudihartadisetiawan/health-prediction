"use client";

import React from "react";

interface DiabetesAnimationProps {
  width?: string | number;
  height?: string | number;
}

export default function DiabetesAnimation({
  width = "100%",
  height = "100%",
}: DiabetesAnimationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Glow filters */}
        <filter id="glowBlue" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowSoft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradients */}
        <radialGradient id="cellBlue" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="60%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </radialGradient>
        <radialGradient id="cellCyan" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#A5F3FC" />
          <stop offset="60%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0E7490" />
        </radialGradient>
        <radialGradient id="cellWhite" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#DBEAFE" />
          <stop offset="100%" stopColor="#93C5FD" />
        </radialGradient>
        <radialGradient id="atomGrad" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#67E8F9" />
        </radialGradient>

        <style>{`
          /* ── Sel darah merah — masing-masing bergerak sendiri ── */
          .c1  { animation: f1  5.2s ease-in-out infinite alternate; }
          .c2  { animation: f2  6.8s ease-in-out infinite alternate; }
          .c3  { animation: f3  4.5s ease-in-out infinite alternate; }
          .c4  { animation: f4  7.3s ease-in-out infinite alternate; }
          .c5  { animation: f5  5.9s ease-in-out infinite alternate; }
          .c6  { animation: f6  8.1s ease-in-out infinite alternate; }
          .c7  { animation: f7  4.9s ease-in-out infinite alternate; }
          .c8  { animation: f8  6.3s ease-in-out infinite alternate; }

          @keyframes f1  { 0%{transform:translate(0,0) rotate(0deg)}   100%{transform:translate(10px,-18px) rotate(15deg)} }
          @keyframes f2  { 0%{transform:translate(0,0) rotate(0deg)}   100%{transform:translate(-14px,14px) rotate(-20deg)} }
          @keyframes f3  { 0%{transform:translate(0,0) rotate(5deg)}   100%{transform:translate(16px,14px) rotate(-10deg)} }
          @keyframes f4  { 0%{transform:translate(0,0) rotate(-5deg)}  100%{transform:translate(-12px,-16px) rotate(12deg)} }
          @keyframes f5  { 0%{transform:translate(0,0) rotate(0deg)}   100%{transform:translate(14px,20px) rotate(22deg)} }
          @keyframes f6  { 0%{transform:translate(0,0) rotate(10deg)}  100%{transform:translate(-18px,8px) rotate(-15deg)} }
          @keyframes f7  { 0%{transform:translate(0,0) rotate(-8deg)}  100%{transform:translate(8px,-22px) rotate(8deg)} }
          @keyframes f8  { 0%{transform:translate(0,0) rotate(0deg)}   100%{transform:translate(-8px,18px) rotate(-22deg)} }

          /* ── Sel darah putih ── */
          .w1 { animation: w1 9s ease-in-out infinite alternate; }
          .w2 { animation: w2 11s ease-in-out infinite alternate; }

          @keyframes w1 { 0%{transform:translate(0,0) scale(1)}   100%{transform:translate(12px,-14px) scale(1.06)} }
          @keyframes w2 { 0%{transform:translate(0,0) scale(1)}   100%{transform:translate(-10px,12px) scale(0.94)} }

          /* ── Molekul utama — berputar ── */
          .mol-main {
            animation: molMain 18s linear infinite;
            transform-origin: 250px 200px;
          }
          @keyframes molMain {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }

          /* Atom-atom berdenyut berurutan */
          .atom1 { animation: atomP 2.1s ease-in-out infinite 0.0s; }
          .atom2 { animation: atomP 2.1s ease-in-out infinite 0.35s; }
          .atom3 { animation: atomP 2.1s ease-in-out infinite 0.7s; }
          .atom4 { animation: atomP 2.1s ease-in-out infinite 1.05s; }
          .atom5 { animation: atomP 2.1s ease-in-out infinite 1.4s; }
          .atom6 { animation: atomP 2.1s ease-in-out infinite 1.75s; }
          @keyframes atomP {
            0%,100% { opacity: 0.7; }
            50%      { opacity: 1; filter: url(#glowBlue); }
          }

          /* Bond berkedip berurutan */
          .bond1 { animation: bondF 3s ease-in-out infinite 0.0s; }
          .bond2 { animation: bondF 3s ease-in-out infinite 0.5s; }
          .bond3 { animation: bondF 3s ease-in-out infinite 1.0s; }
          .bond4 { animation: bondF 3s ease-in-out infinite 1.5s; }
          .bond5 { animation: bondF 3s ease-in-out infinite 2.0s; }
          .bond6 { animation: bondF 3s ease-in-out infinite 2.5s; }
          @keyframes bondF {
            0%,100% { stroke-opacity: 0.4; stroke-width: 2.5; }
            50%      { stroke-opacity: 1;   stroke-width: 4; }
          }

          /* Molekul kecil berputar bebas */
          .mol-sm1 {
            animation: rotSm1 7s linear infinite;
            transform-origin: 100px 130px;
          }
          .mol-sm2 {
            animation: rotSm2 10s linear infinite;
            transform-origin: 400px 340px;
          }
          @keyframes rotSm1 { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes rotSm2 { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }

          /* Partikel berkedip random */
          .p1  { animation: blink 2.3s ease-in-out infinite 0.0s; }
          .p2  { animation: blink 3.1s ease-in-out infinite 0.4s; }
          .p3  { animation: blink 2.7s ease-in-out infinite 0.8s; }
          .p4  { animation: blink 3.5s ease-in-out infinite 1.2s; }
          .p5  { animation: blink 2.1s ease-in-out infinite 1.6s; }
          .p6  { animation: blink 4.0s ease-in-out infinite 0.2s; }
          .p7  { animation: blink 2.8s ease-in-out infinite 0.9s; }
          .p8  { animation: blink 3.3s ease-in-out infinite 1.4s; }
          @keyframes blink {
            0%,100% { opacity: 0; transform: scale(0.5); }
            50%      { opacity: 0.9; transform: scale(1.3); }
          }

          /* Gelombang aliran background */
          .wave {
            fill: none;
            stroke: #1E3A5F;
            stroke-width: 35;
            stroke-opacity: 0.35;
            animation: wavePulse 5s ease-in-out infinite alternate;
          }
          @keyframes wavePulse {
            0%   { stroke-opacity: 0.15; stroke-width: 30; }
            100% { stroke-opacity: 0.45; stroke-width: 45; }
          }

          /* Accessibility */
          @media (prefers-reduced-motion: reduce) {
            * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
          }
        `}</style>
      </defs>

      {/* Gelombang aliran background */}
      <path className="wave" d="M-20,250 Q125,150 250,250 Q375,350 520,250" />
      <path className="wave" d="M-20,280 Q125,185 250,280 Q375,375 520,280"
        style={{ strokeOpacity: 0.18, animationDelay: "1s" }} />

      {/* ── SEL DARAH MERAH (oval) — masing-masing bergerak sendiri ── */}
      <ellipse cx="60"  cy="80"  rx="28" ry="16" fill="url(#cellBlue)" className="c1" style={{ transformOrigin: "60px 80px" }} />
      <ellipse cx="170" cy="50"  rx="22" ry="12" fill="url(#cellCyan)" className="c2" style={{ transformOrigin: "170px 50px" }} />
      <ellipse cx="55"  cy="190" rx="25" ry="14" fill="url(#cellBlue)" className="c3" style={{ transformOrigin: "55px 190px" }} />
      <ellipse cx="440" cy="65"  rx="27" ry="15" fill="url(#cellCyan)" className="c4" style={{ transformOrigin: "440px 65px" }} />
      <ellipse cx="460" cy="170" rx="30" ry="17" fill="url(#cellBlue)" className="c5" style={{ transformOrigin: "460px 170px" }} />
      <ellipse cx="75"  cy="390" rx="29" ry="16" fill="url(#cellCyan)" className="c6" style={{ transformOrigin: "75px 390px" }} />
      <ellipse cx="430" cy="400" rx="32" ry="18" fill="url(#cellBlue)" className="c7" style={{ transformOrigin: "430px 400px" }} />
      <ellipse cx="200" cy="450" rx="24" ry="13" fill="url(#cellCyan)" className="c8" style={{ transformOrigin: "200px 450px" }} />

      {/* ── SEL DARAH PUTIH (lingkaran besar berbercak) ── */}
      <g className="w1" style={{ transformOrigin: "115px 300px" }}>
        <circle cx="115" cy="300" r="26" fill="url(#cellWhite)" filter="url(#glowSoft)" />
        <circle cx="108" cy="294" r="6"  fill="#BFDBFE" opacity="0.6" />
        <circle cx="122" cy="307" r="4"  fill="#93C5FD" opacity="0.5" />
        <circle cx="112" cy="310" r="3"  fill="#BFDBFE" opacity="0.4" />
      </g>
      <g className="w2" style={{ transformOrigin: "390px 120px" }}>
        <circle cx="390" cy="120" r="24" fill="url(#cellWhite)" filter="url(#glowSoft)" />
        <circle cx="384" cy="115" r="5"  fill="#BFDBFE" opacity="0.6" />
        <circle cx="396" cy="126" r="4"  fill="#93C5FD" opacity="0.5" />
      </g>

      {/* ── MOLEKUL KECIL 1 (kiri atas) ── */}
      <g className="mol-sm1">
        <line x1="100" y1="103" x2="100" y2="130" stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="77"  y1="116" x2="100" y2="130" stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="123" y1="116" x2="100" y2="130" stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="100" cy="100" r="8" fill="url(#atomGrad)" filter="url(#glowSoft)" />
        <circle cx="74"  cy="116" r="8" fill="url(#atomGrad)" filter="url(#glowSoft)" />
        <circle cx="126" cy="116" r="8" fill="url(#atomGrad)" filter="url(#glowSoft)" />
      </g>

      {/* ── MOLEKUL KECIL 2 (kanan bawah) ── */}
      <g className="mol-sm2">
        <line x1="400" y1="315" x2="400" y2="340" stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="378" y1="328" x2="400" y2="340" stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="422" y1="328" x2="400" y2="340" stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="400" cy="312" r="7" fill="url(#atomGrad)" filter="url(#glowSoft)" />
        <circle cx="376" cy="327" r="7" fill="url(#atomGrad)" filter="url(#glowSoft)" />
        <circle cx="424" cy="327" r="7" fill="url(#atomGrad)" filter="url(#glowSoft)" />
      </g>

      {/* ── MOLEKUL UTAMA HEKSAGONAL (tengah) — berputar ── */}
      <g className="mol-main" filter="url(#glowBlue)">
        {/* Bonds */}
        <line x1="215" y1="168" x2="250" y2="148" stroke="#67E8F9" strokeWidth="3" strokeLinecap="round" className="bond1" />
        <line x1="250" y1="148" x2="285" y2="168" stroke="#67E8F9" strokeWidth="3" strokeLinecap="round" className="bond2" />
        <line x1="285" y1="168" x2="285" y2="210" stroke="#67E8F9" strokeWidth="3" strokeLinecap="round" className="bond3" />
        <line x1="285" y1="210" x2="250" y2="230" stroke="#67E8F9" strokeWidth="3" strokeLinecap="round" className="bond4" />
        <line x1="250" y1="230" x2="215" y2="210" stroke="#67E8F9" strokeWidth="3" strokeLinecap="round" className="bond5" />
        <line x1="215" y1="210" x2="215" y2="168" stroke="#67E8F9" strokeWidth="3" strokeLinecap="round" className="bond6" />
        {/* Cabang */}
        <line x1="215" y1="168" x2="190" y2="154" stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <line x1="285" y1="210" x2="310" y2="224" stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <line x1="250" y1="148" x2="250" y2="120" stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        {/* Atom di sudut */}
        <circle cx="250" cy="148" r="11" fill="url(#atomGrad)" className="atom1" />
        <circle cx="285" cy="168" r="11" fill="url(#atomGrad)" className="atom2" />
        <circle cx="285" cy="210" r="11" fill="url(#atomGrad)" className="atom3" />
        <circle cx="250" cy="230" r="11" fill="url(#atomGrad)" className="atom4" />
        <circle cx="215" cy="210" r="11" fill="url(#atomGrad)" className="atom5" />
        <circle cx="215" cy="168" r="11" fill="url(#atomGrad)" className="atom6" />
        {/* Atom cabang */}
        <circle cx="188" cy="152" r="9"  fill="#CFFAFE" opacity="0.8" />
        <circle cx="312" cy="226" r="9"  fill="#CFFAFE" opacity="0.8" />
        <circle cx="250" cy="117" r="9"  fill="#CFFAFE" opacity="0.8" />
        {/* Pusat */}
        <circle cx="250" cy="189" r="15" fill="#1E40AF" opacity="0.5" />
        <circle cx="250" cy="189" r="8"  fill="#DBEAFE" />
      </g>

      {/* ── PARTIKEL TITIK KECIL BERKEDIP ── */}
      <circle cx="340" cy="90"  r="3" fill="#06B6D4" className="p1" />
      <circle cx="170" cy="340" r="2" fill="#3B82F6" className="p2" />
      <circle cx="460" cy="270" r="3" fill="#06B6D4" className="p3" />
      <circle cx="130" cy="460" r="2" fill="#93C5FD" className="p4" />
      <circle cx="380" cy="40"  r="3" fill="#67E8F9" className="p5" />
      <circle cx="35"  cy="310" r="2" fill="#3B82F6" className="p6" />
      <circle cx="470" cy="430" r="3" fill="#06B6D4" className="p7" />
      <circle cx="300" cy="470" r="2" fill="#93C5FD" className="p8" />
    </svg>
  );
}