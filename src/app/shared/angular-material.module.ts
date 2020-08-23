import { MatGridListModule } from '@angular/material/grid-list';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    MatAutocompleteModule, MatInputModule, MatGridListModule, MatCardModule, MatChipsModule, MatButtonModule, MatProgressSpinnerModule],
  exports: [
    MatAutocompleteModule, MatInputModule, MatGridListModule, MatCardModule, MatChipsModule, MatButtonModule, MatProgressSpinnerModule]
})

export class AngularMaterialModule {
}
