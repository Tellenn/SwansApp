import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BarComponent } from './bar/bar';
import { ItemComponent } from './item/item';
import { EditComponent } from './edit/edit';
import { ReputationComponent } from './reputation/reputation';
import { MoneyComponent } from './money/money';
import { HeaderComponent } from './header/header';
import { ResistanceComponent } from './resistance/resistance';
import { ModalcompComponent } from './modalcomp/modalcomp';
@NgModule({
	declarations: [
    BarComponent,
    ItemComponent,
    EditComponent,
    ReputationComponent,
    MoneyComponent,
    HeaderComponent,
    ResistanceComponent,
    ModalcompComponent],
	imports: [],
  exports: [
    BarComponent,
    ItemComponent,
    EditComponent,
    ReputationComponent,
    MoneyComponent,
    HeaderComponent,
    ResistanceComponent,
    ModalcompComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
