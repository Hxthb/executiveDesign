import { Pipe,PipeTransform } from '@angular/core'

@Pipe({
    name:'cyToArray'
})
export class ToArrayPipe implements PipeTransform{
    transform(input:Object,arg:any){
        let show:Array<any>=[]
        Object.keys(input).forEach(v=>{
            show.push(v)
        })
        return show
    }
}