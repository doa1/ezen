import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule, MatTableModule, MatToolbarModule, MatPaginatorModule,
   MatSortModule, MatMenuItem} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChartsModule} from 'ng2-charts';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  imports: [
    CommonModule, MatInputModule, MatTableModule,
     MatToolbarModule, MatPaginatorModule, MatSortModule,
     BrowserAnimationsModule, ChartsModule,
      MatExpansionModule, MatSelectModule,
    ],
  exports: [MatInputModule, MatTableModule,
     MatToolbarModule,
      MatPaginatorModule, ChartsModule, MatExpansionModule,
    BrowserAnimationsModule, MatSortModule, MatSelectModule,
    ],
  declarations: [],
})
export class MaterialsModule { }
