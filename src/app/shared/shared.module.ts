import { CommonModule } from '@angular/common'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { HttpModule,Http } from '@angular/http'
import { NgModule,ModuleWithProviders } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { NavBarComponent } from './components/navBar/navBar.component'

@NgModule({
    imports:[
        CommonModule
    ],
    declarations:[
        NavBarComponent,
    ],
    exports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        TranslateModule,
        //导出可公用组件
        NavBarComponent,
    ]
})
export class SharedModule{
    static forRoot():ModuleWithProviders{
        return {
            ngModule:SharedModule
        }
    }
}