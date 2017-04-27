// //元素滚动指令
// import { 
//     Directive,
//     ElementRef,
//     Renderer,
//     OnInit,
//     OnDestroy,
//     AfterViewInit
// } from '@angular/core'

// var IScroll=require('iscroll')

// @Directive({
//     selector:'[cy-iscroll]'
// })
// export class IScrollDirective implements OnDestroy,OnInit,AfterViewInit{
//     iscroll:any
//     constructor(
//         private ele:ElementRef,
//         private render:Renderer
//     ){

//     }

//     ngAfterViewInit(){
//         let iscrollOptions: any = {
//             mouseWheel: true,
//             scrollbars: 'custom',
//             disableMouse: true,
//             disablePointer: true,
//             interactiveScrollbars:true
//         }
//         this.iscroll = new IScroll(this.ele.nativeElement, iscrollOptions)
//         // this.iscroll.on('scrollEnd',()=>{
//         //     this.render.setElementAttribute(this.ele.nativeElement.firstElementChild,'style','a')
//         // })
//     }
//     ngOnDestroy(){
//         this.iscroll=null
//     }
//     ngOnInit(){
//     }
// }