import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Lead, LeadConversationMessage } from '../interfaces/lead.interface';
import { LeadsService } from '../services/leads.service';

@Component({
  selector: 'app-leads',
  imports: [NgClass],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.css'
})
export class LeadsComponent implements OnInit {
  leads: Lead[] = [];
  selectedLead: Lead | null = null;
  searchTerm = '';
  currentPage = 1;
  readonly pageSize = 10;
  isLoading = true;
  isUpdatingStatus = false;
  errorMessage = '';

  constructor(private readonly leadsService: LeadsService) {}

  get filteredLeads(): Lead[] {
    const search = this.searchTerm.trim().toLowerCase();

    if (!search) {
      return this.leads;
    }

    return this.leads.filter((lead) => {
      const values = [lead.name, lead.business, lead.email, lead.phone, lead.projectType, lead.status];
      return values.some((value) => value.toLowerCase().includes(search));
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredLeads.length / this.pageSize);
  }

  get shouldPaginate(): boolean {
    return this.filteredLeads.length > this.pageSize;
  }

  get paginatedLeads(): Lead[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredLeads.slice(start, start + this.pageSize);
  }

  get firstVisibleLead(): number {
    if (this.filteredLeads.length === 0) {
      return 0;
    }

    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get lastVisibleLead(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredLeads.length);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  ngOnInit(): void {
    this.loadLeads();
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
  }

  selectLead(lead: Lead): void {
    this.selectedLead = lead;
  }

  closeLeadPanel(): void {
    this.selectedLead = null;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
  }

  updateSelectedLeadStatus(status: string): void {
    if (!this.selectedLead) {
      return;
    }

    const currentLead = this.selectedLead;
    const leadId = currentLead._id;
    this.isUpdatingStatus = true;

    this.leadsService.updateLeadStatus(leadId, status).subscribe({
      next: (updatedLead) => {
        const replacement = updatedLead?._id ? updatedLead : { ...currentLead, status };
        this.leads = this.leads.map((lead) => lead._id === leadId ? replacement : lead);
        this.selectedLead = replacement;
        this.isUpdatingStatus = false;
      },
      error: (err) => {
        console.error('Failed to update lead status:', err);
        this.errorMessage = 'Failed to update the lead status.';
        this.isUpdatingStatus = false;
      }
    });
  }

  statusClass(status: string): string {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === 'qualified' || normalizedStatus === 'booked') {
      return 'text-sq-primary';
    }

    if (normalizedStatus === 'closed') {
      return 'text-sq-red';
    }

    return 'text-sq-text';
  }

  statusPillClass(status: string): string {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === 'qualified') {
      return 'lead-status-qualified';
    }

    if (normalizedStatus === 'booked') {
      return 'lead-status-booked';
    }

    if (normalizedStatus === 'closed') {
      return 'lead-status-closed';
    }

    if (normalizedStatus === 'contacted') {
      return 'lead-status-contacted';
    }

    return 'lead-status-new';
  }

  displayStatus(status: string): string {
    return status
      .split(/[\s_-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  formatDateTime(dateValue: string | undefined): string {
    if (!dateValue) {
      return 'N/A';
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return 'N/A';
    }

    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  conversationSender(message: LeadConversationMessage): string {
    return message.sender ?? message.role ?? 'AI';
  }

  conversationBody(message: LeadConversationMessage): string {
    return message.body ?? message.message ?? message.content ?? message.text ?? '';
  }

  conversationTime(message: LeadConversationMessage): string {
    return this.formatDateTime(message.time ?? message.timestamp ?? message.createdAt);
  }

  isCustomerMessage(message: LeadConversationMessage): boolean {
    const sender = this.conversationSender(message).toLowerCase();
    return sender !== 'ai' && sender !== 'assistant' && sender !== 'bot' && sender !== 'system';
  }

  private loadLeads(): void {
    this.leadsService.getLeads().subscribe({
      next: (leads) => {
        this.leads = leads;
        this.selectedLead = null;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch leads:', err);
        this.errorMessage = 'Failed to fetch leads from the backend.';
        this.isLoading = false;
      }
    });
  }
}
