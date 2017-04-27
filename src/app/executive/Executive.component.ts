import {
  Component,
  ElementRef,
  Renderer,
  OnInit 
} from '@angular/core';

import { SaveDataService } from '../core/services/save-data.service'
import { ExecutiveService } from './services/Executive.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangeLangService } from '../core/services/change-lang.service'
declare var $ :any;
@Component({
	selector :'rule-Executive',
	templateUrl :'./Executive.component.html',
	styleUrls :["./themes/Executive.component.scss"],
	})
export class ExecutiveComponent implements OnInit{
    NewVarArray:Array<any> = []
    //数据列表JSON样式
    postKeyWords: Array<any>
    //存放添加的关键字JSON
    KeyStrObj :{}
    //关键字名称
    list :string
    //导航栏名称
    navTitle : string
    //Modal 导航栏名称
    Modaltitle : string
    //当前选择模块名称
    selectedModule:string
    /*-------2016.11.25-----------*/
    //JSON数据解析
    designJson : Object
    //提交按钮禁用
    isDisable : boolean
    //请求缓存显示
    isLogout  : boolean
   /*****/
    constructor(
        private executiveService: ExecutiveService,
        private saveDataService : SaveDataService,
        private elementRef : ElementRef,
        public  langService: ChangeLangService) {
        //订阅 控件组件数据流
        executiveService.varDataSubject$.subscribe(data => {
            this.NewVarArray = data
        })
        // 初始语言与上一次选择的一致
        this.langService.autoLang()
    }
    ngOnInit() { 
        this.initData()
        this.jquery()
     }
    initData() {
        this.list = 'Dispose'
        this.navTitle = '执行体绑定'        
        this.saveDataService.setTitle('执行体设计界面')
     }
    //$Jquery 控制拖拽函数的开启
    jquery(){
        this.executiveService.jqDropMethor()
    } 
    //保存为json文件（测试）
    save(modal: ElementRef) {
        $(modal).modal('show')
        let result = this.executiveService.dropSave($('.droppable').children('.draggable ').children('.Function-row'))
        result ? this.isDisable = false:this.isDisable = true        
        this.designJson = result ? JSON.stringify(result, null, 2) : null
    }
    //提交JSON
    exeSubmit(){
        alert('未设置相关提交方法')
        //push serve
        // if(this.executiveService){
        //     this.executiveService.submitJson(this.designJson).subscribe(
        //         res =>{  
        //             console.log(1)
        //         }
        //     )
        // }
    }
    exeReturn(modal:ElementRef){
        $(modal).modal('hide')
    }
    //左侧列表点击添加Class
    onSelect(ClassName:string){
        $('.ctrl-lib-wrap').animate({scrollTop:0},1000);//回到顶端
        this.list = this.selectedModule = ClassName;
        this.jquery();
    }
    openHelpDocument(modal:ElementRef){
        $(modal).modal('show')
    }  
}