//基于craco的配置文件,与config-overrides二选一即可
//选择本文件需要将package.json中的start等命令改为craco start...
//安装的插件有：@craco/craco、craco-less、antd、@babel/plugin-proposal-decorators
const CracoLessPlugin = require('craco-less');
const modifyVars = require('./lessVars');

module.exports = {
  babel: {   //用来支持装饰器
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: modifyVars,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};