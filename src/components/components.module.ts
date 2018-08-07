import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LifebarComponent } from './lifebar/lifebar';
import { MentalbarComponent } from './mentalbar/mentalbar';
import { FatiguebarComponent } from './fatiguebar/fatiguebar';
import { ConcentrationbarComponent } from './concentrationbar/concentrationbar';
import { ItemComponent } from './item/item';
import { EdititemComponent } from './edititem/edititem';
import { ReputationComponent } from './reputation/reputation';
import { EditreputComponent } from './editreput/editreput';
import { MoneyComponent } from './money/money';
import { EditNumberModalComponent } from './edit-number-modal/edit-number-modal';
import { EditspellComponent } from './editspell/editspell';
@NgModule({
	declarations: [
    LifebarComponent,
    MentalbarComponent,
    FatiguebarComponent,
    ConcentrationbarComponent,
    ItemComponent,
    EdititemComponent,
    ReputationComponent,
    EditreputComponent,
    MoneyComponent,
    EditNumberModalComponent,
    EditspellComponent],
	imports: [],
	exports: [
    LifebarComponent,
    MentalbarComponent,
    FatiguebarComponent,
    ConcentrationbarComponent,
    ItemComponent,
    EdititemComponent,
    ReputationComponent,
    EditreputComponent,
    MoneyComponent,
    EditNumberModalComponent,
    EditspellComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
