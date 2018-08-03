import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MenuComponent } from './menu/menu';
import { LifebarComponent } from './lifebar/lifebar';
import { MentalbarComponent } from './mentalbar/mentalbar';
@NgModule({
	declarations: [MenuComponent,
    LifebarComponent,
    MentalbarComponent],
	imports: [],
	exports: [MenuComponent,
    LifebarComponent,
    MentalbarComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
