# Executive (可视化逻辑设计)

    此项目是用 [angular-cli] 版本 1.0. 0-beta 28.3。
    This project was generated with [angular-cli] version 1.0.0-beta.28.3.

    该项目主要设计逻辑处理表达式，内嵌Jquery，多语言等功能
    需安装node环境（CLI模式下输入 node -v 查看是否已安装node环境，最好先升级 node 到 6.x 可以避免 node 版本过低带来的不必要的麻烦）
    运行npm install -g angular-cli
    安装成功后直接运行npm serve

## npm server（运行服务器）
    运行npm start 开启服务器测试，默认端口 `http://0.0.0.0:4201/`
    如果想要更改端口，请修改package.json的strat命令下的port

    Run `ng serve` for a dev server. Navigate to `http://0.0.0.0:4201/`.
    If you want to change the port, modify port under the Strat command of the Package.json的strat命令下的port

## Build
    运行 "ng Build" 以生成项目。生成工件将存储在 "dust/" 目录中。对生产生成使用 "-prod" 标志。

    Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
运行`ng test` 开启项目单元测试

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
