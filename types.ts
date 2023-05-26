export interface Action {
  contactName: string;
  days: number;
  contactIndustry: string;
  description: string;
  goalDays: number;
}

export enum ActionType {
  Past = "past",
  Upcoming = "upcoming",
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  goalDays: number;
  email?: string;
  phone?: string;
  links?: string[];
  interests?: string[];
  activities?: Activity[];
}

export interface Activity {
  title: string;
  description?: string;
  date: string;
}
