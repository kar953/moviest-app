import { MatGridListModule } from '@angular/material/grid-list';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [MatAutocompleteModule, MatInputModule, MatGridListModule, MatCardModule, MatChipsModule, MatButtonModule],
  exports: [MatAutocompleteModule, MatInputModule, MatGridListModule, MatCardModule, MatChipsModule, MatButtonModule]
})

export class AngularMaterialModule {
}
