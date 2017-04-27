import { NgModule , ModuleWithProviders } from '@angular/core'
import { Title } from '@angular/platform-browser'

import { ChangeLangService } from './services/change-lang.service'
import { SaveDataService } from './services/save-data.service'
import { HttpService } from './services/http.service'

@NgModule({
    providers:[
        Title,
        ChangeLangService,
        SaveDataService,
        HttpService,
    ]
})
export class CoreModule{
    static forRoot():ModuleWithProviders{
        return{
            ngModule:CoreModule
        }
    }
}