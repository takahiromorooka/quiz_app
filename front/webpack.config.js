const path = require('path');

module.exports = [
    {
        entry:  {
            'index': './src/entries/index.js',
            'admin/questions/index': './src/entries/admin/questions/index.js'
        },
        output: {
            path: path.resolve(__dirname, '../app/assets/javascripts/webpack'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['babel-preset-env', 'react']
                        }
                    }
                }
            ]
        },
        resolve: {
            modules: [path.resolve(__dirname, "src"), "node_modules"],
            extensions: ['.js']
        }
    }
]
