//公用头部组件
import { Component,EventEmitter,Input,OnInit,Output} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { ChangeLangService } from '../../../core/services/change-lang.service'

// import './navBar.component.scss'

@Component({
    selector: 'cy-nav',
    templateUrl: './navBar.component.html',
    styleUrls:['./navBar.component.scss']
})
export class NavBarComponent implements OnInit {
    @Input() headerTitle:string
    isLogout: boolean = true //初始不显示logout
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public langService: ChangeLangService) {
             //设置多语言，默认显示中文
            this.langService.autoLang()
         }

    ngOnInit() { }
}