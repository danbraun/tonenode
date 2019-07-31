const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

const parts = require('./webpack.parts')

const commonConfig = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Tonenode',
            }),
        ],
    },
])

const productionConfig = merge([])

const developmentConfig = merge([
    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
    }),
])

module.exports = mode => {
    if (mode === 'production') {
        return merge(commonConfig, productionConfig, { mode })
    }
    return merge(commonConfig, developmentConfig, { mode })
}
