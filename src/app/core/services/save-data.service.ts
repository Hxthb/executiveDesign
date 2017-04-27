import { Injectable } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Observable }　from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class SaveDataService {
	//流 供日期格式组件监听
	private dateFormat:Subject<string>
	dateFormat$:Observable<string>
	constructor(
		private titleService: Title
	)  { 
		this.dateFormat=new Subject<string>()
		this.dateFormat$=this.dateFormat.asObservable()
	}
	setTitle(newTitle:string) {  //设置窗口标题
		this.titleService.setTitle(newTitle)
	}
	setDate(i:any) {
		let date:string
		if (i < 10) {
			date = '0' + i
		} else {
			date = i
		}
		return date
	}
	//日期格式改变
	dateFormatChange(str:string){
		this.dateFormat.next(str)
	}
}