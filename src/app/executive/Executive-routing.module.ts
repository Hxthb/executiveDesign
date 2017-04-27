//路由配置模块
import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router'
import { ExecutiveComponent } from './Executive.component'

const routers:Routes=[
    {
        path:'',
        component:ExecutiveComponent
    }
]
@NgModule({
    imports:[
        RouterModule.forChild(routers)
    ],
    exports:[
        RouterModule
    ]
})
export class ExecutiveRoutingModule{}