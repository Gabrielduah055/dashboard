import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

type Lead = {
  name: string;
  company: string;
  status: 'New' | 'In Progress';
  lastContact: string;
  source: 'Website' | 'Referral';
};

type ConversationMessage = {
  sender: 'AI' | 'Kofi';
  body: string;
  time: string;
};

@Component({
  selector: 'app-leads',
  imports: [NgClass],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.css'
})
export class LeadsComponent {
  readonly leads: Lead[] = [
    { name: 'Kwame Asante', company: 'Asante Tech', status: 'New', lastContact: 'Today, 9:30 AM', source: 'Website' },
    { name: 'Ama Osei', company: 'Osei Designs', status: 'In Progress', lastContact: 'Yesterday, 2:15 PM', source: 'Referral' },
    { name: 'Kwame Asante', company: 'Developer t\u00f9v\u00ectt', status: 'New', lastContact: 'Yesterday, 2:15 PM', source: 'Referral' },
    { name: 'Kofi Mensah', company: 'Kofan Tech', status: 'New', lastContact: 'Today, 10:30 AM', source: 'Website' },
    { name: 'Saram Runna', company: 'Vno Design', status: 'In Progress', lastContact: 'Yesterday, 2:15 PM', source: 'Referral' },
    { name: 'Emoie \u0178sante', company: 'Svarn Tech', status: 'New', lastContact: 'Today, 10:30 AM', source: 'Website' },
    { name: 'Sianshi Cara', company: 'Manitization', status: 'In Progress', lastContact: 'Yesterday, 2:15 PM', source: 'Referral' },
    { name: 'Winan Asante', company: 'Looi Tech', status: 'New', lastContact: 'Today, 9:30 AM', source: 'Website' },
    { name: 'Kofi Mensah', company: 'Osei Designs', status: 'In Progress', lastContact: 'Today, 9:30 AM', source: 'Referral' }
  ];

  readonly selectedLead = {
    name: 'Kofi Mensah',
    business: "Kofi's Kitchen",
    email: 'kofi@kofiskitchen.com',
    phone: '+233 50 123 4587',
    budget: '\u20b52,500',
    status: 'New'
  };

  readonly conversation: ConversationMessage[] = [
    { sender: 'AI', body: 'Hi Kofi, thanks for reaching out! How can we help you with your website needs?', time: '10:00 AM' },
    { sender: 'Kofi', body: "Hi, I'm interested in a new website for my catering business.", time: '10:05 AM' },
    { sender: 'AI', body: 'That sounds great! What specific features are you looking for?', time: '10:07 AM' },
    { sender: 'Kofi', body: 'I need a menu page and a contact form.', time: '10:12 AM' },
    { sender: 'AI', body: 'Perfect. We can prepare a clean catering website proposal with those features.', time: '10:14 AM' }
  ];

  statusClass(status: Lead['status']): string {
    return status === 'New' ? 'text-sq-text' : 'text-sq-text';
  }
}
