export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface ExampleVideo {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Campaign {
  id: string;
  brand: string;
  brandLogo: string;
  title: string;
  description: string;
  brief: string;
  payoutPerVideo: number;
  deadline: string;
  exampleVideos: ExampleVideo[];
  tags: string[];
}

export interface Submission {
  id: string;
  campaignId: string;
  campaignTitle: string;
  brand: string;
  videoUrl: string;
  status: SubmissionStatus;
  submittedAt: string;
  feedback?: string;
}
