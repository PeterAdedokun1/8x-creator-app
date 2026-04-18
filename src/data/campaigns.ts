import { Campaign } from './types';

export const campaigns: Campaign[] = [
  {
    id: '1',
    brand: 'GlowSkin',
    brandLogo: '✨',
    title: 'Summer Glow Routine',
    description: 'Show off your summer skincare routine using GlowSkin products.',
    brief:
      'Create a 30–60 second TikTok or Reel showing your morning skincare routine. Start with a bare face, then apply GlowSkin SPF Moisturizer and Vitamin C Serum. Use trending audio. Mention "GlowSkin" naturally — no hard sell. Tag @glowskin and use #GlowSkinSummer.',
    payoutPerVideo: 150,
    deadline: '2026-05-01',
    exampleVideos: [
      {
        id: 'v1',
        title: 'Morning Routine GRWM',
        url: 'https://www.tiktok.com/@charlidamelio/video/7231950091487498538',
        thumbnailUrl: 'https://picsum.photos/seed/skincare1/300/400',
      },
      {
        id: 'v2',
        title: 'SPF Application Tips',
        url: 'https://www.tiktok.com/@dermdoctor/video/7200000000000000000',
        thumbnailUrl: 'https://picsum.photos/seed/skincare2/300/400',
      },
    ],
    tags: ['Skincare', 'Beauty', 'Summer'],
  },
  {
    id: '2',
    brand: 'FitFuel',
    brandLogo: '💪',
    title: 'Pre-Workout Energy',
    description: 'Showcase your workout powered by FitFuel pre-workout.',
    brief:
      'Film a 30–45 second video of your gym session. Start by mixing FitFuel Pre-Workout (show the container clearly). Cut to intense workout clips. End with a reaction shot. Use energetic audio. Caption must include "Powered by @FitFuel" and #FitFuelEnergy.',
    payoutPerVideo: 200,
    deadline: '2026-04-28',
    exampleVideos: [
      {
        id: 'v3',
        title: 'Leg Day Energy',
        url: 'https://www.tiktok.com/@fitness/video/7231950091487498538',
        thumbnailUrl: 'https://picsum.photos/seed/fitness1/300/400',
      },
    ],
    tags: ['Fitness', 'Health', 'Gym'],
  },
  {
    id: '3',
    brand: 'BrewBox',
    brandLogo: '☕',
    title: 'Morning Coffee Unboxing',
    description: 'Unbox and review your BrewBox monthly coffee subscription.',
    brief:
      'Create a 45–60 second unboxing video of your BrewBox delivery. Show the packaging, reveal each coffee bag, and brew one cup. Share your genuine reaction to the taste. Keep it authentic and cozy. Tag @brewbox and use #BrewBoxMornings. Soft lo-fi background music preferred.',
    payoutPerVideo: 100,
    deadline: '2026-05-15',
    exampleVideos: [
      {
        id: 'v4',
        title: 'Cozy Coffee Unboxing',
        url: 'https://www.instagram.com/reel/example1',
        thumbnailUrl: 'https://picsum.photos/seed/coffee1/300/400',
      },
      {
        id: 'v5',
        title: 'Taste Test Reaction',
        url: 'https://www.instagram.com/reel/example2',
        thumbnailUrl: 'https://picsum.photos/seed/coffee2/300/400',
      },
    ],
    tags: ['Food', 'Lifestyle', 'Unboxing'],
  },
  {
    id: '4',
    brand: 'PawPals',
    brandLogo: '🐾',
    title: 'Pet Toy Review',
    description: 'Show your pet playing with PawPals interactive toys.',
    brief:
      'Record your pet discovering and playing with a PawPals toy for the first time. Capture their genuine reaction. 30–60 seconds. Voiceover or text overlay explaining what makes the toy special. Must show product packaging briefly. Use #PawPalsPlay and tag @pawpals.',
    payoutPerVideo: 125,
    deadline: '2026-05-10',
    exampleVideos: [
      {
        id: 'v6',
        title: 'Puppy vs New Toy',
        url: 'https://www.tiktok.com/@petlover/video/example',
        thumbnailUrl: 'https://picsum.photos/seed/pets1/300/400',
      },
    ],
    tags: ['Pets', 'Lifestyle', 'Review'],
  },
  {
    id: '5',
    brand: 'StyleDrop',
    brandLogo: '👗',
    title: 'Spring Outfit Haul',
    description: "Style 3 outfits from StyleDrop's new spring collection.",
    brief:
      "Create a try-on haul video featuring at least 3 outfits from StyleDrop's Spring 2026 line. Show each outfit with a transition effect. Include your honest thoughts on fit and quality. 45-90 seconds. Tag @styledrop, use #StyleDropSpring. Link your favorites in bio.",
    payoutPerVideo: 175,
    deadline: '2026-04-25',
    exampleVideos: [
      {
        id: 'v7',
        title: 'Spring Try-On Haul',
        url: 'https://www.tiktok.com/@fashionista/video/example',
        thumbnailUrl: 'https://picsum.photos/seed/fashion1/300/400',
      },
      {
        id: 'v8',
        title: 'Outfit Transitions',
        url: 'https://www.instagram.com/reel/example3',
        thumbnailUrl: 'https://picsum.photos/seed/fashion2/300/400',
      },
    ],
    tags: ['Fashion', 'Style', 'Haul'],
  },
];
