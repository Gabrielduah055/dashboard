import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Lead } from '../interfaces/lead.interface';
import { LeadsService } from '../services/leads.service';

type Metric = {
  label: string;
  value: string;
  trend: string;
  tone: string;
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
export class DashboardComponent implements OnInit {
  metrics: Metric[] = this.buildMetrics([]);
  recentLeads: Lead[] = [];
  isLoading = true;
  errorMessage = '';

  activities: Activity[] = [];

  readonly conversionBars = ['h-11', 'h-16', 'h-20', 'h-14', 'h-16', 'h-12', 'h-14', 'h-17', 'h-12', 'h-12', 'h-18', 'h-14'];
  readonly activeBars = new Set([0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11]);

  constructor(private readonly leadsService: LeadsService) {}

  ngOnInit(): void {
    this.leadsService.getLeads().subscribe({
      next: (leads) => {
        this.recentLeads = leads.slice(0, 5);
        this.metrics = this.buildMetrics(leads);
        this.activities = this.buildActivities(leads);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch leads:', err);
        this.errorMessage = 'Failed to fetch leads from the backend.';
        this.isLoading = false;
      }
    });
  }

  statusClass(status: string): string {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === 'qualified') {
      return 'bg-sq-primary';
    }

    if (normalizedStatus === 'booked') {
      return 'bg-sq-purple';
    }

    if (normalizedStatus === 'closed') {
      return 'bg-sq-red';
    }

    if (normalizedStatus === 'in progress' || normalizedStatus === 'contacted') {
      return 'bg-sq-gold';
    }

    return 'bg-sq-wine';
  }

  displayStatus(status: string): string {
    return status
      .split(/[\s_-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  formatDate(dateValue: string): string {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return 'N/A';
    }

    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  private buildMetrics(leads: Lead[]): Metric[] {
    const today = new Date().toDateString();
    const qualified = leads.filter((lead) => lead.status.toLowerCase() === 'qualified').length;
    const booked = leads.filter((lead) => lead.status.toLowerCase() === 'booked').length;
    const newToday = leads.filter((lead) => new Date(lead.createdAt).toDateString() === today).length;

    return [
      { label: 'Total Leads', value: leads.length.toLocaleString(), trend: `${leads.length}`, tone: 'sq-stat-primary' },
      { label: 'New Today', value: newToday.toLocaleString(), trend: `${newToday}`, tone: 'sq-stat-wine' },
      { label: 'Qualified', value: qualified.toLocaleString(), trend: `${qualified}`, tone: 'sq-stat-purple' },
      { label: 'Booked Calls', value: booked.toLocaleString(), trend: `${booked}`, tone: 'sq-stat-orange' }
    ];
  }

  private buildActivities(leads: Lead[]): Activity[] {
    return leads.slice(0, 5).map((lead) => ({
      title: `Lead captured: ${lead.name}`,
      time: this.formatDate(lead.createdAt),
      color: this.statusClass(lead.status)
    }));
  }
}
