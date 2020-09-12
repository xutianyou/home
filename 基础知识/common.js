/**
 * @author:yueziming
 * @version:1.0
 * @description 为了方便书写统一写公共方法,用来写活动、静态页面等
 */
window.baseUrl = "";
if (window.location.hostname == 'localhost') {
    // baseURL = 'http://172.16.1.1/TbWebApi/api';
    window.baseUrl = 'http://testapi.aaaa.com/api';
 } else if (window.location.hostname == '172.16.1.1') {
    window.baseUrl = 'http://172.16.1.2/api';
 } else if (window.location.hostname == 'http://tbabc.aaaa.com') {
    window.baseUrl = 'http://testapi.aaaa.com/api';
 } else {
    window.baseUrl = 'http://api.aaaa.com/api';
 }
 
var Common = {
    //公共ajax方法
    /**
     * @arg url:去除公共地址后后API地址
     * @arg type:请求类型，默认为post
     * @arg data:用于请求的数据
     * @arg callback:回调函数
     */
    ajax: function (url, type, data, callback) {
        var self = this;
        var myUrl = window.baseUrl + url;
        Common.ajaxLoading();
        $.ajax({
            url: myUrl,
            data: data,
            type: type || "post",
            dataType: 'json',
            //获取令牌，每次请求带上
            beforeSend: function (request) {
                var token = self.getSession("token");
                if (token) {
                    request.setRequestHeader("X-CSRF-TOKEN", token);
                }
            },
            success: function (res) {
                Common.ajaxLoadingStop();
                callback(res);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
                Common.validateAjaxStatus(XMLHttpRequest.status);
                Common.ajaxLoadingStop();
            }
        });
    },
    /**
     * @desc 请求状态码字典
     */
    ajaxStatusDictionary:{
        status:{
            //请求成功
            "201":"对象创建成功并返回相应资源数据。",
            "202":"接受请求，但无法立即完成创建行为，比如其中涉及到一个需要花费若干小时才能完成的任务。返回的实体中应该包含当前状态的信息，以及指向处理状态监视器或状态预测的指针，以便客户端能够获取最新状态。",
            "204":"请求执行成功，不返回相应资源数据，如 PATCH ， DELETE 成功。",
            //重定向
            "301":"被请求的资源已永久移动到新位置。",
            "302":"请求的资源现在临时从不同的 URI 响应请求。",
            "303":"对应当前请求的响应可以在另一个 URI 上被找到，客户端应该使用 GET 方法进行请求。",
            "307":"对应当前请求的响应可以在另一个 URI 上被找到，客户端应该保持原有的请求方法进行请求。",
            //条件请求
            "304":"资源自从上次请求后没有再次发生变化，主要使用场景在于实现数据缓存。",
            "409":"请求操作和资源的当前状态存在冲突。主要使用场景在于实现并发控制。",
            "412":"服务器在验证在请求的头字段中给出先决条件时，没能满足其中的一个或多个。主要使用场景在于实现并发控制。",
            //客户端错误
            "400":"请求体包含语法错误。",
            "401":"需要验证用户身份。",
            "403":"服务器拒绝执行。",
            "404":"找不到目标资源。",
            "405":"不允许执行目标方法，响应中应该带有 Allow 头，内容为对该资源有效的 HTTP 方法。",
            "406":"服务器不支持客户端请求的内容格式，但响应里会包含服务端能够给出的格式的数据。",
            "410":"被请求的资源已被删除。",
            "413":"POST 或者 PUT 请求的消息实体过大。",
            "415":"服务器不支持请求中提交的数据的格式。",
            "422":"请求格式正确，但是由于含有语义错误，无法响应。",
            "428":"要求先决条件，如果想要请求能成功必须满足一些预设的条件。",
            //服务端错误
            "500":"服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。",
            "501":"服务器不支持当前请求所需要的某个功能。",
            "502":"作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。",
            "503":"由于临时的服务器维护或者过载，服务器当前无法处理请求。"
        }
    },
    /**
     * @desc 打印错误原因
     */
    validateAjaxStatus:function (status) {
        console.log('网络异常状态码为：“'+status+'”<br//>请联系技术中心获取支持！<br//>详细错误原因为：'+this.ajaxStatusDictionary.status[status]);
    },
    /**
     * @name ajaxLoading
     * @desc ajax加载中样式
     */
    ajaxLoading: function () {
        var loadingHtml = '<div id="loading" class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div>加载中</div>';
        $("body").append(loadingHtml);
    },
    /**
     * @name ajaxLoadingStop
     * @desc ajax加载完后移除加载样式
     */
    ajaxLoadingStop: function () {
        $("#loading").remove();
    },
    /**
     * @name tips提示
     * @desc 公共的消息提示，限定时间内消失,默认1秒钟
     * @param msg:需要提示的消息字符串
     * @param time:延迟多长时间开始消息消失
     */
    tips:function(msg,time){
        var endtime = time || 1000;
        var htmlstr = '<div id="tip"><div class="top">提示</div><div class="message">'+msg+'</div></div>';
        $("#tip").remove();
        $("body").append(htmlstr);
        var i = setTimeout(function(){
            $("#tip").fadeOut(1000);
        },endtime);
    },
    /**
     * @name setsession 设置sessionStorage
     * @desc 对sessionStorage的存的操作方法
     * @param key:sessionStorage的键
     * @param value:sessionStorage的值，可以为数字、字符，也可以为json对象
     */
    setSession:function(key,value){
        if(typeof value == 'object'){
            sessionStorage.setItem(key,JSON.stringify(value));
        }
        else{
            sessionStorage.setItem(key,value);
        }
    },
    /**
     * @name getSesssion 获取sessionStorage存储
     * @desc 对sessionStorage的取的操作方法
     * @param key:需要取值的键
     */
    getSession:function(key){
        try{
            var data = JSON.parse(sessionStorage.getItem(key));
        }catch(e){
            var data = sessionStorage.getItem(key);
        }
        return data;
    },
    /**
     * @desc 销毁sessionStorage
     */
    destorySessionstorage:function(key){
        sessionStorage.removeItem(key);
    },
    /**
     * @name getQuery 获取URL传参的值
     * @desc 获取URL传参的值且避免报错
     */
    getQuery:function(key){
        var url = location.search;
        var returnStr = '';
        var keyword = key + "=";
        if(keyword){
            try{
                returnStr = url.split(keyword)[1].split("&")[0]
            }
            catch(e){
                returnStr = '';
            }
        }
        return returnStr;
    },
    CookieClass: function () {
        var self = this;
        /**
         * 设定Cookie
         * @param name 添加Cookie的名称
         * @param value 添加Cookie的值
         * @param expiresHours 添加Cookie的过期时间(单位：小时)
         * @param path 添加Cookie的域
         */
        self.setCookie = function (name, value, expiresHours, path) {
            if (arguments.length == 1) {
                Quasar._setError(-1, 11, '函数缺少必要参数', 'CookieClass/setCookie()');
                return false;
            }
            if (arguments.length == 2) expiresHours = 0;
            if (arguments.length == 3) path = '/';
            var cookieString = name + "=" + encodeURI(value);
            // 判断是否设置过期时间
            if (expiresHours > 0) {
                var date = new Date();
                date.setTime(date.getTime() + expiresHours * 3600 * 1000);
                cookieString = cookieString + "; expires=" + date.toUTCString() + "; path=" + path;
            }
            document.cookie = cookieString;
        };
        //noinspection JSUnusedGlobalSymbols
        /**
         * 获取Cookie
         * @param name 获取Cookie的名称
         *
         * @returns string|null|boolean 返回Cookie的值，无对应name的Cookie则返回null
         */
        self.getCookie = function (name) {
            if (arguments.length <= 0) {
                Quasar._setError(-1, 11, '函数缺少必要参数', 'CookieClass/getCookie()');
                return false;
            }
            var strCookie = document.cookie;
            var arrCookie = strCookie.split("; ");
            for (var i = 0; i < arrCookie.length; i++) {
                var arr = arrCookie[i].split("=");
                if (arr[0] == name) return decodeURI(arr[1]);
            }
            return null;
        };
        //noinspection JSUnusedGlobalSymbols
        /**
         * 删除Cookie
         * @param name 删除Cookie的名称
         */
        self.delCookie = function (name) {
            if (arguments.length <= 0) {
                Quasar._setError(-1, 11, '函数缺少必要参数', 'CookieClass/delCookie()');
                return false;
            }
            var date = new Date();
            date.setTime(date.getTime() - 10000);
            document.cookie = name + "=''; expires=" + date.toUTCString();
        };
    },
    /**
     *  @desc 正则判断字符串是否正确
     */
    RegExpClass: function () {
        var self = this;
        /**
         *  @desc 验证字符串是否为空
         */
        self.IsNotEmpty = function (str) {
            if(str == '' || str == undefined){
                return false;
            }
            return true;
        };
        /**
         *  @desc 验证字符串是否为email
         */
        self.IsEmail = function (str) {
            var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*\.[\w-]+$/i;
            return emailReg.test(str);
        };
        /**
         *  @name Common.IsMobile 验证字符串是否为手机号码
         *  @param str:需要验证的手机号字符串
         *  @desc 这里验证的是大陆、香港、澳门的手机号
         */
        self.IsMobile = function (str) {
            var patrn = /^1[3|4|5|6|7|8|9][0-9]+\d{8}$|^([5|6|9])+\d{7}$|^[6]([8|6])+\d{5}$/; // 手机号码
            return patrn.test(str);
        };
        /**
         * @desc 验证字符串是否为电话或者传真
         */
        self.IsTel = function (str) {
            var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
            return patrn.test(str);
        };
        /**
         * @desc 验证字符串是否为汉字
         */
        self.IsCN = function (str) {
            var p = /^[\u4e00-\u9fa5]+$/;
            return p.test(str);
        };
        /**
         * @desc 验证字符串是否为数字
         */
        self.IsNum = function (str) {
            var p = /^\d+$/;
            return p.test(str);
        };
        /**
         * @desc 验证字符串是否含有特殊字符
         */
        self.IsUnSymbols = function (str) {
            var p = /^[\u4e00-\u9fa5\w \.,()，ê?。¡ê（ê¡§）ê?]+$/;
            return p.test(str);
        };
    },
    /**
     * 金钱处理对象
    * {
    *       toThousands: MoneyUtils.toThousands,
    *       encodeMoney: MoneyUtils.encodeMoney,
    *       decodeMoney: MoneyUtils.decodeMoney,
    *       encodeRate: MoneyUtils.encodeRate,
    *       decodeRate: MoneyUtils.decodeRate,
    *       accAdd: MoneyUtils.accAdd,
    *       accDiv: MoneyUtils.accDiv,
    *       accMul: MoneyUtils.accMul
    *       }
    * }
     */
    MoneyUtils: function () {
        var self = this;
        //对金额进行千位符的格式化
        self.toThousands = function (count) {
            var temp1;
            var temp2 = 0;
            try {
                temp1 = count.toString().split(".")[0];
                temp2 = count.toString().split(".")[1];
                var num = (temp1 || 0).toString(), result = '';
                while (num.length > 3) {
                    result = ',' + num.slice(-3) + result;
                    num = num.slice(0, num.length - 3);
                }
                if (num) {
                    if (temp2 != undefined) {
                        result = num + result + "." + temp2;
                    } else {
                        result = num + result;
                    }
                }
            } catch (e) {
                temp1 = count;
                var num = (temp1 || 0).toString(), result = '';
                while (num.length > 3) {
                    result = ',' + num.slice(-3) + result;
                    num = num.slice(0, num.length - 3);
                }
                if (num) {
                    result = num + result;
                }
            }
            return result;
        };
        //处理一下，解决js浮点型运算的问题。
        //将数字转换成xxx万 精确到分，小数点后6位
        self.encodeMoney = function (count) {
            var self = this;
            var money = self.accDiv(Number(count), 10000);
            var t;
            try {
                t = money.toString().split(".")[1].length;
            } catch (e) {
                t = 0;
            }
            if (t > 6) {
                //2016.4.13 增加toFixed()函数去掉自动补零的功能
                for (var i = 6; i > 0; i++) {
                    var num = money.toString().split(".")[1].substring(i - 1, i)
                    if (num == 0) {
                        return money.toFixed(i - 1);
                    } else {
                        return money.toFixed(i);
                    }
                }
                //return money.toFixed(6);
            } else {
                return money;
            }
        };
        //将xx万转换成数字
        self.decodeMoney = function (count) {
            var self = this;
            var p_money = count.toString().replace(",", "");
            return self.accMul(Number(p_money), 10000);
        };
        //处理利率问题
        //把数字转换成千分之多少
        self.encodeRate = function (rate) {
            return 100 * (Number(rate) * 100) / 100;
        };
        /**
         * @desc 把千分之多少转换成数字
         */
        self.decodeRate = function (rate) {
            return (Number(rate) * 100) / (100 * 100);
        };
        //添加浮点型的加减乘除。解决js浮点型的bug
        //加法函数，用来得到精确的加法结果
        //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
        //调用：accAdd(arg1,arg2)
        //返回值：arg1加上arg2的精确结果
        self.accAdd = function (arg1, arg2) {
            var r1, r2, m;
            try {
                r1 = arg1.toString().split(".")[1].length
            } catch (e) {
                r1 = 0
            }
            try {
                r2 = arg2.toString().split(".")[1].length
            } catch (e) {
                r2 = 0
            }
            m = Math.pow(10, Math.max(r1, r2))
            return (arg1 * m + arg2 * m) / m
        };
        //除法函数，用来得到精确的除法结果
        //说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
        //调用：accDiv(arg1,arg2)
        //返回值：arg1除以arg2的精确结果
        self.accDiv = function (arg1, arg2) {
            var t1 = 0, t2 = 0, r1, r2;
            try {
                t1 = arg1.toString().split(".")[1].length
            } catch (e) {
            }
            try {
                t2 = arg2.toString().split(".")[1].length
            } catch (e) {
            }
            with (Math) {
                r1 = Number(arg1.toString().replace(".", ""))
                r2 = Number(arg2.toString().replace(".", ""))
                return (r1 / r2) * pow(10, t2 - t1);
            }
        };
        //乘法函数，用来得到精确的乘法结果
        //说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
        //调用：accMul(arg1,arg2)
        //返回值：arg1乘以arg2的精确结果
        self.accMul = function (arg1, arg2) {
            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length
            } catch (e) {
            }
            try {
                m += s2.split(".")[1].length
            } catch (e) {
            }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
        };
    },
    checkPhone:function(phoneNumber){
        if(!(/^1[345789]\d{9}$/.test(phoneNumber))){
               invalidPhone = true;
               alert('手机号码不合法')
               return invalidPhone;
        }
    }
}