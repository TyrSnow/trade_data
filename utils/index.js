const fs = require('fs');
const moment = require('moment');

module.exports = {
    /**
     * 将数据保存到csv中
     * @param {*} fields 
     * @param {*} items 
     * @param {*} path 
     */
    to_csv(fields, items, path) {
        return new Promise((resolve, reject) => {
            let lines = [fields.join(',')];
            lines = lines.concat(items.map(item => item.join(',')));
    
            const content = lines.join('\n');
            fs.writeFile(path, content, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },
    /**
     * 读取csv文件，解析成对象数组
     * @param {*} path 
     */
    from_csv(path) {
        return new Promise((resolve, reject) => {

        });
    },
    /**
     * 将日期格式化成tushare的样式
     * @param {*} date 
     */
    prevDay(date) {
        let mDay = moment(date, 'YYYYMMDD');
        return mDay.subtract(1, 'days').format('YYYYMMDD');
    }
}
