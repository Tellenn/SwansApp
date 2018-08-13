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
import { EditdefenseComponent } from './editdefense/editdefense';
import { EditattackComponent } from './editattack/editattack';
import { HeaderComponent } from './header/header';
import { ResistanceComponent } from './resistance/resistance';
import { EditstateComponent } from './editstate/editstate';
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
    EditspellComponent,
    EditdefenseComponent,
    EditattackComponent,
    HeaderComponent,
    ResistanceComponent,
    EditstateComponent],
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
    EditspellComponent,
    EditdefenseComponent,
    EditattackComponent,
    HeaderComponent,
    ResistanceComponent,
    EditstateComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
