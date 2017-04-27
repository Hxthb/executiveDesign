import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http,HttpModule } from '@angular/http';
import { ExecutiveModule } from './executive/Executive.module';
import { SharedModule } from './shared/shared.module'
import { CoreModule } from './core/core.module'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import {
    TranslateModule,
    TranslateLoader,
    TranslateService
} from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
export function HttpLoaderFactory(http:Http){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    ExecutiveModule,
    SharedModule,
     TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[Http]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
