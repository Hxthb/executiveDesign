//主题指令
import { 
    Directive,
    Input,
    ElementRef,
    Renderer,
    OnInit,
    OnDestroy
} from '@angular/core'

import { ThemeService,ThemeInstance } from '../../core/services/theme.service'

@Directive({
    selector:'[cy-theme]'
})
export class ThemeDirective implements OnInit,OnDestroy{
    //方便销毁主题指令实例
    instanceIndex:number
    constructor(
        private themeService:ThemeService,
        private render:Renderer,
        private ele:ElementRef){
        //注入实例容器
        let instance:ThemeInstance={
            render:this.render,
            ele:this.ele
        }
        this.instanceIndex=themeService.addInstance(instance)-1
    }
    ngOnInit(){
        //默认根据当前主题变化
        this.render.setElementAttribute(
            this.ele.nativeElement,
            'class',
            this.themeService.getTheme())
    }
    ngOnDestroy(){
        //销毁指令实例
        this.themeService.destoryInstance(this.instanceIndex)
    }
}