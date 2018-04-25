import { message } from 'antd';
import { Store } from '../index';
import serverGoBackInfo from '../configure/serverGoBackInfo';
import { getCookie } from '../components/common/methods';

// 格式化请求参数
function formatParam(param = {}) {
    let qArr = [];

    for (let k in param) {
        let val = param[k];
        if (val) {
            if (typeof val !== 'string') {
                val = String(val);
            }
        }
        
        qArr.push(encodeURIComponent(k) + '=' + encodeURIComponent(val));
    }
    return qArr.join('&');
}

/**
 * 
 * @url {*请求的地址} url 
 * @method {*请求的方式，POST, GET} method 
 * @param {*请求参数} params 
 * @successBack {*成功的回调} successBack 
 * @errorBack {*失败的回调} errorBack 
 */
function httpRequest (url, method, params, successBack, errorBack = null) {
    Store.dispatch({ type: "app/save", payload: { loadState: true } });
    
    let newOptions = {};
    if (url.indexOf('login') === -1) {
        // params.token = JSON.parse(getCookie('userInfo')).token;
    }

    if (method === 'GET') { // 区分请求方式传参方式不一样
        if (JSON.stringify(params) !== "{}") {
            url = url + '?' + formatParam(params);
        }
    } else {
        params = formatParam(params);
        newOptions.body = params;
    }

    fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        mode: "no-cors", // 允许跨域
        // credentials: 'include', // 自动发送本地cookies
        ...newOptions
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        Store.dispatch({ type: "app/save", payload: { loadState: false } });

        if (String(data.code) === "200") {
            successBack && successBack(data);
        } else if (String(data.code) === "401") {
            message.warning('登录失效，请重新登录');
        } if (String(data.code) === "404") {
            message.error('资源未找到');
        } else if (String(data.code) === "500")  {
            message.error('服务器内部错误');
        } else if (String(data.code) === "403") {
            message.error('禁止访问');
        } else if (String(data.code) === "501") { // 参数错误
            let messages = [];

            data.info.forEach(item => {
                for (let key in serverGoBackInfo) {
                    if (String(item) === String(key)) {
                        messages.push(serverGoBackInfo[key])
                    }
                }
            })

            if (!messages.length) {
                message.warning("参数错误");
            } else {
                message.warning(messages.join(','));
            }
        }
    })
    .catch(error => {
        Store.dispatch({ type: "app/save", payload: { loadState: false } });
        message.error('喔唷，崩溃啦！');
        errorBack && errorBack();
    })
}

export default httpRequest;