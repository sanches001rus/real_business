import fs from 'fs';
import FileIncludeWebpackPlugin from 'file-include-webpack-plugin-replace';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from "copy-webpack-plugin";

import HtmlReplaceWebpackPlugin from 'html-replace-webpack-plugin';

import * as path from 'path';

const srcFolder = "src";
const builFolder = "dist";
const rootFolder = path.basename(path.resolve());

// let pugPages = fs.readdirSync(srcFolder).filter(fileName => fileName.endsWith('.pug'))
// let htmlPages = [];


let htmlPages = fs.readdirSync(srcFolder).filter(fileName => fileName.endsWith('.html'))
const htmlPlugins = htmlPages.map((file) => {
	return new HtmlWebpackPlugin({
		template: `${srcFolder}/${file}`,  // Исходный файл
		filename: `${file}`,  // Имя сгенерированного HTML-файла
	});
});
// Создаем массив конфигураций для замен в HTML-файлах
const htmlReplacements = htmlPages.map((file) => {
	return [
		{
			pattern: '@img', // Паттерн, который нужно заменить '@img', to: 'img'
			replacement: 'img', // Заменяющий текст
		},
		{
			pattern: '<link rel="stylesheet" href="css/style.min.css">', // Паттерн, который нужно заменить '@img', to: 'img'
			replacement: '', // Заменяющий текст
		},
		{
			pattern: '../img', // Паттерн, который нужно заменить '@img', to: 'img'
			replacement: 'img', // Заменяющий текст
		},
		{
			pattern: 'NEW_PROJECT_NAME', // Паттерн, который нужно заменить '@img', to: 'img'
			replacement: rootFolder, // Заменяющий текст
		},
	];
}).flat();


// if (!pugPages.length) {
// 	htmlPages = [new FileIncludeWebpackPlugin({
// 		source: srcFolder,
// 		htmlBeautifyOptions: {
// 			"indent-with-tabs": true,
// 			'indent_size': 3
// 		},
// 		replace: [
// 			{ regex: '<link rel="stylesheet" href="css/style.min.css">', to: '' },
// 			{ regex: '../img', to: 'img' },
// 			{ regex: '@img', to: 'img' },
// 			{ regex: 'NEW_PROJECT_NAME', to: rootFolder }
// 		],
// 	})];
// }


const paths = {
	src: path.resolve(srcFolder),
	build: path.resolve(builFolder)
}
const config = {
	mode: "development",
	devtool: 'inline-source-map',
	optimization: {
		minimize: false
	},
	entry: [
		`${paths.src}/js/app.js`
	],
	output: {
		path: `${paths.build}`,
		filename: 'js/app.min.js',
		publicPath: '/'
	},
	devServer: {
		historyApiFallback: true,
		static: paths.build,
		open: true,
		compress: true,
		port: 'auto',
		hot: true,
		host: 'local-ip', // localhost

		// Розкоментувати на слабкому ПК
		// (в режимі розробника папка результатом (dist) буде створюватися на диску)

		// devMiddleware: {
		// 	writeToDisk: true,
		// },


		watchFiles: [
			`${paths.src}/**/*.html`,
			`${paths.src}/**/*.pug`,
			`${paths.src}/**/*.htm`,
			`${paths.src}/img/**/*.*`,
			`${paths.src}/**/*.json`,
		],
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
				exclude: `${paths.src}/fonts`,
				use: [
					'style-loader',
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
							sourceMap: true,
							importLoaders: 1,
							modules: false,
							url: {
								filter: (url, resourcePath) => {
									if (url.includes("img/") || url.includes("fonts/")) {
										return false;
									}
									return true;
								},
							},
						},
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						}
					}
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

		...htmlPlugins,
		new HtmlReplaceWebpackPlugin(htmlReplacements),

		new CopyPlugin({
			patterns: [
				{
					from: `${srcFolder}/data`, to: `data`,
					noErrorOnMissing: true,
					force: true
				},
				{
					from: `${srcFolder}/img`, to: `img`,
					noErrorOnMissing: true,
					force: true
				}, {
					from: `${srcFolder}/files`, to: `files`,
					noErrorOnMissing: true,
					force: true
				}, {
					from: `${paths.src}/favicon.ico`, to: `./`,
					noErrorOnMissing: true
				}
			],
		}),
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






