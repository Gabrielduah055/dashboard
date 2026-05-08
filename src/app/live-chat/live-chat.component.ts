import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

type ChatMessage = {
  role: 'agent' | 'user';
  body: string;
  author?: string;
};

@Component({
  selector: 'app-live-chat',
  imports: [NgClass],
  templateUrl: './live-chat.component.html',
  styleUrl: './live-chat.component.css'
})
export class LiveChatComponent {
  readonly messages: ChatMessage[] = [
    {
      role: 'agent',
      body: "Hello! I'm your AI agent. How can I help you today?"
    },
    {
      role: 'user',
      author: 'Gabriel',
      body: "Hi, can you tell me about SiteQueue's pricing plans?"
    },
    {
      role: 'agent',
      body: 'Certainly! SiteQueue offers flexible pricing plans starting with our Basic plan, which is great for small teams. We also have Professional and Enterprise tiers with advanced features and dedicated support. Would you like more details on a specific plan?'
    },
    {
      role: 'user',
      author: 'Gabriel',
      body: "Yes, I'm interested in the Professional plan features."
    },
    {
      role: 'agent',
      body: 'Great choice! The Professional plan includes unlimited chats, advanced analytics, custom integrations, and priority support. It also allows for training your AI on larger datasets.'
    }
  ];
}
