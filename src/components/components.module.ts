import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BarComponent } from './bar/bar';
import { ItemComponent } from './item/item';
import { EditComponent } from './edit/edit';
import { ReputationComponent } from './reputation/reputation';
import { MoneyComponent } from './money/money';
import { HeaderComponent } from './header/header';
import { ResistanceComponent } from './resistance/resistance';
import { ModalcompComponent } from './modalcomp/modalcomp';
import { RecapCharComponent } from './recap-char/recap-char';
import { ModalFilterComponent } from './modal-filter/modal-filter';
import { AdrenalineComponent } from './adrenaline/adrenaline';
@NgModule({
	declarations: [
    BarComponent,
    ItemComponent,
    EditComponent,
    ReputationComponent,
    MoneyComponent,
    HeaderComponent,
    ResistanceComponent,
    ModalcompComponent,
    RecapCharComponent,
    ModalFilterComponent,
    AdrenalineComponent],
	imports: [],
  exports: [
    BarComponent,
    ItemComponent,
    EditComponent,
    ReputationComponent,
    MoneyComponent,
    HeaderComponent,
    ResistanceComponent,
    ModalcompComponent,
    RecapCharComponent,
    ModalFilterComponent,
    AdrenalineComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
