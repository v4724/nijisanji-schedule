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
import { MemberComponent } from './feature/member/member.component'

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent
  ],
  imports: [
    BrowserModule,
    MdbModalModule,
    MdbFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, AngularFireDatabaseModule
  ],
  providers: [
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
