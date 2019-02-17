// 日付チェック関数(YYYY/mm/dd形式)
function isDate(strDate){
    // 空文字は正常とみなす
    if ((strDate == null) || (strDate == '')) {
        return true;
    }
    // 日付フォーマットのチェック
    if (!strDate.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)) {
        return false;
    }

    // 変換後の日付と一致するかを確認
    const date = new Date(strDate);
    date.setTime(date.getTime() + 1000*60*60*9);    // JSTに変換
    if ((date.getFullYear() != strDate.split("/")[0])
     || (date.getMonth()    != strDate.split("/")[1] - 1)
     || (date.getDate()     != strDate.split("/")[2])){
        return false;
    }

    return true;
}


function dateCheck() {
    const test = [{"date": ""           , "result": true},
                  {"date": "2016/01/01" , "result": true},
                  {"date": "2017/02/28" , "result": true},
                  {"date": "2017/2/02"  , "result": true},
                  {"date": "2017/12/2"  , "result": true},
                  {"date": "20160101"   , "result": false},
                  {"date": "2016-01-01" , "result": false},
                  {"date": "2016/01/01/", "result": false},
                  {"date": "2017/02/29" , "result": false},
                  {"date": "2017/22/29" , "result": false}]
    for (let i in test) {
      let res = (test[i].result == isDate(test[i].date)) ? "OK" : "NG";
      console.log("isDate('%s')): result=%s", test[i].date, res);
    }
}


// 日付チェック関数(YYYYmmdd形式)
function isDateNumeric(strDate){
    // 空文字は正常とみなす
    if ((strDate == null) || (strDate == '')) {
        return true;
    }
    // 8文字でない場合はエラー
    if (strDate.length != 8) {
        return false;
    }

    // YYYYmmdd -> yyyy/mm/ddに変換
    let strDate2 = strDate.slice(0,4) + '/' + strDate.slice(4,6) + '/' + strDate.slice(6,8);

    // 変換後の日付と一致するかを確認
    const date = new Date(strDate2);
    date.setTime(date.getTime() + 1000*60*60*9);    // JSTに変換
    if ((date.getFullYear() != Number(strDate.slice(0,4)))
     || (date.getMonth()    != Number(strDate.slice(4,6)) - 1)
     || (date.getDate()     != Number(strDate.slice(6,8)))) {
        return false;
    }

    return true;
}


function dateCheckNumeric() {
    const test = [{"date": ""          , "result": true},
                  {"date": "20160101"  , "result": true},
                  {"date": "20171228"  , "result": true},
                  {"date": "2017202"   , "result": false},
                  {"date": "20190140"  , "result": false},
                  {"date": "20191301"  , "result": false},
                  {"date": "2016/01/01", "result": false},
                  {"date": "2017-02-29", "result": false}]
    for (let i in test) {
      let res = (test[i].result == isDateNumeric(test[i].date)) ? "OK" : "NG";
      console.log("isDateNumeric('%s')): result=%s", test[i].date, res);
    }
}
