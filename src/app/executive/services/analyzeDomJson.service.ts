//生成控件DOM解析的json  服务
import { Injectable } from '@angular/core'
declare var $:any;
@Injectable()
export class AnalyzeDomJsonService{
    //当前拖拽区内数据数组
    DomObjArray : Array<any> = []
    //存储所有子节点DOM数组
    ChihdDom : Array<any> = []
    //存储当前HTML对象
    domHtml : Object = {}
    //存储对象
    domJson : Object

    constructor(){}
    /**     
     * @desc      整体JSON解析
     * @function  createDropResolve    解析当前Logic组件  
     */
    public createDropResolve(obj){
        if(!obj.length){
            return ''
        }
        this.domJson = {};
        for(let [key,value] of (<any>Object).entries($(obj))){
            if(key != 'prevObject' && key != 'length'){
                this.domJson[key] = {
                    title:$(value).attr('title')|| '空',
                    childs:[]
                }
                 this.domHtml[key] = {}
                 //解析单独控件子节点
                 for(let [index,domHtml] of (<any>Object).entries($(value).children('.FunctionChilds').children())){
                     if(index != 'prevObject' && index != 'length'){
                        this.domJson[key].childs.push({
                            title:$(domHtml).attr('title')|| '空',
                            childs:[]
                        })
                        this.domHtml[key][index] = $(domHtml).children('.Content')
                    } 
                 }    
            }
        }
        this.logicResolve(this.domJson,this.domHtml)
        return this.domJson;
    }
    //子节点解析
    /**     
     * @desc      解析当前放置区子节点
     * @function  logicResolve              解析子节点组件，根据标识分别执行不同解析方法 
     * @function  executiveResolve      执行条件体组件
     * @function  logicChildResolve      执行嵌套Logic组件
     * @function  eventResolve          执行解析Event组件
    */
    public logicResolve(DomArray,DomHtml){
        for(let [DomKey,DomValue] of (<any>Object).entries(DomArray)){
            for (let [ChildKey,ChildValue] of (<any>Object).entries(DomValue.childs)){
                for(let [key,value] of (<any>Object).entries($(DomHtml[DomKey][ChildKey]))){
                    if(key != 'prevObject' && key != 'length'){                                    
                        if($(value).html() == ''){
                            continue;
                        }
                        let inputNode = $(value).children()
                        if(inputNode.length == 0){
                            ChildValue.childs.push({    
                                     title:ChildValue.title  || '空',
                                     value:$(value).text() || '空',
                            })
                            continue;
                        }else{              
                            for(let [InputKey,InputValue] of (<any>Object).entries($(inputNode))){
                                if(InputKey != 'prevObject' && InputKey != 'length'){ 
                                    this.domJson[DomKey].childs[ChildKey].childs.push({
                                        title:$(InputValue).children().attr("title")|| $(InputValue).attr("title") || '空',
                                        childs:[]
                                    })
                                    if($(InputValue).hasClass('inputText')){
                                            this.executiveResolve(InputValue,this.domJson[DomKey].childs[ChildKey].childs,InputKey)   
                                    }
                                    else{
                                        if($(InputValue).hasClass('Logicdrop')){
                                            this.eventResolve(InputValue,this.domJson[DomKey].childs[ChildKey].childs,InputKey)
                                        }else{
                                            this.logicChildResolve(InputValue,this.domJson[DomKey].childs[ChildKey].childs,InputKey)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /**     
     * @desc      解析处理模块嵌套层
     * @function  LogicChildRecursion         
    */
    public logicChildResolve(inputNode,Attrs,index){
        let HTMLDOMS = {}
        for(let [key,value] of (<any>Object).entries($(inputNode))){
            if(key != 'prevObject' && key != 'length'){
                Attrs[index].childs[key] = {
                    childs:[]
                }
                 HTMLDOMS[key] = {}
                 //解析单独控件子节点
                 for(let [DomKey,DomChilds] of (<any>Object).entries($(value).children('.Function-row').children('.FunctionChilds').children())){
                     if(DomKey != 'prevObject' && DomKey != 'length'){
                        Attrs[index].childs[key].childs.push({
                            title:$(DomChilds).attr('title')|| '空',
                            childs:[]
                        })
                        HTMLDOMS[key][DomKey] = $(DomChilds)
                    } 
                 }    
            }
        }
        this.LogicChildRecursion(Attrs[index],HTMLDOMS,index)        
    }
    //解析处理模块（执行）
    executiveResolve(inputNode,Attrs,index){
        if($(inputNode).children('.ExecuteField').children().length > 0){
            Attrs[index].childs.push({
                title:$(inputNode).attr('title')|| '空',
                childs:[],
            })
            this.eventResolve($(inputNode).children('.ExecuteField').children(),Attrs[index].childs,0)
        }else{
            Attrs[index].childs.push({
                title:$(inputNode).attr('title')|| '空',
                value:$(inputNode).find('.ExecuteField').html() || '空',
            })
        }
    }
    //解析处理模块（递归处理）
    LogicChildRecursion(DomArray,DomHtml,index){
        for (let [ChildKey,ChildValue] of (<any>Object).entries(DomHtml)){
            for (let [ChildKey,ChildValue] of (<any>Object).entries(DomArray.childs)){
                for(let [key,value] of (<any>Object).entries(DomHtml[ChildKey])){
                    if(key != 'prevObject' && key != 'length'){   
                        let inputNode = $(value).children(),ChildsNode;
                        for(let component of (<any>Object).values(inputNode)){
                            //判断当前容器字段
                            if($(component).hasClass('Content')){
                                 //如果控件内值为空，则判断无子节点
                                 if($(component).text() == '')
                                 {
                                     continue; //跳出循环
                                 }
                                 //获取子阶段
                                 ChildsNode = $(component).children();
                                 //判断有子控件还是文本值
                                 if(ChildsNode.length == 0){
                                    ChildValue.childs[ChildKey].childs.push({    
                                        value:$(component).text() || '空',
                                    })
                                    continue;
                                }
                            }
                        }
                        for(let [InputKey,InputValue] of (<any>Object).entries($(ChildsNode))){
                            if(InputKey != 'prevObject' && InputKey != 'length'){  
                                DomArray.childs[ChildKey].childs[key].childs.push({
                                    title:$(InputValue).children().attr("title")|| $(InputValue).attr("title") || '空',
                                    childs:[]
                                })
                                if($(InputValue).hasClass('inputText')){
                                    this.executiveResolve(InputValue,DomArray.childs[ChildKey].childs[key].childs,InputKey)
                                }
                                else{
                                    if($(InputValue).hasClass('Logicdrop')){
                                        this.eventResolve(InputValue,DomArray.childs[ChildKey].childs[key].childs,InputKey)
                                    }else{                    
                                        this.logicChildResolve(InputValue,DomArray.childs[ChildKey].childs[key].childs,InputKey)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    //解析数据控件（递归遍历）
    public eventResolve(inputNode,Attr,index){
        for(let [InputKey,InputValue] of (<any>Object).entries($(inputNode).children())){
            if(InputKey != 'prevObject' && InputKey != 'length'){
                if($(InputValue).children().length > 0 ){
                    for(let [Key,Value] of (<any>Object).entries($(InputValue).children())){
                        if(Key != 'prevObject' && Key != 'length'){
                            if($(Value).children().length > 0 ) {
                                Attr[index].childs.push({
                                    title:  $(Value).children().children().attr("title") ||  $(Value).attr("title") ||"空",
                                    childs:[]
                                }) 
                                let Attrs = Attr[index].childs
                                if($(Value).children().children().children().length > 0){
                                    this.eventResolve($(Value).children()[0],Attrs,$(Value).index())
                                }  
                            }
                            else{  
                                Attr[index].childs.push({
                                    value:  $(Value).attr('title') || $(Value).children().prevObject[0].innerHTML || "空",
                                })
                            }
                           
                        }
                    }
                }
            }
        }
    }
        
}