/**
 * 启动自动更新任务
 */
const schedule = require('node-schedule');

// 每天定时执行，检查本地交易数据是否需要补充，需要的话，请求数据
schedule.scheduleJob('*/2 * * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});