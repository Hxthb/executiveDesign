import { Component,ElementRef,Renderer,Input } from '@angular/core'

import { ExecutiveService } from '../../services/Executive.service'
declare var $:any;
@Component({
	selector :'rule-dataCons',
	templateUrl :'./dataCons.component.html',
	styleUrls :["./dataCons.component.scss"],
})
export class DataConsComponent{
	//NewVarArray 存放添加变量的数组
	@Input('NewVarArray') NewVarArray:Array<any>
	//新增变量默认值
    defaultVariate : string
    //存放变量的文本
    varNameParameter  : string;
    //存放变量的说明
    varStateParameter : string;
    //存放变量的默认值
    varDefaultParameter: string;
    //存放变量的索引
    varIndex : number;
	constructor(private render :Renderer,private executiveService:ExecutiveService){
		
	}
	
    //隐藏变量参数栏Modal
    hideVarPar(modal:ElementRef){
        $(modal).modal('hide')
		this.executiveService.jqDropMethor()
    }
	//隐藏新增变量Modal
    hideNewValue(modal:ElementRef){
        $(modal).modal('hide')
        $('.form-control').val("")
		this.executiveService.jqDropMethor()
    }
    //弹出新增变量Modal
    addNewValue(modal:ElementRef){
        $(modal).modal('show')
    }
	//添加新变量到变量数组
    addNewVarPar(VarName:string,VarState:string,VarDefault:string){
        if(VarName == '' || VarName == null){
            VarName = '默认变量'
        }
        let VariateJson = {
            VarName   : VarName,
            VarState  : VarState,
            VarDefault: VarDefault
        }
        this.NewVarArray.push(VariateJson)
		this.executiveService.varDynamicData(this.NewVarArray)
        $('.form-control').val("")
    }
    //变量删除按钮
    enter(event,flag){
        this.render.setElementStyle(event.target.children[1],'display',flag)
    }
    //点击变量显示具体参数
    parameter(i:any,modal:ElementRef){
        $(modal).modal('show');
        this.varNameParameter = this.NewVarArray[i].VarName;
        this.varStateParameter = this.NewVarArray[i].VarState;
        this.varDefaultParameter = this.NewVarArray[i].VarDefault;
        this.varIndex = i;
    }
    alterVarPar(varIndex:number,VarName:string,VarState:string,VarDefault:string,modal:ElementRef){
        if(VarName == '' || VarName == null){
            VarName = '默认变量'
        }
        this.NewVarArray[varIndex].VarName = VarName;
        this.NewVarArray[varIndex].VarState = VarState;
        this.NewVarArray[varIndex].VarDefault = VarDefault;
        $(modal).modal('hide')
    }
	//删除当前变量值
    dropDelete(i:number){
        this.NewVarArray.splice(i,1)
    }
}