module.exports = {
    entry: "./src/app.ts",
    vendor: ['angular', 'crypto-js/sha256'],
    output: {
        filename: "bundle.js"
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts',  '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};