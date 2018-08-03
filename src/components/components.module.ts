import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MenuComponent } from './menu/menu';
import { ProgressbarComponent } from './progressbar/progressbar';
@NgModule({
	declarations: [MenuComponent,
    ProgressbarComponent],
	imports: [],
	exports: [MenuComponent,
	ProgressbarComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
