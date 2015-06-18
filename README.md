# YinPiaoWang_MobileSite
银票网移动站
Based on AngularJS

Requirements: node(with serveral packages installed by npm);

TEST:
启动本地测试服务器：node server.js
(前提是安装了Express服务器，支持Angular的HTML5 URL模式，即最终生产环境的模式)
或者在根目录执行: http-server . -p 8080 --cors -c-1
(前提是安装了http-server服务器)





工作交接：
举例1：添加某个新页面
    1. 在app.js的$routeProvider.when()中添加：{
        URL后缀，(/new)
        对应的HTML模版文件，(partials/new.html)
        对应HTML模版的控制器(new_controller)
        对应HTML模版的页面标题('new page title')
        声明对应HTML模版的标题栏的左右按钮
    }

    2. 在server.js的'globals'工厂中寻找该新页面对应的API接口，取出ADDRESS对象中的键，如('new_key')

    3. 在controllers.js中添加new_controller,(列表类型页面可以拷贝invest_controller，列表详情类型页面可以拷贝invest_item_detail_controller修改)

    4. 在新控制器new_controller中引入userInfo, FetchDataService两个服务: {
        userInfo对象有getter， setter方法，用于存放登陆API返回的用户数据以及后续返回的数据都可以放进去；
        FetchDataService用于所有与API接口的交互，传入第2步找的'new_key'，说明：{
            因后台接口不一致，我写了2个方法，fetchData()和fetchArray()，酌情使用；
            因后台接口不一致，API服务器也有2个，TEST_2_SERVER和ADMIN_SERVER，酌情使用；
            因后台接口不一致，登陆过程要使用fetchCaptcha()和login()；
            根据需要，在对应的HTML模版文件中添加{{}}表达式，收集改变的参数一起传入fetchData()和fetchArray()中
        }
    }
