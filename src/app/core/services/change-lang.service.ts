import { Injectable } from '@angular/core'
// import { TranslateService } from 'ng2-translate/ng2-translate'
import { TranslateService } from '@ngx-translate/core'


@Injectable()
export class ChangeLangService {
    langFlags: Array<string>
    constructor(
        private translate: TranslateService
    ) {
        this.langFlags = ["en_US", "zh_CH", "zh_TW"]
        translate.addLangs(this.langFlags) //设置多语言
        translate.setDefaultLang(this.langFlags[1]) //默认为中文简体
    }

    //设置多语言
    private setLang(userLang: string) {
        //已存在且是正确的标识
        if (userLang && this.langFlags.some(flag => userLang === flag)) {
            this.setLangBase(userLang)
        } else {
            //不存在或标识不正确
            this.setLangBase(this.langFlags[1])
        }
    }

    //设置
    private setLangBase(lang: string) {
        this.translate.use(lang)
        this.translate.getTranslation(lang)
        localStorage.setItem("userLang", lang)
    }

    //自动识别应用语言
    autoLang() {
        let userLang = localStorage.getItem("userLang")
        if (userLang) {
            this.setLang(userLang)
        } else {
            this.setLangBase(this.langFlags[1])
        }
    }

    //设置英语
    langEN_US() {
        this.setLang('en_US')
    }
    //设置简体
    langZH_CH() {
        this.setLang('zh_CH')
    }
    //设置繁体
    langZH_TW() {
        this.setLang('zh_TW')
    }
}