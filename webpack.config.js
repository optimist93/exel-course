const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = (env, argv) => {

    const isProd = argv.mode === 'production'
    const isDev = !isProd
    
    console.log('IsProd', isProd);
    console.log('IsDev', isDev);


    const filename = ext => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`

    const plugins = () => {
        const base = [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new CopyPlugin({
                patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                },
                ],
            }),
        ]

        if (isDev) {
            base.push(new ESLintPlugin())
        }
        return base
    }

    return {
        target: 'web',
        context: path.resolve(__dirname, 'src'),
        entry: {
            main: './index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: filename('js'),
            clean: true
        },
        resolve: {
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@core': path.resolve(__dirname, 'src', 'core'),
            }
        },
        devServer: {
            port: '2500',
            open: true,
            hot: true,
            watchFiles: './'
        },
        devtool: isDev ? 'source-map' : false, 
        plugins: plugins(),
    }
}