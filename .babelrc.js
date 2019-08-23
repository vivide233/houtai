module.exports = {
    presets: ["@babel/preset-env"],
    plugins: [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ],
        ["@babel/plugin-transform-runtime",{
            "corejs": 2,
        }]
    ]
}