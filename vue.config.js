const path = require("path")
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// 生产环境
const isProduction = process.env.NODE_ENV === 'production';
// cdn列表
const cdnLists = {
	css: ['https://static.xwsbj.com/web/npm/cesium@1.80.0/Widgets/widgets.css'],
	// js: []
}

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	publicPath: isProduction ? './' : '/', // 静态资源路径
	outputDir: 'dist', // 打包后文件的目录 （默认为dist）
	assetsDir: 'static', // 静态资源(js、css、img、fonts)目录
	productionSourceMap: false, //去除生产环境的productionSourceMap
	devServer: {
		open: true, // 自动启动浏览器
		host: 'localhost', // 主机名
		port: 8957, // 端口号
		hotOnly: false, // 热更新
		//  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
		overlay: {
			warnings: false,
			errors: true
		},
		//配置代理
		// proxy: {
		// 	'/api': {
		// 		target: '', // 接口的域名
		// 		// ws: true, // 是否启用websockets
		// 		changeOrigin: true, // 开启代理
		// 		pathRewrite: {
		// 			'^/api': ''
		// 		}
		// 	}
		// }
	},
	css: {
		loaderOptions: {
			less: {
				// additionalData: `@import "~@/assets/style/variables.less";`,// 引入一些全局变量文件等
				lessOptions: {
					modifyVars: {},// 设置变量
					javascriptEnabled: true,
				},
			},
		}
	},
	chainWebpack: config => {
		// 添加别名
		config.resolve.alias
			.set('@', resolve('src'))
			.set('api', resolve('src/api'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('config', resolve('src/config'))
			.set('router', resolve('src/router'))
			.set('store', resolve('src/store'))
			.set('views', resolve('src/views'))
			.set('@ant-design/icons/lib/dist$', resolve("src/antd/icons.js"))
		// 打包分析
		if (isProduction) {
			config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin)
		}
		// html插件
		config.plugin('html').tap(args => {
			args[0].title = 'xws-admin-web2'
			args[0].cdnLists = cdnLists
			return args
		})
	},
	configureWebpack: config => {
		if (isProduction) {
			// 配置js压缩
			config.plugins.push(
				new UglifyJsPlugin({
					uglifyOptions: {
						output: {
							comments: false, // 去掉注释
						},
						warnings: false,
						compress: {
							drop_console: true,
							drop_debugger: true,
							pure_funcs: ['console.log'] //移除console
						}
					}
				})
			)
			// 配置gzip压缩(需要后端nginx配合,查看nginx.conf文件配置详情)
			config.plugins.push(
				new CompressionWebpackPlugin({
					filename: '[path].gz[query]',// 文件名
					algorithm: 'gzip',// 压缩算法
					test: /\.js$|\.json$|\.css/,// 匹配需要gzip的文件
					threshold: 1024 * 10, // 只有大小大于该阈值(10k)的资源会被处理
					minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
					// deleteOriginalAssets: true // 压缩后是否删除原文件
				})
			)
			// 限制打包的chunk数量(根据项目实际情况自定)
			config.plugins.push(
				new webpack.optimize.LimitChunkCountPlugin({
					maxChunks: 6
				})
			)
		}
	},
}
