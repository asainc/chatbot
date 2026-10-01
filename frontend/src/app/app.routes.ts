/** Rotas atuais da plataforma jurídica. */
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ai-ready',
    loadComponent: () => import('./ai-ready/ai-ready-page.component').then(module => module.AiReadyPageComponent),
  },
  {
    path: 'bjn',
    loadComponent: () => import('./templates/application-template-page.component').then(module => module.ApplicationTemplatePageComponent),
    data: {
      title: 'BJN',
      description: 'Espaço independente preservado para evolução futura do projeto BJN.',
      initials: 'BJ',
      stage: 'Template em preparação',
    },
  },
  {path: '', pathMatch: 'full', redirectTo: 'ai-ready'},
  {path: '**', redirectTo: 'ai-ready'},
];
