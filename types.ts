export interface Action {
  contactName: string;
  days: number;
  contactIndustry: string;
  description: string | null;
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
  email: string | null;
  phone: string | null;
  links: string[] | null;
  interests: string[] | null;
  activities: Activity[] | null;
  isArchived: boolean;
}

export interface Activity {
  id: string;
  contactId: string;
  title: string;
  description: string | null;
  date: string;
}
