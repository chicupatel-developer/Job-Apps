import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
    imports: [
        MatSliderModule,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatTabsModule,
        MatSortModule
    ],
    exports: [
        MatSliderModule,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatTabsModule,
        MatSortModule
    ]
})
export class MaterialModule { }