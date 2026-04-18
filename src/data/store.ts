import { Submission } from './types';

// Simple in-memory store for submissions
let submissions: Submission[] = [
  {
    id: 'sub-1',
    campaignId: '2',
    campaignTitle: 'Pre-Workout Energy',
    brand: 'FitFuel',
    videoUrl: 'https://www.tiktok.com/@creator/video/1234567890',
    status: 'approved',
    submittedAt: '2026-04-10T14:30:00Z',
    feedback: 'Great energy and product placement! Approved.',
  },
  {
    id: 'sub-2',
    campaignId: '3',
    campaignTitle: 'Morning Coffee Unboxing',
    brand: 'BrewBox',
    videoUrl: 'https://www.instagram.com/reel/ABC123',
    status: 'pending',
    submittedAt: '2026-04-14T09:15:00Z',
  },
  {
    id: 'sub-3',
    campaignId: '5',
    campaignTitle: 'Spring Outfit Haul',
    brand: 'StyleDrop',
    videoUrl: 'https://www.tiktok.com/@creator/video/9876543210',
    status: 'rejected',
    submittedAt: '2026-04-12T16:45:00Z',
    feedback: 'Video did not show required 3 outfits. Please resubmit with at least 3 looks.',
  },
];

let listeners: (() => void)[] = [];

export const store = {
  getSubmissions(): Submission[] {
    return [...submissions];
  },

  getSubmissionsByCampaign(campaignId: string): Submission[] {
    return submissions.filter((s) => s.campaignId === campaignId);
  },

  addSubmission(campaignId: string, campaignTitle: string, brand: string, videoUrl: string): Submission {
    const submission: Submission = {
      id: `sub-${Date.now()}`,
      campaignId,
      campaignTitle,
      brand,
      videoUrl,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    submissions = [submission, ...submissions];
    listeners.forEach((l) => l());
    return submission;
  },

  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};
