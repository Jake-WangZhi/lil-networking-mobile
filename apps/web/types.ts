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
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  date: string;
  type: ActivityType;
  contactId: string;
}

export interface ContactArgs {
  id: string;
  isArchived?: boolean;
}

export interface ActivityArgs {
  id?: string;
  contactId?: string;
  title?: string;
  description?: string;
  date?: string;
  type?: ActivityType;
}

export enum ActivityType {
  USER = "USER",
  SYSTEM = "SYSTEM",
}

export interface GoalsArgs {
  networkingComfortLevel?: number;
  goalConnections: number;
  goalMessages: number;
}

export enum SearchParams {
  Email = "email",
  Name = "name",
  IsChanged = "is_changed",
  RedirectPath = "redirect_path",
  Title = "title",
  Date = "date",
  Description = "description",
  IsFromMessage = "is_from_message",
  IsFromProfile = "is_from_profile",
  IsFromSettings = "is_from_settings",
  IsFromDashboard = "is_from_dashboard",
  Endpoint = "endpoint",
}

export interface SubscriptionArgs {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}

export interface NotificationSettingsArgs {
  newAction: boolean;
  streak: boolean;
  meetGoal: boolean;
  subscriptionId: string;
}
