export function BotanicalCornerTL({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 190 Q10 10 190 10" stroke="#9CAF88" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M10 190 Q30 80 100 40" stroke="#9CAF88" strokeWidth="1" fill="none" opacity="0.5"/>
      {/* Stem */}
      <path d="M20 170 Q35 100 80 50" stroke="#87A878" strokeWidth="1.5" fill="none"/>
      <path d="M20 170 Q50 130 90 80" stroke="#87A878" strokeWidth="1" fill="none"/>
      {/* Leaves */}
      <ellipse cx="55" cy="110" rx="18" ry="9" transform="rotate(-40 55 110)" fill="#9CAF88" opacity="0.7"/>
      <ellipse cx="70" cy="80" rx="16" ry="7" transform="rotate(-55 70 80)" fill="#87A878" opacity="0.6"/>
      <ellipse cx="38" cy="140" rx="14" ry="6" transform="rotate(-25 38 140)" fill="#9CAF88" opacity="0.5"/>
      <ellipse cx="88" cy="57" rx="12" ry="5" transform="rotate(-65 88 57)" fill="#87A878" opacity="0.6"/>
      {/* Flowers */}
      <circle cx="90" cy="48" r="4" fill="#D4AF6A" opacity="0.7"/>
      <circle cx="90" cy="48" r="7" fill="none" stroke="#D4AF6A" strokeWidth="0.8" opacity="0.5"/>
      <circle cx="60" cy="100" r="3" fill="#D4AF6A" opacity="0.6"/>
      {/* Small dots */}
      <circle cx="45" cy="125" r="2" fill="#C9A84C" opacity="0.5"/>
      <circle cx="78" cy="68" r="1.5" fill="#C9A84C" opacity="0.4"/>
    </svg>
  );
}

export function BotanicalCornerTR({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{transform: 'scaleX(-1)'}}>
      <path d="M10 190 Q10 10 190 10" stroke="#9CAF88" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M20 170 Q35 100 80 50" stroke="#87A878" strokeWidth="1.5" fill="none"/>
      <path d="M20 170 Q50 130 90 80" stroke="#87A878" strokeWidth="1" fill="none"/>
      <ellipse cx="55" cy="110" rx="18" ry="9" transform="rotate(-40 55 110)" fill="#9CAF88" opacity="0.7"/>
      <ellipse cx="70" cy="80" rx="16" ry="7" transform="rotate(-55 70 80)" fill="#87A878" opacity="0.6"/>
      <ellipse cx="38" cy="140" rx="14" ry="6" transform="rotate(-25 38 140)" fill="#9CAF88" opacity="0.5"/>
      <ellipse cx="88" cy="57" rx="12" ry="5" transform="rotate(-65 88 57)" fill="#87A878" opacity="0.6"/>
      <circle cx="90" cy="48" r="4" fill="#D4AF6A" opacity="0.7"/>
      <circle cx="90" cy="48" r="7" fill="none" stroke="#D4AF6A" strokeWidth="0.8" opacity="0.5"/>
      <circle cx="60" cy="100" r="3" fill="#D4AF6A" opacity="0.6"/>
      <circle cx="45" cy="125" r="2" fill="#C9A84C" opacity="0.5"/>
    </svg>
  );
}

export function BotanicalCornerBL({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{transform: 'scaleY(-1)'}}>
      <path d="M10 190 Q10 10 190 10" stroke="#9CAF88" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M20 170 Q35 100 80 50" stroke="#87A878" strokeWidth="1.5" fill="none"/>
      <ellipse cx="55" cy="110" rx="18" ry="9" transform="rotate(-40 55 110)" fill="#9CAF88" opacity="0.7"/>
      <ellipse cx="70" cy="80" rx="16" ry="7" transform="rotate(-55 70 80)" fill="#87A878" opacity="0.6"/>
      <ellipse cx="38" cy="140" rx="14" ry="6" transform="rotate(-25 38 140)" fill="#9CAF88" opacity="0.5"/>
      <circle cx="90" cy="48" r="4" fill="#D4AF6A" opacity="0.7"/>
      <circle cx="60" cy="100" r="3" fill="#D4AF6A" opacity="0.6"/>
    </svg>
  );
}

export function BotanicalCornerBR({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{transform: 'scale(-1,-1)'}}>
      <path d="M10 190 Q10 10 190 10" stroke="#9CAF88" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M20 170 Q35 100 80 50" stroke="#87A878" strokeWidth="1.5" fill="none"/>
      <ellipse cx="55" cy="110" rx="18" ry="9" transform="rotate(-40 55 110)" fill="#9CAF88" opacity="0.7"/>
      <ellipse cx="70" cy="80" rx="16" ry="7" transform="rotate(-55 70 80)" fill="#87A878" opacity="0.6"/>
      <ellipse cx="88" cy="57" rx="12" ry="5" transform="rotate(-65 88 57)" fill="#87A878" opacity="0.6"/>
      <circle cx="90" cy="48" r="4" fill="#D4AF6A" opacity="0.7"/>
      <circle cx="45" cy="125" r="2" fill="#C9A84C" opacity="0.5"/>
    </svg>
  );
}

export function BotanicalDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Center line left */}
      <line x1="0" y1="30" x2="230" y2="30" stroke="#9CAF88" strokeWidth="0.8" opacity="0.6"/>
      {/* Center line right */}
      <line x1="370" y1="30" x2="600" y2="30" stroke="#9CAF88" strokeWidth="0.8" opacity="0.6"/>
      {/* Center diamond */}
      <rect x="293" y="23" width="14" height="14" transform="rotate(45 300 30)" fill="none" stroke="#D4AF6A" strokeWidth="1" opacity="0.8"/>
      <rect x="297" y="27" width="6" height="6" transform="rotate(45 300 30)" fill="#D4AF6A" opacity="0.6"/>
      {/* Left botanical */}
      <path d="M240 30 Q255 15 265 30 Q255 45 240 30Z" fill="#9CAF88" opacity="0.5"/>
      <path d="M220 30 Q235 18 242 30 Q235 42 220 30Z" fill="#87A878" opacity="0.4"/>
      <path d="M205 30 Q218 20 222 30 Q218 40 205 30Z" fill="#9CAF88" opacity="0.3"/>
      {/* Right botanical */}
      <path d="M360 30 Q345 15 335 30 Q345 45 360 30Z" fill="#9CAF88" opacity="0.5"/>
      <path d="M380 30 Q365 18 358 30 Q365 42 380 30Z" fill="#87A878" opacity="0.4"/>
      <path d="M395 30 Q382 20 378 30 Q382 40 395 30Z" fill="#9CAF88" opacity="0.3"/>
      {/* Small dots */}
      <circle cx="175" cy="30" r="2" fill="#C9A84C" opacity="0.5"/>
      <circle cx="160" cy="30" r="1.5" fill="#9CAF88" opacity="0.4"/>
      <circle cx="425" cy="30" r="2" fill="#C9A84C" opacity="0.5"/>
      <circle cx="440" cy="30" r="1.5" fill="#9CAF88" opacity="0.4"/>
    </svg>
  );
}

export function BotanicalFooter({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Main stems */}
      <path d="M200 110 Q160 70 120 50" stroke="#9CAF88" strokeWidth="1.5" fill="none"/>
      <path d="M200 110 Q240 70 280 50" stroke="#9CAF88" strokeWidth="1.5" fill="none"/>
      <path d="M200 110 Q180 60 170 20" stroke="#87A878" strokeWidth="1" fill="none"/>
      <path d="M200 110 Q220 60 230 20" stroke="#87A878" strokeWidth="1" fill="none"/>
      <path d="M200 110 Q140 80 90 75" stroke="#9CAF88" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M200 110 Q260 80 310 75" stroke="#9CAF88" strokeWidth="1" fill="none" opacity="0.7"/>
      {/* Leaves */}
      <ellipse cx="135" cy="65" rx="16" ry="7" transform="rotate(-35 135 65)" fill="#9CAF88" opacity="0.65"/>
      <ellipse cx="155" cy="45" rx="13" ry="5.5" transform="rotate(-50 155 45)" fill="#87A878" opacity="0.6"/>
      <ellipse cx="265" cy="65" rx="16" ry="7" transform="rotate(35 265 65)" fill="#9CAF88" opacity="0.65"/>
      <ellipse cx="245" cy="45" rx="13" ry="5.5" transform="rotate(50 245 45)" fill="#87A878" opacity="0.6"/>
      <ellipse cx="175" cy="50" rx="12" ry="5" transform="rotate(-70 175 50)" fill="#9CAF88" opacity="0.55"/>
      <ellipse cx="225" cy="50" rx="12" ry="5" transform="rotate(70 225 50)" fill="#9CAF88" opacity="0.55"/>
      <ellipse cx="110" cy="80" rx="14" ry="6" transform="rotate(-15 110 80)" fill="#87A878" opacity="0.5"/>
      <ellipse cx="290" cy="80" rx="14" ry="6" transform="rotate(15 290 80)" fill="#87A878" opacity="0.5"/>
      {/* Flowers */}
      <circle cx="120" cy="48" r="5" fill="#D4AF6A" opacity="0.7"/>
      <circle cx="120" cy="48" r="9" fill="none" stroke="#D4AF6A" strokeWidth="0.8" opacity="0.4"/>
      <circle cx="280" cy="48" r="5" fill="#D4AF6A" opacity="0.7"/>
      <circle cx="280" cy="48" r="9" fill="none" stroke="#D4AF6A" strokeWidth="0.8" opacity="0.4"/>
      <circle cx="170" cy="18" r="4" fill="#C9A84C" opacity="0.6"/>
      <circle cx="230" cy="18" r="4" fill="#C9A84C" opacity="0.6"/>
      <circle cx="200" cy="108" r="3" fill="#D4AF6A" opacity="0.5"/>
      {/* Small berries */}
      <circle cx="93" cy="74" r="2.5" fill="#9CAF88" opacity="0.6"/>
      <circle cx="307" cy="74" r="2.5" fill="#9CAF88" opacity="0.6"/>
    </svg>
  );
}
