module.exports = {
	presets: [
		'@vue/cli-plugin-babel/preset'
	],
	plugins: [
		[
			"import",
			{
				libraryName: "ant-design-vue",
				libraryDirectory: "es",
				style: "css",// 配置为true时会加载 less 文件(这里会报错，暂时先用css)
			}
		]
	]
}
