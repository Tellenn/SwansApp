import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MenuComponent } from './menu/menu';
import { LifebarComponent } from './lifebar/lifebar';
import { MentalbarComponent } from './mentalbar/mentalbar';
import { FatiguebarComponent } from './fatiguebar/fatiguebar';
import { ConcentrationbarComponent } from './concentrationbar/concentrationbar';
import { ItemComponent } from './item/item';
@NgModule({
	declarations: [MenuComponent,
    LifebarComponent,
    MentalbarComponent,
    FatiguebarComponent,
    ConcentrationbarComponent,
    ItemComponent],
	imports: [],
	exports: [MenuComponent,
    LifebarComponent,
    MentalbarComponent,
    FatiguebarComponent,
    ConcentrationbarComponent,
    ItemComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
