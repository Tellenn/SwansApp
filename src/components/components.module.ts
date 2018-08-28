import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BarComponent } from './bar/bar';
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
import { ModalcompComponent } from './modalcomp/modalcomp';
@NgModule({
	declarations: [
    BarComponent,
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
    EditstateComponent,
    ModalcompComponent],
	imports: [],
  exports: [
    BarComponent,
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
    EditstateComponent,
    ModalcompComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
