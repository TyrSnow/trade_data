const axios = require('axios');
const token = require('../config').token;

const API_URL = 'http://api.tushare.pro';

function request(api_name, params) {
    return axios.post(API_URL, {
        api_name,
        "token": token,
        params
    }).then(res => {
        if (res.data && res.data.data) {
            return res.data;
        } else {
            return Promise.reject('请求Tushare接口失败');
        }
    });
}

module.exports = {
    list_all() {
        return request("stock_basic", {});
    },
    /**
     * 获取某支股票某一段时间的日线数据
     * @param {*} ts_code 
     * @param {*} start_date 
     * @param {*} end_date 
     */
    list_stock_daily(ts_code, start_date, end_date) {
        return request('daily', {
            ts_code,
            start_date,
            end_date,
        });
    },
    /**
     * 获取某一天全部股票的日线数据
     * @param {*} trade_date 
     */
    list_daily_stock(trade_date) {
        return request('daily', {
            trade_date,
        });
    }
};
