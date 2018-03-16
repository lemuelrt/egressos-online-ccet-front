import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AdminModule } from './components/admin/admin.module';
import { AppComponent } from './app.component';
import { CoordComponent } from './components/coord/coord.component';
import { CoordEgressoFormComponent } from './components/coord/coord-egresso-form/coord-egresso-form.component';
import { CoordEgressosImportComponent } from './components/coord/coord-egressos-import/coord-egressos-import.component';
import { CoordEgressoIndexComponent } from './components/coord/coord-egresso-index/coord-egresso-index.component';



@NgModule({
  declarations: [
    AppComponent,
    CoordComponent,
    CoordEgressoFormComponent,
    CoordEgressosImportComponent,
    CoordEgressoIndexComponent,
    CoordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
