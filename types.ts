export interface Action {
  contactFirstName: string;
  contactLastName: string;
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
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  industry: string;
  goalDays: number;
  email: string;
  phone: string;
  links: string[];
  interests: string[];
  activities: Activity[];
  isArchived: boolean;
}

export interface Activity {
  id: string;
  contactId: string;
  title: string;
  description: string;
  date: string;
  type: ActivityType;
}

export enum ActivityType {
  USER = "USER",
  SYSTEM = "SYSTEM",
}