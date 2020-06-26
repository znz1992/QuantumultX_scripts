

//京东接口地址
const JD_API_HOST = 'https://api.m.jd.com/client.action';

//直接用NobyDa的jd cookie
const cookie = $hammer.read('CookieJD_t')
const name = $hammer.read('jd_fruit_name')
const $ = API("CookieJD_t");
const headers = {
    'Host': 'ms.jr.jd.com',
    'Accept': 'application/json',
    'Origin': 'https://uuj.jr.jd.com',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Referer': 'https://uuj.jr.jd.com/wxgrowing/moneytree7/index.html?channellv=sy',
    'Accept-Language': 'zh-CN,en-US;q=0.8',
    'X-Requested-With': 'com.jd.jrapp',
}
function user_info(cookies) {
    $.post({
        url: "https://ms.jr.jd.com/gw/generic/uc/h5/m/login?_="+(new Date()).valueOf(),
        body: JSON.stringify({
            'reqData': '{"shareType":1,"source":0,"riskDeviceParam":"{\\"fp\\":\\"\\",\\"eid\\":\\"\\",\\"sdkToken\\":\\"\\",\\"sid\\":\\"\\"}"}'
        }),
        headers: headers
      })
        .then((resp) => {
          // do something with response
        })
        .catch((err) => {
          // handle errors
        });


    data = {
        'reqData': '{"shareType":1,"source":0,"riskDeviceParam":"{\\"fp\\":\\"\\",\\"eid\\":\\"\\",\\"sdkToken\\":\\"\\",\\"sid\\":\\"\\"}"}'
    }
    
    response = requests.post(
        f'https://ms.jr.jd.com/gw/generic/uc/h5/m/login?_={int(time.time()*1000)}', headers=headers, data=data, cookies=cookies)

    return (response.json()['resultData']['data'])
}



function request(function_id, body = {}) {
    $hammer.request('GET', taskposturl(function_id, body), (error, response) => {
        error ? $hammer.log("Error:", error) : sleep(JSON.parse(response.body));
    })
}

function sleep(response) {
    console.log('休息一下');
    setTimeout(() => {
        $hammer.log('休息结束');
        $hammer.log(response)
        Task.next(response)
    }, 2000);
}
function taskposturl(function_id, body = {}) {
    return {
        url: 'https://ms.jr.jd.com/gw/generic/uc/h5/m/login?_={int(time.time()*1000)}',
        body: `functionId=${function_id}&body=${JSON.stringify(body)}&appid=wh5`,
        headers: {
            Cookie: cookie,
        },
        method: "POST",
    }
}

// prettier-ignore
/*********************************** API *************************************/
function API(t="untitled",s=!1){return new class{constructor(t,s){this.name=t,this.debug=s,this.isQX="undefined"!=typeof $task,this.isLoon="undefined"!=typeof $loon,this.isSurge="undefined"!=typeof $httpClient&&!this.isLoon,this.isNode="function"==typeof require,this.isJSBox=this.isNode&&"undefined"!=typeof $jsbox,this.node=(()=>this.isNode?{request:"undefined"!=typeof $request?void 0:require("request"),fs:require("fs")}:null)(),this.cache=this.initCache(),this.log(`INITIAL CACHE:\n${JSON.stringify(this.cache)}`),Promise.prototype.delay=function(t){return this.then(function(s){return((t,s)=>new Promise(function(e){setTimeout(e.bind(null,s),t)}))(t,s)})}}get(t){return this.isQX?("string"==typeof t&&(t={url:t,method:"GET"}),$task.fetch(t)):new Promise((s,e)=>{this.isLoon||this.isSurge?$httpClient.get(t,(t,i,o)=>{t?e(t):s({status:i.status,headers:i.headers,body:o})}):this.node.request(t,(t,i,o)=>{t?e(t):s({...i,status:i.statusCode,body:o})})})}post(t){return this.isQX?("string"==typeof t&&(t={url:t}),t.method="POST",$task.fetch(t)):new Promise((s,e)=>{this.isLoon||this.isSurge?$httpClient.post(t,(t,i,o)=>{t?e(t):s({status:i.status,headers:i.headers,body:o})}):this.node.request.post(t,(t,i,o)=>{t?e(t):s({...i,status:i.statusCode,body:o})})})}initCache(){if(this.isQX)return JSON.parse($prefs.valueForKey(this.name)||"{}");if(this.isLoon||this.isSurge)return JSON.parse($persistentStore.read(this.name)||"{}");if(this.isNode){const t=`${this.name}.json`;return this.node.fs.existsSync(t)?JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(t,JSON.stringify({}),{flag:"wx"},t=>console.log(t)),{})}}persistCache(){const t=JSON.stringify(this.cache);this.log(`FLUSHING DATA:\n${t}`),this.isQX&&$prefs.setValueForKey(t,this.name),(this.isLoon||this.isSurge)&&$persistentStore.write(t,this.name),this.isNode&&this.node.fs.writeFileSync(`${this.name}.json`,t,{flag:"w"},t=>console.log(t))}write(t,s){this.log(`SET ${s} = ${JSON.stringify(t)}`),this.cache[s]=t,this.persistCache()}read(t){return this.log(`READ ${t} ==> ${JSON.stringify(this.cache[t])}`),this.cache[t]}delete(t){this.log(`DELETE ${t}`),delete this.cache[t],this.persistCache()}notify(t,s,e,i){const o="string"==typeof i?i:void 0,n=e+(null==o?"":`\n${o}`);this.isQX&&(void 0!==o?$notify(t,s,e,{"open-url":o}):$notify(t,s,e,i)),this.isSurge&&$notification.post(t,s,n),this.isLoon&&$notification.post(t,s,e),this.isNode&&(this.isJSBox?require("push").schedule({title:t,body:s?s+"\n"+e:e}):console.log(`${t}\n${s}\n${n}\n\n`))}log(t){this.debug&&console.log(t)}info(t){console.log(t)}error(t){console.log("ERROR: "+t)}wait(t){return new Promise(s=>setTimeout(s,t))}done(t={}){this.isQX||this.isLoon||this.isSurge?$done(t):this.isNode&&!this.isJSBox&&"undefined"!=typeof $context&&($context.headers=t.headers,$context.statusCode=t.statusCode,$context.body=t.body)}}(t,s)}
/*****************************************************************************/
