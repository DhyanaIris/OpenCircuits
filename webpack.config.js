const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

function baseUrl(subdir) {
    return path.join(__dirname, ".", subdir);
}

const config = {
    entry: './site/public/ts/Main.ts',
    output: {
        filename: 'Bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'site/data',       to: 'data'},
            {from: 'site/templates',  to: 'templates'},
            {from: 'site/public/examples',   to: 'examples'},
            {from: 'site/public/img', to: 'img'}
        ])
    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'ts-loader',
                    options: {onlyCompileBundledFiles: true}
                }
            }
        ]
    },
    resolve: {
        alias: {
            "Vector": baseUrl('app/core/ts/utils/math/Vector'),
            "math": baseUrl('app/core/ts/utils/math'),
            "core/utils": baseUrl('app/core/ts/utils'),
            "digital": baseUrl('app/digital/ts')
        },
        extensions: ['.ts', '.js']
    }
};

module.exports = (env, argv) => {
    config.plugins.push(new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(!(argv.mode === 'development'))
    }));

    return config;
};
