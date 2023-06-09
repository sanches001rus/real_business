import fs from 'fs';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FileIncludeWebpackPlugin from 'file-include-webpack-plugin-replace';
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from "terser-webpack-plugin";

import HtmlReplaceWebpackPlugin from 'html-replace-webpack-plugin';

import * as path from 'path';

const srcFolder = "src";
const builFolder = "dist";
const rootFolder = path.basename(path.resolve());
const repo = rootFolder //название репозитория github

// let pugPages = fs.readdirSync(srcFolder).filter(fileName => fileName.endsWith('.pug'))
// let htmlPages = [];

let htmlPages = fs.readdirSync(srcFolder).filter(fileName => fileName.endsWith('.html'))
const htmlPlugins = htmlPages.map((file) => {
	return new HtmlWebpackPlugin({
		template: `${srcFolder}/${file}`,  // Исходный файл
		filename: `../${file}`,  // Имя сгенерированного HTML-файла

	});
});
// Создаем массив конфигураций для замен в HTML-файлах
const htmlReplacements = htmlPages.map((file) => {
	return [
		// {
		// 	pattern: '/app.min', // Паттерн, который нужно заменить '@img', to: 'img'
		// 	replacement: 'js/app.min', // Заменяющий текст
		// },
		{
			pattern: '/../css', // Паттерн, который нужно заменить '@img', to: 'img'
			replacement: 'css', // Заменяющий текст
		},
		{
			pattern: '@img', // Паттерн, который нужно заменить '@img', to: 'img'
			replacement: 'img', // Заменяющий текст
		},
		{
			pattern: '../img', // Паттерн, который нужно заменить '@img', to: 'img'
			replacement: 'img', // Заменяющий текст
		},
		{
			pattern: 'NEW_PROJECT_NAME', // Паттерн, который нужно заменить '@img', to: 'img'
			replacement: rootFolder, // Заменяющий текст
		},
		// {
		// 	pattern: /<p>(.+?)<\/p>/g, // /g => replace all
		// 	replacement: '<div>$1</div>'
		// },
		{
			pattern: /href="\/(.*?)\.html"/g, // /g => replace all
			replacement: `href="${repo}/$1.html"`
		}

	];
}).flat();


// if (!pugPages.length) {
// 	htmlPages = [new FileIncludeWebpackPlugin({
// 		source: srcFolder,
// 		destination: '../',
// 		htmlBeautifyOptions: {
// 			"indent-with-tabs": true,
// 			'indent_size': 3
// 		},
// 		replace: [
// 			{ regex: '../img', to: 'img' },
// 			{ regex: '@img', to: 'img', },
// 			{ regex: 'NEW_PROJECT_NAME', to: rootFolder }
// 		],
// 	})]
// }

const paths = {
	src: path.resolve(srcFolder),
	build: path.resolve(builFolder)
}
const config = {
	mode: "production",
	cache: {
		type: 'filesystem'
	},
	optimization: {
		minimizer: [new TerserPlugin({
			extractComments: false,
		})],
	},
	output: {
		path: `${paths.build}`,
		filename: 'app.min.js',
		publicPath: 'js/',
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [
					{
						loader: 'simple-nunjucks-loader',
						options: {
							searchPaths: [
								`${paths.src}/html/templates`,
								`${paths.src}/html/components`,
							]
						}
					},
				],
			},
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'string-replace-loader',
						options: {
							search: '@img',
							replace: '../img',
							flags: 'g'
						}
					}, {
						loader: 'css-loader',
						options: {
							importLoaders: 0,
							sourceMap: false,
							modules: false,
							url: {
								filter: (url, resourcePath) => {
									if (url.includes("img") || url.includes("fonts")) {
										return false;
									}
									return true;
								},
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								outputStyle: "expanded",
							},
						}
					},
				],
			}, {
				test: /\.pug$/,
				use: [
					{
						loader: 'pug-loader'
					}, {
						loader: 'string-replace-loader',
						options: {
							search: '@img',
							replace: 'img',
							flags: 'g'
						}
					}
				]
			}
		],
	},
	plugins: [

		// ...htmlPages,
		// ...pugPages.map(pugPage => new HtmlWebpackPlugin({
		// 	minify: false,
		// 	template: `${srcFolder}/${pugPage}`,
		// 	filename: `../${pugPage.replace(/\.pug/, '.html')}`
		// })),

		...htmlPlugins,
		new HtmlReplaceWebpackPlugin(htmlReplacements),


		new MiniCssExtractPlugin({
			filename: '../css/style.css',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: `${paths.src}/data`, to: `../data`,
					noErrorOnMissing: true,
					force: true
				},
				{
					from: `${paths.src}/files`, to: `../files`,
					noErrorOnMissing: true
				}, {
					from: `${paths.src}/php`, to: `../`,
					noErrorOnMissing: true
				}, {
					from: `${paths.src}/favicon.ico`, to: `../`,
					noErrorOnMissing: true
				}
			],
		})
	],
	resolve: {
		alias: {
			"@scss": `${paths.src}/scss`,
			"@js": `${paths.src}/js`,
			"@img": `${paths.src}/img`
		},
	},
}
export default config;