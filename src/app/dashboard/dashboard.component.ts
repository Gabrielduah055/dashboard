import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

type Metric = {
  label: string;
  value: string;
  trend: string;
  tone: string;
};

type Lead = {
  name: string;
  business: string;
  projectType: string;
  budget: string;
  status: string;
  statusClass: string;
  date: string;
};

type Activity = {
  title: string;
  time: string;
  color: string;
};

@Component({
  selector: 'app-dashboard',
  imports: [NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  readonly metrics: Metric[] = [
    { label: 'Total Leads', value: '1,284', trend: '+12%', tone: 'sq-stat-primary' },
    { label: 'New Today', value: '42', trend: '+5%', tone: 'sq-stat-wine' },
    { label: 'Qualified', value: '892', trend: '+8%', tone: 'sq-stat-purple' },
    { label: 'Booked Calls', value: '18', trend: '+2', tone: 'sq-stat-orange' }
  ];

  readonly leads: Lead[] = [
    { name: 'Kofi Mensah', business: 'TechWave Ghana', projectType: 'E-commerce', budget: '\u20b55,000-10,000', status: 'New', statusClass: 'bg-sq-wine', date: 'Oct 26' },
    { name: 'Ama Owusu', business: 'Owusu Logistics', projectType: 'Web Redesign', budget: '\u20b53,000-5,000', status: 'Qualified', statusClass: 'bg-sq-primary', date: 'Oct 26' },
    { name: 'Kwame Boateng', business: 'Boateng Real Estate', projectType: 'SEO & Content', budget: '\u20b58,000+', status: 'Contacted', statusClass: 'bg-sq-purple', date: 'Oct 25' },
    { name: 'Akosua Osei', business: 'Osei Law Firm', projectType: 'Branding & Web', budget: '\u20b510,000+', status: 'In Progress', statusClass: 'bg-sq-gold', date: 'Oct 25' },
    { name: 'Yaw Addo', business: 'Addo Constructions', projectType: 'Landing Page', budget: '\u20b52,000-4,000', status: 'Closed', statusClass: 'bg-sq-red', date: 'Oct 24' }
  ];

  readonly activities: Activity[] = [
    { title: 'New lead captured: Kofi Mensah', time: '10:15 AM', color: 'bg-sq-primary' },
    { title: 'AI Qualified: Ama Owusu', time: '9:45 AM', color: 'bg-sq-purple' },
    { title: 'Booking scheduled with Kwame Boateng', time: 'Oct 25, 4:30 PM', color: 'bg-sq-wine' },
    { title: 'Proposal sent to Akosua Osei', time: 'Oct 25, 2:15 PM', color: 'bg-sq-gold' },
    { title: 'Lead marked as closed: Yaw Addo', time: 'Oct 24, 11:00 AM', color: 'bg-sq-red' }
  ];

  readonly conversionBars = ['h-11', 'h-16', 'h-20', 'h-14', 'h-16', 'h-12', 'h-14', 'h-17', 'h-12', 'h-12', 'h-18', 'h-14'];
  readonly activeBars = new Set([0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11]);
}
