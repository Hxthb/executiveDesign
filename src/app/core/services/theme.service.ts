// 主题服务（修改主题、注销某个指令实例等）
import { Injectable,Renderer,ElementRef } from '@angular/core'

export interface ThemeInstance{
    render:Renderer;
    ele:ElementRef;
}

@Injectable()
export class ThemeService{
    themeKey:string='theme'
    themeFlags:Array<string>=[
        'theme-blue','theme-green'
    ]
    instances:Array<ThemeInstance>=[]

    //为需要应用的当前用到指令的实例提供容器，返回一个索引供后期销毁
    addInstance(ti:ThemeInstance):number{
        this.instances.push(ti)
        return this.getInstanceCount()
    }
    //选择主题
    changeTheme(themeName:string){
        if(!(localStorage.getItem(this.themeKey)===themeName)){
            localStorage.setItem(this.themeKey,themeName)
        }
        this.doChange(themeName)
    }
    //销毁指令实例，防止内存溢出
    destoryInstance(index:number){
        this.instances.splice(index,1)
    }
    //改变所有应用主题指令的样式（主题样式需开发者提供）
    doChange(theme:string){
        for(let ins of this.instances){
            ins.render.setElementAttribute(ins.ele.nativeElement,'class',theme)
        }
    }
    //获取容器容量
    getInstanceCount():number{
        return this.instances.length
    }
    //获取当前主题
    getTheme(){
        if(!localStorage.getItem(this.themeKey)){
            localStorage.setItem(this.themeKey,'theme-blue')
        }
        return localStorage.getItem(this.themeKey)
    }

    //切换主题
    themeBlue(){
        this.changeTheme(this.themeFlags[0])
    }
    themeGreen(){
        this.changeTheme(this.themeFlags[1])
    }
}