const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

const path = require('path');
const webpack = require("webpack");
const dotenv = require('dotenv')

module.exports = ({mode} = {mode: "production"}) => {
    console.log(`mode is: ${mode}`);

    return {
        mode,
        entry: "./src/index.js",
        devServer: {
            // hot: true,
            // open: true,
            historyApiFallback: {
                index: "/"
            }
        },
        output: {
            publicPath: "/",
            path: path.resolve(__dirname, "build"),
            filename: "bundled.js"
        },
        module: {
            rules: [
                {
                    test: /\.jpe?g|png$/,
                    exclude: /node_modules/,
                    use: ["url-loader", "file-loader"]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/react"]
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html"
            }),
            new MonacoWebpackPlugin({
                languages: ["json", "yaml"],
            }),
            new CopyPlugin({
                patterns: [
                    // move all images from public/img/ to /img/ folder in the build.
                    {
                        from: `public/img/`,
                        to: `img/`
                    },
                    {
                        from: `public/favicon.png`,
                        to: `favicon.png`
                    },
                    {
                        from: `public/robots.txt`,
                        to: `robots.txt`
                    },
                    {
                        from: `src/manifest.json`,
                        to: `manifest.json`
                    }
                ]
            }),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(dotenv.config().parsed) // it will automatically pick up key values from .env file
            })
        ]
    }
};