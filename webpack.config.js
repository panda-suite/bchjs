const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: "./src/index.ts",
    output: {
        filename: 'bch.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }],
            }, 
        ],
    },
    externals: {
    },
    resolve: {
        extensions: [ '*', '.ts', '.js' ]
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            extractComments:{
            condition: 'all',
            banner: `PandaCash`
        }})]
    },
};
