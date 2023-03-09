import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal'
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { CloseScrollStrategy, Overlay } from '@angular/cdk/overlay'
import { DirectiveModule } from '@app/directive/directive.module'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebsiteInfoComponent } from './feature/website-info/website-info.component'
export function scrollFactory(overlay: Overlay): () => CloseScrollStrategy {
  return () => overlay.scrollStrategies.close();
}
@NgModule({
  declarations: [
    AppComponent,
    WebsiteInfoComponent
  ],
  imports: [
    ScrollingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MdbModalModule,
    MdbFormsModule,
    DirectiveModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, AngularFireDatabaseModule
  ],
  providers: [
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    },
    { provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
