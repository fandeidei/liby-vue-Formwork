/*
 * @Descripttion: 
 * @version: 
 * @Author: gonghairun
 * @Date: 2020-05-06 19:32:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-27 13:41:04
 */

const TimeStamp = new Date().getTime();
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 
module.exports = {
    publicPath: './', 
    //vue-cli的api
    outputDir: 'verticalNetSupplyScreen',
    configureWebpack: {       //对webpack配置
		devServer: {
			proxy: {        //跨域代理
				'/api': {
					target: 'http://ko.196.152.com',        //baseURL
					changeOrigin: true,               //是否开启跨域
					pathRewrite: {
						'^/api': ''          //让路径以/api开头的字段为空
					}
				}
			}
        },
         //底层会通过webpack的配置项output.path实现
        output: {
            filename: `js/[name].${TimeStamp}.js`,
            chunkFilename: `js/[name].${TimeStamp}.js`
        },
        performance: {
            hints:'warning',
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
	},
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({//这里是配置项，详见官方文档
                        rootValue : 20, // 换算的基数
                        selectorBlackList  : ['weui','mu'], // 忽略转换正则匹配项
                        propList   : ['*'],
                    }),
                ]
            }
        }
    },
}
