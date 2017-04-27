/**
 * @author Administrator
 */
//控件拖拽 服务
import { Injectable } from '@angular/core'
import { Http,Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { AnalyzeDomJsonService } from '../services/analyzeDomJson.service'
//Jq拖拽支持文件
import '../themes/Jqeurt-UI/jquery-ui-10.3.js'
declare var $;
@Injectable()
export class ExecutiveService{
  private varDataSubject: Subject<Array<any>>
  varDataSubject$: Observable<Array<any>>
  constructor(private http : Http ,
  public analyDomJson : AnalyzeDomJsonService
  ){
        this.varDataSubject = new Subject()
        this.varDataSubject$ = this.varDataSubject.asObservable().distinctUntilChanged()
  }


  /**
 * @desc 详细拖拽方法，基于JQ
 */

  public jqDropMethor(){
      
      /**
        * @param {boolean} booleans 控件拖拽标识，为ture则表示从放置区内拖拽
      */
      let booleans = false;
        $(function(){
         /**     
             * @desc   放置区方法
             * @param  connectWith        双向连接，表示当前可接纳控件与可拖拽控件
             * @param  tolerance          拖拽源覆盖模式
             * @param  cursor             鼠标样式
             * @param  helper             拖拽源控件样式
             * @param  zIndex             拖拽源层级              
        */
         $(".droppable").sortable({     
            connectWith: '.droppable .Function-drop-div,.page-manage-wrap',
            // tolerance : 'touch',
            distance: 5,
            cursorAt: { left: 100,top:20 },
            cursor: "move",
            placeholder : "ui-state-highlight",
            appendTo : "body",
            helper: function() {
                 return "<div style='position:relative;width:200px;height:40px;background:#ddff11;z-index:9999'></div>";
            },
            stop: function(e, ui) {
              try
                {
                    var item = ui.item;
                    if (item.parent().hasClass("page-manage-wrap")) {
                        item.remove();
                    }else{
                        setDropStyle(item)   
                        ExecuteFieldClick() 
                        if(!item.parent().hasClass("droppable")){
                          //当前拖拽成功后需添加的CSS类
                          item.addClass('deor')
                          //调用背景颜色加深方法，深度为0.1，如需更改，进入方法内
                          getHexBackgroundColor(item.parents('.FuncbackgroundColor'),$(item).find('.FuncbackgroundColor'))
                        }
                    }
                }
                catch(err)
                {
                  alert( alert('程序出错,错误原因' + err.description));
                }
            },

        });
        /**     
             * @desc   逻辑组件嵌套方法
             * @param  connectWith        双向连接，表示当前可接纳控件与可拖拽控件
             * @param  helper             拖拽源控件样式
        */
        function childDrop($obj) {
           $obj.find(".Function-drop-div").sortable({
                distance: 5,
             	connectWith : ".droppable,.droppable .Function-drop-div,.page-manage-wrap",   
                placeholder : "ui-state-highlight", 
                // tolerance : 'touch',
			    tolerance : 'pointer',
                cursor: "move",
                appendTo : "body",
                cursorAt: { left: 100,top:20 },  
                helper: function() {
                    return "<div style='position:relative;width:200px;height:40px;background:#ddff11;z-index:9999'></div>";
                },

                stop: function(e, ui) {
                  try
                    {
                      var item = ui.item;
                          if (item.parent().hasClass("page-manage-wrap")) {
                              item.remove();
                          }else{           
                              setDropStyle(item) 
                              if(!item.parent().hasClass("droppable")){
                                item.addClass('deor')
                                getHexBackgroundColor(item.parents('.FuncbackgroundColor'),$(item).find('.FuncbackgroundColor'))          
                            }else{
                                item.removeClass('deor')                        
                            }
                          }
                    }
                  catch(err)
                    {
                        alert('程序出错,错误原因' + err.description)
                    }                            
                },
          })
          createEventDrop($(".Function-data-list", $obj));
         }
        //Logic逻辑控件拖拽
        $(".page-manage-wrap").find(".draggable").draggable({ 
                /**
                 * @param  opacity            拖拽源透明度
                 * @param  addClasses         禁止添加拖拽组件类
                 * @param  helper             拖拽源控件样式
                 * @param  connectToSortable  放置区
                 * @param  zIndex             拖拽源层级
                 
                */
                opacity: 0.8,           //当前拖拽控件透明度
                addClasses: false,      //禁止应用拖拽组件类
                // cursorAt: { left: 100,top:50 }, 
                cursorAt: { left: 100,top:25 },
                helper : function() {
                    var html = this.outerHTML;
                    return $(html).css({
                        "width" : "200px",
                        "font-size" : "10px",
                    })[0].outerHTML;
			    },  
                connectToSortable: ".droppable,.droppable .Function-drop-div",
                distance : "10",
                zIndex: 999,
                start: function(e, ui) {
                },

                stop: function(e, ui) {
                    DragModuleSharingMethod()
                }
        });
        //Logic逻辑控件拖拽
        $(".page-manage-wrap").find(".inputText").draggable({ 
                /**
                 * @param  opacity            拖拽源透明度
                 * @param  addClasses         禁止添加拖拽组件类
                 * @param  helper             拖拽源控件样式
                 * @param  connectToSortable  放置区
                 * @param  zIndex             拖拽源层级 
                */
                opacity: 0.8,           //当前拖拽控件透明度
                addClasses: false,      //禁止应用拖拽组件类
                // cursorAt: { left: 100,top:50 }, 
                cursorAt: { left: 100,top:25 },
                helper : function() {
                    var html = this.outerHTML;
                    return $(html).css({
                        "width" : "200px",
                        "font-size" : "10px",
                    })[0].outerHTML;
			    },  
                connectToSortable: ".droppable .Function-drop-div",
                zIndex: 999,
                start: function(e, ui) {
                },

               stop: function(e, ui) {
                    DragModuleSharingMethod()
                }
        });
        /**     
             * @desc   拖拽区放置删除方法
             * @param  items                指定元素内的哪一个项目应是 sortable。
             * @param  tolerance            拖拽源放置模式
             * @param  zIndex               层级
        */
        $(".page-manage-wrap").sortable({
            items:'.page-manage-wrap',
            tolerance: 'touch',
            zIndex: 9999,
            out: function() {

            },
            over: function() {
            }
        })
        /**     
             * @desc      Event控件拖拽方法
             * @function  DragModuleSharingMethod   当前方法集合，包含点击、删除等系列方法
             * @function  createEventDrop           开启Event事件放置方法
             * @function  createDataDrop            开启Data事件放置方法
        */
        $(".page-manage-wrap").find(".Logicdrop").draggable({
                opacity: 0.8,
                addClasses: false,
                helper: "clone",
                zIndex: 999,
                cursorAt: { left: 50,top:25 },
                start: function(e, ui) { 
                    createEventDrop($( ".droppable" ).find(".Function-data-list"));
                    //开启当前可放置.vardroop类的容器（数据模块）
                    createEventDrop($( ".droppable" ).find(".ExecuteField")); 
                    //开启当前可放置.vardroop类的容器（数据模块）
                    createDataDrop($( ".droppable" ).find(".vardroop"));
                },
                stop: function(e, ui) {                    
                    DragModuleSharingMethod()
                }
        });
        /**     
             * @desc      Data控件拖拽方法
             * @param     appendTo            约束放置类
             * @param     revert              回置动画
        */
        $(".page-manage-wrap").find(".variant").draggable({
            addClasses: false,
            cursorAt: { left: 50,top:25 },
            helper:'clone',         //克隆拖拽元素
            appendTo: ".droppable", //
            revert:'invalid',       //回置动画 
            zIndex:100,            
            //处理拖拽开始时需要开启的事件
            start:function(event,ui){
                  createDataDrop($( ".droppable" ).find(".vardroop"));
            },
            stop: function(e, ui) {
                DragModuleSharingMethod()
            }
        });
        //拖拽后，拖拽源下个别类样式更改
        function setDropStyle(item){
            item.find('.FoncutionHeigth').css("min-height","9em").find('.Function-drop-div').css("min-height","8em")
            childDrop($('.droppable').find(item)); 
            if(item.find('.Foncution-or')) setFuncSpan(item)
        }
        //FuncSpan区域
        function setFuncSpan(item){
            item.find('.Foncution-or').css("min-height","11em").find('.Function-span-or').css("line-height","2em").siblings('.Function-drop-div').css("min-height","7em")        
        }
    })
    //使用获取当前父元素背景颜色并转化为rgb格式
    function getHexBackgroundColor(obj,item) { 
            var rgb = $(obj).css('background-color'); 
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);  
            // return ("0" + parseInt(x).toString(16)).slice(-2); 
            rgb= "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
            item.css('background-color',getDarkColor(rgb,0.2))
    } 
    //转化为rgb格式
    function hex(x) { 
      return ("0" + parseInt(x).toString(16)).slice(-2); 
    }   
    //将hex颜色值str转化成rgb数组 
    function HexToRgb(str) {
        var r = /^\#?[0-9a-f]{6}$/;
        //test方法检查在字符串中是否存在一个模式，如果存在则返回true，否则返回false
        if (!r.test(str)) return 
        //replace替换查找的到的字符串
        str = str.replace("#", "");
        //match得到查询数组
        var hxs = str.match(/../g);
        for (var i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16);
        return hxs;
    }
    //将rgb颜色值为a,b,c转化成hex颜色值
    function RgbToHex(a, b, c) {
        var r = /^\d{1,3}$/;
        if (!r.test(a) || !r.test(b) || !r.test(c)) return window.alert("输入错误的rgb颜色值");
        var hexs = [a.toString(16), b.toString(16), c.toString(16)];
        for (var i = 0; i < 3; i++)
            if (hexs[i].length == 1) hexs[i] = "0" + hexs[i];
        return "#" + hexs.join("");
    }
    //得到hex颜色值为color的加深颜色值，level为加深的程度，限0-1之间
    function getDarkColor(color, level) {
        var r = /^\#?[0-9a-f]{6}$/;
        var rgbc = HexToRgb(color);
        //floor 向下取整
        for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
        return RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
    }
        /**     
             * @desc      Event控件放置方法
             * @param     appendTo            约束放置类
             * @param     revert              回置动画
             * @function  childrenOn          判断放置源节点方法
        */
        //事件放置集合
        var eventDrop = function($item){
                return $item.droppable({
                greedy:true,
                over:function(event,ui) { 
                    //判断子节点长度
                    if( $(this).children().length == 0){
                        $(this).addClass('white-border')
                    }
                }, 
                // 拖拽源离开放置源时事件
                out:function(event,ui) { 
                    $( this ).removeClass('white-border') 
                }, 
                // 拖拽源开始拖放事件
                activate: function(event,ui) {
                    childrenOn($(this),ui)
                },
                deactivate:function(event,ui) {
                    $(this).removeClass('red-border white-border')   
                    eventDrop($(this)).droppable( "destroy" )      
                },
            })
        }
        function createEventDrop($obj) {
            $obj.droppable({
                accept: ".Logicdrop",
                create:function(e,ui){
                    eventDrop($(this))
                },
                drop: function(event, ui) {   
                    $(this).attr('contenteditable') == 'true'? $(this).attr('contenteditable','false'):null;
                    if($(this).hasClass('ExecuteField')||$(this).hasClass('Repeated')){
                        $(this).hasClass('Repeated')?$(this).removeClass('EnterTextStyle'):null
                        $(this).html('')
                    }
                    ui.helper.attr('class') == 'Logicdrop ui-draggable ui-draggable-dragging'?AllowNodeDelete(true,ui):AllowNodeDelete(false,ui);     
                    $(this).append("<div class = 'Logicdrop'>" + ui.draggable.html() + "<div>")
                    $(this).find('.Logicdrop,.variant').draggable({
                      // helper:function(e,ui){
                      //    return "<div style='position:relative;width:100px;height:40px;background:#4caf50;z-index:9999'></div>";
                      // },
                      helper:'clone',
                      start:function(event,ui){
                          booleans = false;
                          //把可放置当前拖拽的容器开关打开   
                          let  eventNode =  ui.helper.find(".Function-data-list")
                          let  eventNoder =  $( ".droppable" ).find(".Function-data-list").not(eventNode);
                          createEventDrop(eventNoder);  
                          //开启当前可放置.vardroop类的容器（数据模块）
                          let  excNode =  ui.helper.find(".ExecuteField")
                          let  excNoder =  $( ".droppable" ).find(".ExecuteField").not(excNode);
                          createEventDrop(excNoder); 
                          //开启当前可放置.vardroop类的容器（数据模块）
                          let  varNode =  ui.helper.find(".vardroop")
                          let  varNoder =  $( ".droppable" ).find(".vardroop").not(varNode);
                          createDataDrop(varNoder);
                      },
                      stop:function(enent,ui){
                          DragModuleSharingMethod()
                          //拖拽模块共享方法 删除，点击以及DIV输入框
                          if( booleans == true){  
                              $(this).remove();       
                          }                         
                      },
                  })
                },
            });
          }
          /**     
             * @desc      Data控件放置方法
             * @param     appendTo            约束放置类
             * @param     revert              回置动画
             * @function  childrenOn          判断放置源节点方法
          */
          //數據放置集合
          var dataDrop = function($item){
                  return $item.droppable({
                  tolerance: "intersect",               
                  over:function(event,ui) { 
                      if($(this).children().length == 0){
                          //添加相关类
                          $(this).addClass('white-border')
                      }
                  }, 
                  // 拖拽源离开放置源时事件
                  out:function(event,ui) { 
                      //删除相关类
                      $( this ).removeClass('white-border') 
                  }, 
                  // 拖拽源开始拖放事件
                  activate: function(event,ui) {
                       //查看子节点
                      childrenOn($(this),ui)
                  },
                  deactivate:function(event,ui) {
                      $(this).removeClass('red-border white-border')   
                      dataDrop($(this)).droppable( "destroy" )      
                  },
              })
          } 
          function createDataDrop($item){
              //逻辑模块拖拽属性 
              $item.droppable({
                  accept: ".Logicdrop,.variant",
                  create:function(e,ui){
                      dataDrop($(this))
                  },
                  over:function(event,ui) { 
                    //判断子节点长度
                    if( $(this).children().length == 0){
                        $(this).addClass('white-border')
                      }
                    }, 
                    out: function() {
                      $( this ).removeClass('white-border')
                    },
                    // 拖拽源开始拖放事件
                    activate: function(event,ui) {
                        //查看子节点
                        childrenOn($(this),ui)
                    },
                    // //拖拽源结束拖放事件
                    deactivate:function(event,ui) {
                        $(this).removeClass('red-border white-border')   
                                            
                    },
                  drop: function( event, ui) {
                      $("*").removeClass("red-border white-border")  
                      $(this).text("").children().remove()
                      ui.helper.attr('class') == 'Logicdrop ui-draggable ui-draggable-dragging' || ui.helper.attr('class') =='variant ui-draggable ui-draggable-dragging'?AllowNodeDelete(true,ui):AllowNodeDelete(false,ui);
                      $(this).css({"padding":"0"}).append("<div class = " + ui.helper.attr('class') + ">" + ui.draggable.html() + "</div>")
                      $(this).find('.Logicdrop,.variant').draggable({
                          // helper:function(e,ui){
                          //    return "<div style='position:relative;width:100px;height:40px;background:#4caf50;z-index:9999'></div>";
                          // },
                          helper:'clone',
                          start:function(event,ui){
                              booleans = false;  
                              //把可放置当前拖拽的容器开关打开   
                              let  eventNode =  ui.helper.find(".Function-data-list")
                              let  eventNoder =  $( ".droppable" ).find(".Function-data-list").not(eventNode);
                              createEventDrop(eventNoder);  
                              //开启当前可放置.vardroop类的容器（数据模块）
                              let  excNode =  ui.helper.find(".ExecuteField")
                              let  excNoder =  $( ".droppable" ).find(".ExecuteField").not(excNode);
                              createEventDrop(excNoder); 
                              //开启当前可放置.vardroop类的容器（数据模块）
                              let  varNode =  ui.helper.find(".vardroop")
                              let  varNoder =  $( ".droppable" ).find(".vardroop").not(varNode);
                              createDataDrop(varNoder);
                          },
                          stop:function(enent,ui){
                              //拖拽模块共享方法 删除，点击以及DIV输入框
                              DragModuleSharingMethod() 
                              if( booleans == true){  
                                  $(this).remove();       
                              }                         
                          },
                      })
                  }
              })
          } 
          //拖拽模块共享方法
          function DragModuleSharingMethod(){
              //放置左侧模块拖拽删除事件
              comDelete();
              //执行体内容点击获取焦点方法
              ExecuteFieldClick();
              //获取当前拖拽模块DIV输入框焦点方法
              DivFocus();
          }
                  /**     
             * @desc   放置左侧模块拖拽删除事件
             * @param  enable               开启放置区
             * @param  ui.helper            当前拖拽源
             * @param  ui.draggable         当前拖拽源
             * @param  contenteditable      当前事件列表DIV输入属性 
        */
        function comDelete(){
            $(".page-manage-wrap").droppable({
                    accept:$(".droppable").find(".Logicdrop,.variant"),
                    tolerance:"touch", 
                    drop: function( event, ui ) {
                        booleans = true;
                        ui.helper.parent().droppable( "enable" )                                                
                        ui.helper.parent().attr('contenteditable') == 'false'? ui.helper.parent().attr('contenteditable','true'):null;
                        ui.helper.remove();
                        ui.draggable.remove();
                }
            }) 
        };
          //判断当前元素是否已有子元素，如有则无法再放置控件方法
          function childrenOn($this,ui){
              if($this.children().length == 0){
                  $('.droppable').find($this).addClass('red-border')
              }
              else{  
                  //當拖拽區內有子節點時。禁止放置（如後期節點需要同一級，則修改這部分事件）   
                  $this.droppable( "disable" )
              }
          }
          //执行体内容点击获取焦点方法
          function ExecuteFieldClick(){
              $(".droppable .ExecuteField,.droppable .Repeated").blur().click(function(event){
                       $(this).hasClass('Repeated')?$(this).addClass('EnterTextStyle'):null
                       placeCaretAtEnd($(this)[0]);     
              })
          };
          //DIV设置 鼠标光标位于最后侧
          function placeCaretAtEnd(el) {
            el.focus();
            if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }

          //获取当前拖拽模块DIV输入框焦点方法
          function DivFocus(){
              //当前input点击获取焦点事件 （需优化）
              $(".input").blur().on("click",function(e){ 
                  if($(this).children().length == 0 ){
                      $(this).attr('contenteditable',true)
                      placeCaretAtEnd($(this)[0]);                  
                      return false;
                  }
              })
          };
          /**     
             * @desc      删除拖拽模块嵌套时模块方法
             * @param     destroy            初始化放置源
          */
          function AllowNodeDelete(boolean,ui){
              booleans = boolean;
              if (boolean == true){  
                  //重置当前拖拽的初始化
                  ui.helper.parent().droppable( "destroy" ) 
                  return booleans;           
              }
          }
  }
  /*
  public jqDropMethor(){
     //存储全局删除标识
     let booleans = false;
     $(function(){
        $(".page-manage-wrap").find(".draggable,.Logicdrop,.variant").draggable({
            addClasses: false,
            helper:'clone',         //克隆拖拽元素
            appendTo: ".droppable", //约束放置类
            revert:'invalid',       //回置动画 
            connectToSortable : ".droppable",
            zIndex:100,            
            //处理拖拽开始时需要开启的事件
            start:function(event,ui){
                //拖拽放置區開啟
                let zIndex = 300;
                $( ".droppable" ).droppable({
                    accept: ".draggable-Function",   //允许哪个类被放置
                    greedy:true,            //防止向上传播
                    drop: function( event, ui ) {
                        //添加被拖拽元素  
                        console.log(123)  
                        $(this).append(ui.draggable.html())    
                        //给当前元素下的子节点添加可拖拽事件（触发可多次重复放置）         
                        $(this).children().css({"margin-bottom":"10px"}).draggable(                        
                            {  
                            //复制一个控件进行拖拽
                            helper:'clone',
                            start:function(event,ui){
                                 //控制当前是从列表拖拽还是从放置区拖拽
                                 booleans = false;  
                                 //排除当前拖拽的组件
                                 let  AllowNode =  ui.helper.find(".Function-drop-div")
                                 let  AllowNodes =  $( ".droppable" ).find(".Function-drop-div").not(AllowNode);
                                 //开启拖拽
                                 createLoginDrop(AllowNodes);  
                            },
                            stop:function(enent,ui){
                                 $(this).removeClass("this")
                                //如果是拖拽到其他容器，则删除被拖拽元素，在放置容器里添加拖拽元素
                                if( booleans == true){  
                                    $(this).remove();   
                                }                              
                            }, 
                        })
                    }
                }) 
                //把可放置当前拖拽的容器开关打开   
                let  logicNode =  ui.helper.find(".Function-drop-div")
                let  logicNoder =  $( ".droppable" ).find(".Function-drop-div").not(logicNode);
                createLoginDrop(logicNoder);
                //把可放置当前拖拽的容器开关打开   
                let  eventNode =  ui.helper.find(".Function-data-list")
                let  eventNoder =  $( ".droppable" ).find(".Function-data-list").not(eventNode);
                createEventDrop(eventNoder);  
                //开启当前可放置.vardroop类的容器（数据模块）
                let  excNode =  ui.helper.find(".ExecuteField")
                let  excNoder =  $( ".droppable" ).find(".ExecuteField").not(excNode);
                createEventDrop(excNoder); 
                //开启当前可放置.vardroop类的容器（数据模块）
                let  varNode =  ui.helper.find(".vardroop")
                let  varNoder =  $( ".droppable" ).find(".vardroop").not(varNode);
                createDataDrop(varNoder);
            },      
            stop:function(event,ui){
                //拖拽模块共享方法 删除，点击以及DIV输入框
                DragModuleSharingMethod()
            }
        })
     })
     //拖拽模块共享方法
    function DragModuleSharingMethod(){
        //放置左侧模块拖拽删除事件
        comDelete();
        //执行体内容点击获取焦点方法
        ExecuteFieldClick();
        //获取当前拖拽模块DIV输入框焦点方法
        DivFocus();
    }


    //邏輯放置集合
    var logicDrop = function($item){
            return $item.droppable({
            greedy:true,                         
            over:function(event,ui) { 
                if( $(this).children().length == 0){
                    $(this).addClass('white-border')
                }
            }, 
            // 拖拽源离开放置源时事件
            out:function(event,ui) { 
                $( this ).removeClass('white-border') 
            }, 
            // 拖拽源开始拖放事件
            activate: function(event,ui) {
                // childrenOn($(this),ui)
            },
            // //拖拽源结束拖放事件
            deactivate:function(event,ui) {
                $(this).removeClass('red-border white-border')   
                                     
            },
        })
    }
     function createLoginDrop($item){
        //处理模块内部嵌套拖拽属性
        $item.droppable({  
            accept: ".draggable,.Function-row",  
            greedy:true,
            create:function(event,ui){
                logicDrop($(this))   
            },
            drop: function( event, ui ) {
                // $(this).children().remove()  
                if(ui.draggable.attr('class') === 'Function-row ui-draggable'){
                    AllowNodeDelete(true,ui);$(this).append("<div class = Function-row>" + ui.draggable.html() + "</div>") 
                }else{
                    AllowNodeDelete(false,ui); $(this).append(ui.draggable.html())   
                }
                $(this).children().css({"border":"1px solid"})
                //测试所有拖拽 2017年4月10 可能有  BUG  用于防止因为嵌套拖拽而重叠为一个整体的组件
                $(this).find('.Function-row,.inputText')
                .draggable({
                    helper:"clone",
                    start:function(event,ui){
                        booleans = false;
                        //把可放置当前拖拽的容器开关打开   
                        let  logicNode =  ui.helper.find(".Function-drop-div")
                        let  logicNoder =  $( ".droppable" ).find(".Function-drop-div").not(logicNode);
                        createLoginDrop(logicNoder);  
                    },
                    //当前第一个被拖拽的函数体无法被目标源接受删除，先暂时使用距离偏移来控制删除元素 （需优化）
                    stop:function(enent,ui){
                        //拖拽模块共享方法 删除，点击以及DIV输入框
                        DragModuleSharingMethod()
                        if( booleans == true ){
                            $(this).remove(); 
                        }
                    },
                })
            }
        })
     }   
    //事件放置集合
    var eventDrop = function($item){
            return $item.droppable({
            greedy:true,
            over:function(event,ui) { 
                //判断子节点长度
                if( $(this).children().length == 0){
                    $(this).addClass('white-border')
                }
            }, 
            // 拖拽源离开放置源时事件
            out:function(event,ui) { 
                $( this ).removeClass('white-border') 
            }, 
            // 拖拽源开始拖放事件
            activate: function(event,ui) {
                childrenOn($(this),ui)
            },
            deactivate:function(event,ui) {
                $(this).removeClass('red-border white-border')   
                eventDrop($(this)).droppable( "destroy" )      
            },
        })
    }
     //Login 逻辑模块拖拽类
    function createEventDrop($item){
        //逻辑模块拖拽属性 
        $item.droppable({
            accept: ".Logicdrop",
            greedy:true,
            create:function(event,ui){
                eventDrop($(this))   
            },
            drop: function( event, ui) { 
                $(this).attr('contenteditable') == 'true'? $(this).attr('contenteditable','false'):null;
                if($(this).attr('class').includes('ExecuteField')){
                    $(this).html('')
                }
                ui.helper.attr('class') == 'Logicdrop ui-draggable ui-draggable-dragging'?AllowNodeDelete(true,ui):AllowNodeDelete(false,ui);               
                $(this).css({"padding":"0"}).append("<div class = 'Logicdrop'>" + ui.draggable.html() + "<div>")          
                // .children()
                 $(this).find('.Logicdrop,.variant').draggable({
                    helper:"clone",
                    start:function(event,ui){
                        booleans = false;
                        //把可放置当前拖拽的容器开关打开   
                        let  eventNode =  ui.helper.find(".Function-data-list")
                        let  eventNoder =  $( ".droppable" ).find(".Function-data-list").not(eventNode);
                        createEventDrop(eventNoder);  
                        //开启当前可放置.vardroop类的容器（数据模块）
                        let  excNode =  ui.helper.find(".ExecuteField")
                        let  excNoder =  $( ".droppable" ).find(".ExecuteField").not(excNode);
                        createEventDrop(excNoder); 
                        let  varNode   =  ui.helper.find(".vardroop" );
                        let  varNoder =  $( ".droppable" ).find(".vardroop").not(varNode);                        
                        createDataDrop(varNoder);
                    },
                    stop:function(enent,ui){
                        //拖拽模块共享方法 删除，点击以及DIV输入框
                        DragModuleSharingMethod() 
                        if( booleans == true){  
                            $(this).remove();       
                        }                         
                    },
                })
            }
        }) 
    }  
    //數據放置集合
    var dataDrop = function($item){
            return $item.droppable({
            tolerance: "intersect",               
            over:function(event,ui) { 
                if( $(this).children().length == 0){
                    $(this).addClass('white-border')
                }
            }, 
            // 拖拽源离开放置源时事件
            out:function(event,ui) { 
                $( this ).removeClass('white-border') 
            }, 
            // 拖拽源开始拖放事件
            activate: function(event,ui) {
                childrenOn($(this),ui)
            },
            deactivate:function(event,ui) {
                $(this).removeClass('red-border white-border')   
                dataDrop($(this)).droppable( "destroy" )      
            },
        })
    } 
     function createDataDrop($item){
        //逻辑模块拖拽属性 
        $item.droppable({
            greedy:true,
            accept: ".Logicdrop,.variant",
            create:function(event,ui){
                dataDrop($(this)) 
            },
            drop: function( event, ui) {
                $("*").removeClass("red-border white-border")  
                $(this).text("").children().remove()
                ui.helper.attr('class') == 'Logicdrop ui-draggable ui-draggable-dragging' || 'variant ui-draggable ui-draggable-dragging'?AllowNodeDelete(true,ui):AllowNodeDelete(false,ui);
                $(this).css({"padding":"0"}).append("<div class = " + ui.helper.attr('class') + ">" + ui.draggable.html() + "</div>")
                // .children()
                $(this).find('.Logicdrop,.variant').draggable({
                    helper:"clone",
                    start:function(event,ui){
                        booleans = false;  
                        //把可放置当前拖拽的容器开关打开   
                        let  eventNode =  ui.helper.find(".Function-data-list")
                        let  eventNoder =  $( ".droppable" ).find(".Function-data-list").not(eventNode);
                        createEventDrop(eventNoder);  
                        //开启当前可放置.vardroop类的容器（数据模块）
                        let  excNode =  ui.helper.find(".ExecuteField")
                        let  excNoder =  $( ".droppable" ).find(".ExecuteField").not(excNode);
                        createEventDrop(excNoder); 
                        //开启当前可放置.vardroop类的容器（数据模块）
                        let  varNode =  ui.helper.find(".vardroop")
                        let  varNoder =  $( ".droppable" ).find(".vardroop").not(varNode);
                        createDataDrop(varNoder);
                    },
                    stop:function(enent,ui){
                        //拖拽模块共享方法 删除，点击以及DIV输入框
                        DragModuleSharingMethod() 
                        if( booleans == true){  
                            $(this).remove();       
                        }                         
                    },
                })
            }
        })
    } 
    //判断当前元素是否已有子元素，如有则无法再放置控件方法
    function childrenOn($this,ui){
        if($this.children().length == 0){
            let  AllowNode =  ui.helper.find(".Function-drop-div")
            $('.droppable').find($this).not(AllowNode).addClass('red-border')
        }
        else{  
            //當拖拽區內有子節點時。禁止放置（如後期節點需要同一級，則修改這部分事件）   
            $this.droppable( "disable" )
        }
    }
    //放置左侧模块拖拽删除事件
    function comDelete(){
        $(".page-manage-wrap").droppable({
                accept:$(".droppable").find(".draggable,.Function-row,.Logicdrop,.variant,.inputText"),
                tolerance:"touch", 
                drop: function( event, ui ) {
                    booleans = true;
                    if(ui.helper.parent().attr('class') != 'droppable'){
                        ui.helper.parent().droppable( "enable" )
                        //用於重置拖拽元素的初始化，由於控件刪除後，元素放置的事件無初始化，導致部分事件不執行，特在控件刪除時初初始化事件
                        logicDrop(ui.helper.parent()).droppable( "destroy" )                             
                    }                                    
                    ui.helper.parent().attr('contenteditable') == 'false'? ui.helper.parent().attr('contenteditable','true'):null;
                    ui.helper.remove();
                    ui.draggable.remove();
            }
        }) 
    };
    //执行体内容点击获取焦点方法
    function ExecuteFieldClick(){
        $(".ExecuteField").blur().click(function(event){
            $(this).focus()
        })
    };
    //获取当前拖拽模块DIV输入框焦点方法
    function DivFocus(){
        //当前input点击获取焦点事件 （需优化）
        $(".input").blur().on("click",function(e){ 
            if($(this).children().length == 0 ){
                $(this).attr('contenteditable',true)
                $(this).focus()                   
                return false;
            }
        })
    };
     //删除拖拽模块嵌套时模块方法
    function AllowNodeDelete(boolean,ui){
        booleans = boolean;
        if (boolean == true){    
            // ui.helper.parent().droppable( "enable" )  
            if(ui.helper.parent().attr('class') != 'droppable'){
                ui.helper.parent().droppable( "destroy" )
            }    
            return booleans;           
        }
     }
  }
  */

  //供变量控件推送变量数组
  public varDynamicData(data: Array<any>) {
       this.varDataSubject.next(data)
  }
  //传递JSON解析返回
  public dropSave(JqDom){
       return this.analyDomJson.createDropResolve(JqDom) 
  }
  //提交JSON文件
  public submitJson(extJson: Object): Observable<string>{
    let api = "http://10.28.83.110:8086/v1/executivebody/";
    let headers=new Headers({
        'Content-Type': 'application/json',
    })
    return this.http.post(api, extJson, {headers:headers})
                    .map(res => res.json() || {})
  }
  //转化JSON为Angular2所有循环的方法
  public keys(object:{}){
    return Object.keys(object);
  }

}
