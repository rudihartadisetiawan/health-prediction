"use client";

import React from "react";

interface HeartAnimationProps {
  width?: string | number;
  height?: string | number;
}

export default function HeartAnimation({
  width = "100%",
  height = "100%",
}: HeartAnimationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="heartGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#EF4444", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#DC2626", stopOpacity: 1 }} />
        </linearGradient>

        <linearGradient id="veinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#DC2626", stopOpacity: 0.6 }} />
          <stop offset="100%" style={{ stopColor: "#991B1B", stopOpacity: 0.8 }} />
        </linearGradient>

        <style>
          {`
            /* Heart beat animation */
            .heart-main { 
              fill: url(#heartGradient); 
              filter: url(#heartGlow);
              animation: heartBeat 1.2s ease-in-out infinite; 
              transform-origin: center;
            }
            
            /* Heart chambers detail */
            .heart-chamber {
              fill: #B91C1C;
              opacity: 0.6;
              animation: chamberPulse 1.2s ease-in-out infinite;
            }
            
            /* Arteries */
            .artery {
              fill: none;
              stroke: url(#veinGradient);
              stroke-width: 8;
              stroke-linecap: round;
              opacity: 0.7;
            }
            
            /* ECG line */
            .ecg-line { 
              fill: none; 
              stroke: #EF4444; 
              stroke-width: 2; 
              stroke-linecap: round; 
              stroke-linejoin: round; 
              opacity: 0.2; 
            }
            
            .ecg-pulse { 
              fill: none; 
              stroke: #FBBF24; 
              stroke-width: 3; 
              stroke-linecap: round; 
              stroke-linejoin: round; 
              filter: url(#heartGlow);
              stroke-dasharray: 800; 
              stroke-dashoffset: 800; 
              animation: ecgPulseFlow 2s linear infinite; 
            }
            
            /* Blood cells flowing */
            .blood-cell {
              fill: #EF4444;
              opacity: 0.6;
              animation: bloodFlow 3s linear infinite;
            }
            
            /* Particles */
            .particle {
              fill: #EF4444;
              opacity: 0.2;
              animation: particleFloat 5s ease-in-out infinite;
            }
            
            /* Pulse rings */
            .pulse-ring {
              fill: none;
              stroke: #EF4444;
              stroke-width: 1;
              opacity: 0;
              animation: pulseRing 2s ease-out infinite;
            }
            
            /* Keyframes */
            @keyframes heartBeat {
              0%, 100% { transform: scale(1); }
              15% { transform: scale(1.12); }
              30% { transform: scale(1.05); }
              45% { transform: scale(1.15); }
              70% { transform: scale(1); }
            }
            
            @keyframes chamberPulse {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 0.7; }
            }
            
            @keyframes ecgPulseFlow {
              0% { stroke-dashoffset: 800; }
              100% { stroke-dashoffset: 0; }
            }
            
            @keyframes bloodFlow {
              0% { transform: translateX(-50px); opacity: 0; }
              20% { opacity: 0.6; }
              80% { opacity: 0.6; }
              100% { transform: translateX(50px); opacity: 0; }
            }
            
            @keyframes particleFloat {
              0%, 100% { transform: translateY(0px) scale(1); }
              50% { transform: translateY(-20px) scale(1.2); }
            }
            
            @keyframes pulseRing {
              0% { transform: scale(0.8); opacity: 0.4; }
              100% { transform: scale(1.5); opacity: 0; }
            }

            /* Accessibility */
            @media (prefers-reduced-motion: reduce) {
              * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
            }
          `}
        </style>
      </defs>

      {/* Background Particles */}
      <g className="particles">
        <circle cx="80" cy="100" r="3" className="particle" style={{ animationDelay: "0s" }} />
        <circle cx="420" cy="150" r="2" className="particle" style={{ animationDelay: "1s" }} />
        <circle cx="350" cy="320" r="2.5" className="particle" style={{ animationDelay: "2s" }} />
        <circle cx="120" cy="350" r="2" className="particle" style={{ animationDelay: "0.5s" }} />
        <circle cx="450" cy="80" r="3" className="particle" style={{ animationDelay: "1.5s" }} />
      </g>

      {/* Pulse Rings behind heart */}
      <g transform="translate(250, 200)">
        <circle r="60" className="pulse-ring" style={{ animationDelay: "0s" }} />
        <circle r="60" className="pulse-ring" style={{ animationDelay: "0.5s" }} />
        <circle r="60" className="pulse-ring" style={{ animationDelay: "1s" }} />
      </g>

      {/* Main Heart Shape - Anatomically inspired */}
      <g transform="translate(250, 220)" className="heart-main">
        {/* Main heart body - more anatomical shape */}
        <path d="M0,80 
                 C-60,50 -90,10 -90,-30 
                 C-90,-60 -60,-80 -30,-80 
                 C-10,-80 0,-60 0,-50 
                 C0,-60 10,-80 30,-80 
                 C60,-80 90,-60 90,-30 
                 C90,10 60,50 0,80 Z" />
        
        {/* Left atrium bump */}
        <ellipse cx="-70" cy="-40" rx="25" ry="20" />
        
        {/* Right atrium bump */}
        <ellipse cx="70" cy="-40" rx="25" ry="20" />
      </g>

      {/* Heart chambers/veins detail */}
      <g transform="translate(250, 220)">
        {/* Left ventricle area */}
        <ellipse cx="-25" cy="30" rx="20" ry="25" className="heart-chamber" />
        
        {/* Right ventricle area */}
        <ellipse cx="25" cy="30" rx="20" ry="25" className="heart-chamber" />
        
        {/* Interventricular sulcus */}
        <path d="M0,-20 Q5,20 0,60" fill="none" stroke="#991B1B" strokeWidth="2" opacity="0.5" />
      </g>

      {/* Aorta artery coming out from top */}
      <g transform="translate(250, 120)">
        <path d="M-15,0 C-20,-30 -10,-50 0,-50 C10,-50 20,-30 15,0" 
              fill="none" stroke="url(#veinGradient)" strokeWidth="12" strokeLinecap="round" opacity="0.8" />
        <path d="M-8,0 C-12,-25 -5,-42 0,-42 C5,-42 12,-25 8,0" 
              fill="none" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* Pulmonary arteries */}
      <g transform="translate(250, 140)">
        <path d="M-30,-10 C-50,-20 -70,-10 -80,10" 
              fill="none" stroke="url(#veinGradient)" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
        <path d="M30,-10 C50,-20 70,-10 80,10" 
              fill="none" stroke="url(#veinGradient)" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* ECG Background Line */}
      <path d="M20,380 L60,380 L70,350 L80,410 L90,380 L130,380 L140,330 L150,430 L160,380 L200,380 L210,350 L220,410 L230,380 L270,380 L280,330 L290,430 L300,380 L340,380 L350,350 L360,410 L370,380 L420,380 L430,350 L440,410 L450,380 L480,380" 
            className="ecg-line" />

      {/* ECG Pulse Line */}
      <path d="M20,380 L60,380 L70,350 L80,410 L90,380 L130,380 L140,330 L150,430 L160,380 L200,380 L210,350 L220,410 L230,380 L270,380 L280,330 L290,430 L300,380 L340,380 L350,350 L360,410 L370,380 L420,380 L430,350 L440,410 L450,380 L480,380" 
            className="ecg-pulse" 
            style={{ willChange: "stroke-dashoffset" }} />

      {/* Blood cells flowing through arteries */}
      <g transform="translate(250, 100)">
        <circle cx="0" cy="-30" r="4" className="blood-cell">
          <animateMotion dur="3s" repeatCount="indefinite" path="M0,0 C0,-20 -5,-35 0,-45" />
        </circle>
        <circle cx="0" cy="-30" r="3" className="blood-cell" style={{ animationDelay: "1s" }}>
          <animateMotion dur="3s" repeatCount="indefinite" begin="1s" path="M0,0 C0,-20 -5,-35 0,-45" />
        </circle>
      </g>

      {/* Small floating particles around heart */}
      <g transform="translate(180, 250)">
        <circle cx="0" cy="0" r="4" fill="#EF4444" opacity="0.3">
          <animate attributeName="cy" values="0;-10;0" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
      
      <g transform="translate(320, 280)">
        <circle cx="0" cy="0" r="3" fill="#EF4444" opacity="0.25">
          <animate attributeName="cy" values="0;-8;0" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>
      
      <g transform="translate(150, 180)">
        <circle cx="0" cy="0" r="3.5" fill="#EF4444" opacity="0.35">
          <animate attributeName="cy" values="0;-12;0" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Valve indicators - small circles at key points */}
      <g transform="translate(250, 200)">
        <circle cx="-35" cy="0" r="5" fill="#DC2626" opacity="0.5">
          <animate attributeName="r" values="5;6;5" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="35" cy="0" r="5" fill="#DC2626" opacity="0.5">
          <animate attributeName="r" values="5;6;5" dur="1.2s" repeatCount="indefinite" begin="0.1s" />
        </circle>
      </g>
    </svg>
  );
}
