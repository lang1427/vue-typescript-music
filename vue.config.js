const path = require('path')
module.exports = {

    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

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