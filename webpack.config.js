const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(woff|woff2|eot|ttf|otf|dtd|svg)$/,
            use: [
                'file-loader'
            ]
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            jQuery: "jquery"
        })
    ],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    }
};
