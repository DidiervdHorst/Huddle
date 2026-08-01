interface WaveArtProps {
  className?: string;
}

export default function WaveArt({ className = "" }: WaveArtProps) {
  return (
    <svg
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="waveBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5FAE9C" />
          <stop offset="100%" stopColor="#1D5346" />
        </linearGradient>
        <linearGradient id="waveFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7FC3B2" />
          <stop offset="100%" stopColor="#2F7A6B" />
        </linearGradient>
      </defs>

      {/* back swell */}
      <path
        d="M0,220 C10,150 45,110 90,108 C120,106 128,80 118,60 C150,78 168,108 150,132 C210,118 280,132 400,110 L400,220 Z"
        fill="url(#waveBack)"
        opacity="0.55"
      />

      {/* main curling wave */}
      <path
        d="M0,220 C15,160 55,120 105,112 C142,106 150,72 132,42 C168,58 196,96 178,128 C160,158 130,168 120,150 C150,175 210,150 260,140 C310,130 360,150 400,140 L400,220 Z"
        fill="url(#waveFront)"
      />

      {/* foam along the crest */}
      <path
        d="M118,52 C138,64 152,88 140,112 C132,128 112,140 96,136 C118,132 132,116 128,98 C124,82 110,70 96,66 C104,58 112,54 118,52 Z"
        fill="#F8F0E0"
        opacity="0.95"
      />
      <path
        d="M170,132 C200,124 236,128 268,138 C230,132 196,140 172,150 C168,144 168,138 170,132 Z"
        fill="#F8F0E0"
        opacity="0.85"
      />
      <path
        d="M60,128 C80,122 100,126 112,138 C96,136 78,138 64,146 C60,140 58,134 60,128 Z"
        fill="#F8F0E0"
        opacity="0.7"
      />

      {/* tiny surfer mark */}
      <circle cx="150" cy="118" r="2.6" fill="#25201A" />
      <path d="M147,120 L154,116" stroke="#25201A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
