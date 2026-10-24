/**
 * Generates a crisp, self-contained 4:3 studio SVG placeholder data URI
 * tailored to each product category (beads, clutches, couture) without
 * relying on fragile external placeholder domains.
 */
export function createPlaceholderImage({ category, label, accent = '#E04819', secondary = '#0B1D3A' }) {
  let illustration = '';

  if (category === 'beads') {
    illustration = `
      <path d="M 270 210 Q 400 370 530 210" fill="none" stroke="${secondary}" stroke-width="2.5" opacity="0.35" />
      <path d="M 245 215 Q 400 410 555 215" fill="none" stroke="${accent}" stroke-width="2.5" opacity="0.65" />
      <path d="M 220 220 Q 400 450 580 220" fill="none" stroke="${secondary}" stroke-width="2.5" opacity="0.25" />
      <circle cx="400" cy="310" r="8" fill="${accent}" />
      <circle cx="362" cy="302" r="6.5" fill="${accent}" opacity="0.85" />
      <circle cx="438" cy="302" r="6.5" fill="${accent}" opacity="0.85" />
      <circle cx="328" cy="284" r="5.5" fill="${secondary}" opacity="0.6" />
      <circle cx="472" cy="284" r="5.5" fill="${secondary}" opacity="0.6" />
      <circle cx="400" cy="335" r="7" fill="${secondary}" opacity="0.75" />
    `;
  } else if (category === 'clutches') {
    illustration = `
      <rect x="275" y="215" width="250" height="145" rx="14" fill="#FFFFFF" fill-opacity="0.65" stroke="${secondary}" stroke-width="2.5" opacity="0.7" />
      <rect x="378" y="198" width="44" height="17" rx="5" fill="${accent}" opacity="0.85" />
      <path d="M 295 235 L 400 340 L 505 235" fill="none" stroke="${accent}" stroke-width="1.75" opacity="0.45" />
      <path d="M 295 340 L 400 235 L 505 340" fill="none" stroke="${secondary}" stroke-width="1.75" opacity="0.25" />
      <circle cx="400" cy="287" r="6" fill="${accent}" />
    `;
  } else {
    illustration = `
      <path d="M 345 190 L 400 212 L 455 190 L 495 245 L 465 375 L 335 375 L 305 245 Z" fill="#FFFFFF" fill-opacity="0.6" stroke="${secondary}" stroke-width="2.5" opacity="0.65" />
      <path d="M 355 202 Q 400 265 445 202" fill="none" stroke="${accent}" stroke-width="2.5" opacity="0.8" />
      <line x1="348" y1="295" x2="452" y2="295" stroke="${secondary}" stroke-width="1.5" opacity="0.3" />
      <circle cx="380" cy="238" r="4" fill="${accent}" />
      <circle cx="400" cy="248" r="4.5" fill="${accent}" />
      <circle cx="420" cy="238" r="4" fill="${accent}" />
    `;
  }

  const safeLabel = String(label || 'Catalog Item')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const categoryTitle =
    category === 'beads'
      ? 'Handcrafted Beads'
      : category === 'clutches'
      ? 'Beaded Clutch'
      : 'Couture & Regalia';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#F6F4EF" />
        <stop offset="100%" stop-color="#EAE6DC" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#bg)" />
    <rect x="36" y="36" width="728" height="528" rx="12" fill="none" stroke="#0B1D3A" stroke-opacity="0.1" stroke-width="1.5" />
    <line x1="60" y1="60" x2="92" y2="60" stroke="${accent}" stroke-width="2" stroke-opacity="0.55" />
    <line x1="60" y1="60" x2="60" y2="92" stroke="${accent}" stroke-width="2" stroke-opacity="0.55" />
    <line x1="740" y1="540" x2="708" y2="540" stroke="${accent}" stroke-width="2" stroke-opacity="0.55" />
    <line x1="740" y1="540" x2="740" y2="508" stroke="${accent}" stroke-width="2" stroke-opacity="0.55" />
    ${illustration}
    <text x="400" y="442" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#0B1D3A" opacity="0.85">${safeLabel}</text>
    <text x="400" y="470" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B" letter-spacing="0.5">${categoryTitle} · Studio Placeholder (800 × 600)</text>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
