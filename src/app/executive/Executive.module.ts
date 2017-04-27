import { NgModule } from "@angular/core";

import { ExecutiveComponent } from './Executive.component'
import { DataConsComponent } from './controls/dataCons/dataCons.component'
import { DisposeConsComponent } from './controls/disposeCons/disposeCons.component'
import { EventConsComponent } from './controls/eventCons/eventCons.component'
import { AnalyzeDomJsonService } from './services/analyzeDomJson.service'
import { ExecutiveService } from './services/Executive.service'
import { SharedModule } from '../shared/shared.module'
import { ExecutiveRoutingModule } from './Executive-routing.module';


@NgModule({
    imports : [
        SharedModule,
        ExecutiveRoutingModule,
    ],
    declarations :[ExecutiveComponent,DataConsComponent,DisposeConsComponent,EventConsComponent],
    providers:[
        ExecutiveService,
    AnalyzeDomJsonService
    ]
})

export class ExecutiveModule {

}