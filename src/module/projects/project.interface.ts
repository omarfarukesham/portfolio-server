export interface IProject {
  title: string;
  description: string;
  technologies: string[];
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  isFeatured?: boolean;
  details?: string;
  screenshots?: string[];
  videoDemoUrl?: string;
  clientName?: string;
  projectType?: 'Personal' | 'Freelance' | 'Company';
  duration?: string;
  tags?: string[];
}
