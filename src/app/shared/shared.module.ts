import { CommonModule } from '@angular/common'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { HttpModule,Http } from '@angular/http'
import { NgModule,ModuleWithProviders } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { NavBarComponent } from './components/navBar/navBar.component'

import { ThemeDirective } from './directives/theme.directive'
import { ToArrayPipe } from './pipes/toArray.pipe'

@NgModule({
    imports:[
        CommonModule
    ],
    declarations:[
        NavBarComponent,
        ThemeDirective,
        ToArrayPipe
    ],
    exports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        TranslateModule,
        //导出可公用组件
        NavBarComponent,
        ThemeDirective,
        ToArrayPipe
    ]
})
export class SharedModule{
    static forRoot():ModuleWithProviders{
        return {
            ngModule:SharedModule
        }
    }
}