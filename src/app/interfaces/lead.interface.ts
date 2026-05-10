export interface LeadConversationMessage {
  sender?: string;
  role?: string;
  body?: string;
  message?: string;
  content?: string;
  text?: string;
  time?: string;
  timestamp?: string;
  createdAt?: string;
}

export interface Lead {
  _id: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  status: string;
  createdAt: string;
  conversation: LeadConversationMessage[];
}
