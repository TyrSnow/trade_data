const ts = require('../api/tushare');
const utils = require('../utils');

module.exports = {
    update_stock_list() {
        return ts.list_all().then(res => {
            return utils.to_csv(res.data.fields, res.data.items, './data/list.csv');
        });
    },

    async initial_stock_daily(stock) {
        let end_date;
        let start_date = stock.list_date; // 从上市时间开始
        let fields;
        let items = [];
        let next = true;
        let res;
        while (next) {
            res = await ts.list_stock_daily(stock.ts_code, start_date, end_date);
            let resLen = res.data.items.length;
            if (resLen > 0) {
                fields = res.data.fields;
                items = items.concat(res.data.items);
                end_date = utils.prevDay(res.data.items[resLen - 1][1]);
                if (end_date == start_date) {
                    next = false;
                }
            } else { // 没有请求到数据，结束
                next = false;
            }
        }

        utils.to_csv(fields, items, `./data/${stock.symbol}.csv`);
    },

    async initial_stocks_daily(stocks) {
        let len = stocks.length;
        for (let i = 0; i < len; i++) {
            let stock = stocks[i];
            console.log(`[Initial]Stock: ${stock.symbol} ${i} / ${len}`);
            await this.initial_stock_daily(stock);
        }
    },

    /**
     * 初始化本地数据
     */
    initial() {
        return ts.list_all().then(res => {
            let stocks = res.data.items.map(([ts_code, symbol, name, area, industry, market, list_date]) => ({
                ts_code, symbol, name, area, industry, market, list_date,
            }));

            return this.initial_stocks_daily(stocks);
        });
    },
};
