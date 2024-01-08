import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { ClaimsComponent } from './claims/claims.component';
import { InvestesmentsComponent } from './investesments/investesments.component';
import { ProjectsComponent } from './projects/projects.component';
import { EvenementComponent } from './evenement/evenement.component';



export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'table',
				component: TableComponent
			},
			{
				path: 'card',
				component: CardsComponent
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent
			},
			{
				path: 'badges',
				component: BadgeComponent
			},
			{
				path: 'alert',
				component: NgbdAlertBasicComponent
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent
			},
			{
				path: 'nav',
				component: NgbdnavBasicComponent
			},
			{
				path: 'buttons',
				component: ButtonsComponent
			},
			{
				path: 'consultation',
				component: ConsultationComponent
			},
			{
				path: 'claims',
				component: ClaimsComponent
			},
			{
				path: 'investesments',
				component: InvestesmentsComponent
			},
			{
				path: 'projects',
				component: ProjectsComponent
			},
			{
				path: 'event',
				component: EvenementComponent
			},
			
		]
	}
];
