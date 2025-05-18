export interface IExperience {
  _id?: string; 
  company: string;
  role: string;
  description: string;
  startDate: Date;
  endDate?: Date | null;
  location?: string;
  technologies?: string[];
  isCurrent?: boolean;
  companyIcon?: string; 
}
