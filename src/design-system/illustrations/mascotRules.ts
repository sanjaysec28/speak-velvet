/**
 * Speak Velvet — Mascot & Illustration System Specifications
 * 
 * Mascot Character: "Velvet" — The Private Spoken-English Companion
 * Target Audience: School students (middle and high school)
 * Approved Visual Direction: Bright, clean, friendly, modern and premium.
 * Strictly Anti-AI / Anti-Slop: Clean vector craft, zero 3D wax realism, zero cyberpunk, zero robotic clichés.
 */

export const VELVET_MASCOT_SPEC = {
  name: 'Velvet',
  role: 'Friendly, encouraging, non-judgmental conversational English buddy',
  
  // 1. Proportions & Shape Rules
  proportions: {
    ratio: '1 : 1.35 head-to-body ratio (youthful and approachable without looking infantile)',
    headShape: 'Gentle rounded pebble contour with soft cheeks (r = 24px-32px curvature)',
    silhouette: 'Organic, friendly teardrop and rounded-pill silhouette; strictly no harsh 90-degree angles',
    hair: 'Stylized tousled dark navy swooshes with warm highlights, framing an open, attentive forehead',
    clothing: 'Signature Royal Blue hoodie (#2563EB) with crisp white zipper/collar trim and subtle "V" monogram',
    shoulders: 'Soft relaxed slope, communicating openness, safety, and attentive listening',
  },

  // 2. Facial Anatomy & Expressions
  face: {
    eyes: {
      style: 'Large, bright, expressive dark navy pupils (#0F172A) with dual crisp white reflection dots',
      resting: 'Warm circular pupils with gentle lower-lid lift',
      listening: 'Slightly widened, attentive focus, head tilted 6 degrees to one side',
      happy: 'Delightful upturned crescents (^^) full of warmth',
      thinking: 'Pupils gently raised upward-right, one eyebrow subtly cocked',
      encouraging: 'Direct eye contact with soft reassuring smile',
      celebration: 'Crescent smiling eyes with tiny celebration star reflections',
    },
    brows: {
      style: 'Soft expressive curved arcs in dark slate (#1E293B)',
      height: 'Positioned comfortably above eyes to prevent sternness or worry',
    },
    mouth: {
      listening: 'Gentle, closed friendly curve (approachable, not interrupting)',
      speaking: 'Open rounded oval with coral pink tongue (#FB7185) and white teeth highlight',
      thinking: 'Small thoughtful o-shape or gentle puckered side curve',
      happy: 'Generous, joyful upward crescent grin with soft cheek blush',
      encouraging: 'Confident, warm smile nodding in affirmation',
      celebration: 'Wide open laughing smile conveying authentic student pride',
    },
    cheeks: {
      style: 'Soft translucent rose blush (#FECDD3 / opacity 45%) giving human warmth',
    },
  },

  // 3. State-by-State Rules
  states: [
    {
      state: 'listening',
      name: 'Active Listening',
      pose: 'Attentive head tilt, gentle closed smile, dynamic blue audio waves hovering near ear/side',
      usage: 'Displayed while student is speaking into the microphone ("I\'m listening...")',
      accentColor: '#2563EB (Sky / Royal Blue)',
    },
    {
      state: 'speaking',
      name: 'Companion Speaking',
      pose: 'Mouth open in mid-word, hand gently gesturing toward speech bubble, rhythmic audio pulses',
      usage: 'Displayed when Velvet speaks English prompts, scenarios, or pronunciation examples',
      accentColor: '#3B82F6 (Vibrant Blue)',
    },
    {
      state: 'thinking',
      name: 'Analyzing / Thinking',
      pose: 'Pupils tilted upward, gentle spark/lightbulb above head, slight head lean',
      usage: 'Displayed during speech analysis, feedback generation, or loading hints',
      accentColor: '#F59E0B (Golden Amber)',
    },
    {
      state: 'happy',
      name: 'Welcoming / Idle',
      pose: 'Direct warm gaze, hand resting or gentle wave, peaceful welcoming smile',
      usage: 'Home dashboard header, lesson introductions, welcome cards',
      accentColor: '#2563EB (Royal Blue)',
    },
    {
      state: 'encouraging',
      name: 'Supportive Coach',
      pose: 'Warm thumbs-up or gentle fist-pump gesture, reassuring nod ("You can do it!")',
      usage: 'Correction cards, tip bubbles, confidence encouragement after hesitant speech',
      accentColor: '#10B981 (Gentle Green)',
    },
    {
      state: 'celebration',
      name: 'Milestone Celebration',
      pose: 'Joyful raised arms, sparkling eyes, floating golden stars and gentle confetti',
      usage: 'Streak completion, level up, 100% pronunciation score, badge unlocks',
      accentColor: '#F59E0B (Golden Sun Yellow)',
    },
  ],

  // 4. Color Palette Mapping (Strict Token Adherence)
  colorMap: {
    hairAndOutline: '#0F172A (Navy 900)',
    primaryGarment: '#2563EB (Royal Blue 600)',
    garmentHighlight: '#3B82F6 (Sky Blue 500)',
    garmentShadow: '#1D4ED8 (Royal Blue 700)',
    whiteTrim: '#FFFFFF',
    skinBase: '#FDDEC0 (Warm Golden Peach)',
    skinShadow: '#F8B682 (Soft Warm Amber Blush)',
    blush: '#FECDD3 (Soft Rose)',
    accentStar: '#F59E0B (Warm Golden Sun)',
    sparkleGlow: '#FEF3C7 (Sunburst 100)',
  },

  // 5. Illustration Style Rules (Clean, Flat-Plus-Depth)
  illustrationRules: {
    renderingMode: 'Clean vector outlines with flat color fills and single-level soft ambient tone',
    strokeWeight: 'Consistent 2px-2.5px strokes with rounded caps (`strokeLinecap="round"` and `strokeLinejoin="round"`)',
    lighting: 'Soft daylight ambient from top-left; zero glossy plastic reflections or 3D raytracing',
    bannedStyles: [
      'NO generic robot antennas, metallic plates, or glowing cyborg visor lines',
      'NO bloated 3D pastel clay/wax renderings',
      'NO toddler/infantile baby characters with pacifiers or oversized diapers',
      'NO harsh cyberpunk neon cyan/magenta gradients',
      'NO cluttered backgrounds; keep illustrations floating cleanly on warm off-white canvas',
    ],
  },

  // 6. Placement & Spacing Discipline
  spacingRules: {
    containerPadding: 'Minimum 24px outer margin around hero mascot illustrations',
    speechBubbleDistance: '12px-16px gap between mascot head and accompanying speech tail',
    cardHeroCap: 'Maximum 1 dominant mascot anchor per viewport screen to maintain calm focus',
    smallAvatar: '36px-48px for conversation thread avatars and top header chips',
    mediumIllustration: '80px-120px for dialog prompts, scenario cards, and tip callouts',
    heroIllustration: '180px-240px for welcome banners, milestone celebration dialogs, and empty states',
  },
} as const;
