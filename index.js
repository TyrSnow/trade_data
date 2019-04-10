const tushare = require('./api/tushare');
const utils = require('./utils');
const tasks = require('./tasks');

tasks.update_stock_list();
tasks.initial();