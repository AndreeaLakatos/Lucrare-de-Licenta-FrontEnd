import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

const modules = {
    material: [
        MatCardModule,
        MatFormFieldModule,
        MatSliderModule,
        MatListModule,
        MatTableModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatRadioModule,
        MatSnackBarModule,
        MatSelectModule
    ],
    angular: [CommonModule, ReactiveFormsModule, FormsModule]
}

@NgModule({
    declarations: [],
    imports: [...modules.angular, ...modules.material],
    exports: [...modules.angular, ...modules.material]
})

export class SharedModule {}