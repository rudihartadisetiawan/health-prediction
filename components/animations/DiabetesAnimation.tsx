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
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="glowBlue" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="dropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#3B82F6", stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: "#06B6D4", stopOpacity: 0.4 }} />
        </linearGradient>

        <style>
          {`
            /* Glucose molecule rotation */
            .molecule-group { animation: rotateMolecule 20s linear infinite; transform-origin: center; }
            
            /* Glucose atoms pulse */
            .glucose-atom { fill: #06B6D4; filter: url(#glowBlue); animation: atomPulse 3s ease-in-out infinite; }
            
            /* Bonds */
            .bond { stroke: #3B82F6; stroke-width: 3; stroke-linecap: round; opacity: 0.6; }
            
            /* Blood drop path animation */
            .blood-drop { fill: url(#dropGradient); filter: url(#glowBlue); animation: dropFloat 4s ease-in-out infinite; transform-origin: center; }
            .blood-drop-2 { fill: url(#dropGradient); filter: url(#glowBlue); animation: dropFloat 4s ease-in-out infinite 0.5s; transform-origin: center; opacity: 0.7; }
            .blood-drop-3 { fill: url(#dropGradient); filter: url(#glowBlue); animation: dropFloat 4s ease-in-out infinite 1s; transform-origin: center; opacity: 0.5; }
            
            /* Particles */
            .particle { fill: #3B82F6; opacity: 0.3; animation: particleRise 6s ease-in infinite; }
            
            /* DNA helix */
            .dna-segment { animation: dnaWave 3s ease-in-out infinite; }
            
            /* Keyframes */
            @keyframes rotateMolecule {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @keyframes atomPulse {
              0%, 100% { r: 12; opacity: 0.8; }
              50% { r: 14; opacity: 1; }
            }
            
            @keyframes dropFloat {
              0%, 100% { transform: translateY(0px) scale(1); }
              50% { transform: translateY(-15px) scale(1.05); }
            }
            
            @keyframes particleRise {
              0% { transform: translateY(0); opacity: 0; }
              50% { opacity: 0.5; }
              100% { transform: translateY(-100px); opacity: 0; }
            }
            
            @keyframes dnaWave {
              0%, 100% { transform: scaleY(1); }
              50% { transform: scaleY(1.1); }
            }

            /* Accessibility */
            @media (prefers-reduced-motion: reduce) {
              * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
            }
          `}
        </style>
      </defs>

      {/* Floating Particles */}
      <g className="particles">
        <circle cx="50" cy="350" r="3" className="particle" style={{ animationDelay: "0s" }} />
        <circle cx="150" cy="380" r="2" className="particle" style={{ animationDelay: "1s" }} />
        <circle cx="350" cy="360" r="2.5" className="particle" style={{ animationDelay: "2s" }} />
        <circle cx="450" cy="340" r="3" className="particle" style={{ animationDelay: "0.5s" }} />
        <circle cx="250" cy="390" r="2" className="particle" style={{ animationDelay: "1.5s" }} />
      </g>

      {/* Blood Drop - Main */}
      <g className="blood-drop" transform="translate(250, 230)">
        <path d="M0,-60 C-30,-30 -50,0 -50,40 C-50,80 -20,100 0,100 C20,100 50,80 50,40 C50,0 30,-30 0,-60 Z" />
      </g>

      {/* Blood Drop - Secondary */}
      <g className="blood-drop-2" transform="translate(170, 250) scale(0.7)">
        <path d="M0,-60 C-30,-30 -50,0 -50,40 C-50,80 -20,100 0,100 C20,100 50,80 50,40 C50,0 30,-30 0,-60 Z" />
      </g>

      {/* Blood Drop - Tertiary */}
      <g className="blood-drop-3" transform="translate(330, 210) scale(0.5)">
        <path d="M0,-60 C-30,-30 -50,0 -50,40 C-50,80 -20,100 0,100 C20,100 50,80 50,40 C50,0 30,-30 0,-60 Z" />
      </g>

      {/* Glucose Molecule */}
      <g className="molecule-group" transform="translate(380, 150)">
        {/* Bonds */}
        <line x1="0" y1="-40" x2="35" y2="-20" className="bond" />
        <line x1="35" y1="-20" x2="35" y2="20" className="bond" />
        <line x1="35" y1="20" x2="0" y2="40" className="bond" />
        <line x1="0" y1="40" x2="-35" y2="20" className="bond" />
        <line x1="-35" y1="20" x2="-35" y2="-20" className="bond" />
        <line x1="-35" y1="-20" x2="0" y2="-40" className="bond" />
        
        {/* Atoms */}
        <circle cx="0" cy="-40" r="12" className="glucose-atom" style={{ animationDelay: "0s" }} />
        <circle cx="35" cy="-20" r="12" className="glucose-atom" style={{ animationDelay: "0.5s" }} />
        <circle cx="35" cy="20" r="12" className="glucose-atom" style={{ animationDelay: "1s" }} />
        <circle cx="0" cy="40" r="12" className="glucose-atom" style={{ animationDelay: "1.5s" }} />
        <circle cx="-35" cy="20" r="12" className="glucose-atom" style={{ animationDelay: "2s" }} />
        <circle cx="-35" cy="-20" r="12" className="glucose-atom" style={{ animationDelay: "2.5s" }} />
        
        {/* Center atom */}
        <circle cx="0" cy="0" r="16" className="glucose-atom" style={{ animationDelay: "0s" }} />
      </g>

      {/* DNA Helix Segments */}
      <g transform="translate(100, 150)">
        <ellipse cx="0" cy="0" rx="25" ry="8" className="dna-segment" fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.4" style={{ animationDelay: "0s" }} />
        <ellipse cx="0" cy="25" rx="25" ry="8" className="dna-segment" fill="none" stroke="#06B6D4" strokeWidth="2" opacity="0.5" style={{ animationDelay: "0.3s" }} />
        <ellipse cx="0" cy="50" rx="25" ry="8" className="dna-segment" fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.4" style={{ animationDelay: "0.6s" }} />
        <ellipse cx="0" cy="75" rx="25" ry="8" className="dna-segment" fill="none" stroke="#06B6D4" strokeWidth="2" opacity="0.5" style={{ animationDelay: "0.9s" }} />
        <ellipse cx="0" cy="100" rx="25" ry="8" className="dna-segment" fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.4" style={{ animationDelay: "1.2s" }} />
        
        {/* Vertical connectors */}
        <line x1="-25" y1="0" x2="-25" y2="100" stroke="#3B82F6" strokeWidth="1" opacity="0.3" />
        <line x1="25" y1="0" x2="25" y2="100" stroke="#3B82F6" strokeWidth="1" opacity="0.3" />
      </g>

      {/* Additional small molecules floating */}
      <g transform="translate(80, 280)">
        <circle cx="0" cy="0" r="8" fill="#06B6D4" opacity="0.4" filter="url(#glowBlue)">
          <animate attributeName="cy" values="0;-5;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="20" cy="10" r="6" fill="#3B82F6" opacity="0.3" filter="url(#glowBlue)">
          <animate attributeName="cy" values="10;5;10" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="-15" cy="15" r="7" fill="#06B6D4" opacity="0.35" filter="url(#glowBlue)">
          <animate attributeName="cy" values="15;10;15" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Small molecule on right */}
      <g transform="translate(420, 280)">
        <circle cx="0" cy="0" r="6" fill="#06B6D4" opacity="0.4" filter="url(#glowBlue)">
          <animate attributeName="cy" values="0;-8;0" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="15" cy="8" r="5" fill="#3B82F6" opacity="0.3" filter="url(#glowBlue)">
          <animate attributeName="cy" values="8;3;8" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}
