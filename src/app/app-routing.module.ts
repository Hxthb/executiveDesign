import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes:Routes=[
	{
		path:'executive',
		loadChildren:'./executive/Executive.module#ExecutiveModule',
	},
	{
		path:'',
		redirectTo:'executive',
		pathMatch:'full'
	}
]
@NgModule({
	imports:[
		RouterModule.forRoot(routes)
	],
	exports:[
		RouterModule
	],
	providers:[
		
	]
})
export class AppRoutingModule{}