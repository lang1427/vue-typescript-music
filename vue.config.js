const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const LodashWebpackPlugin = require('lodash-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
module.exports = {

    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

    productionSourceMap: false,

    chainWebpack: confirm => {
        const types = ['vue-modules', 'vue', 'normal-module', 'normal']
        types.forEach(type => {
            addStyleResource(confirm.module.rule('less').oneOf(type))
        })
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },

    configureWebpack: {
        plugins: [
            // new BundleAnalyzerPlugin()
             new LodashWebpackPlugin() // 通过 webpack-bundle-analyzer和babel-plugin-lodash 对 lodash 进行按需引入
            ,new MomentLocalesPlugin({
                localesToKeep: ['es-us', 'zh-cn']
            }) // 移除 moment 不必要的语言环境
        ],
        resolve: {
            alias: {
                'components': '@/components',
                'utils': '@/utils',
                'views': '@/views'
            }
        }
    }
}

function addStyleResource(rule) {
    rule.use('style-resource').loader('style-resources-loader').options({
        patterns: [
            path.resolve(__dirname, './src/assets/less/reset.less')
        ]
    })
}