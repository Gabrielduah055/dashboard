import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  agentName = '';
  systemPrompt = '';
  selectedModel = 'GPT-4';
  emailNotifications = true;
  soundNotifications = false;
  apiKeyVisible = false;
  apiKey = 'sk-or-v1-4e5d7c8f8a9b0c1d2e3f4a5b6c7d';

  get displayedApiKey(): string {
    return this.apiKeyVisible ? this.apiKey : '••••••••••••••••••••••••••••••••••';
  }

  toggleApiKeyVisibility(): void {
    this.apiKeyVisible = !this.apiKeyVisible;
  }
}
