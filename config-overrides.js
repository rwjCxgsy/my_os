// // const tsImportPluginFactory = require('ts-import-plugin')
// // const {getLoader,injectBabelPlugin} = require("react-app-rewired") 
// const rewireLess = require("react-app-rewire-less") 
// const path = require('path')
// function resolve(dir) {
//     return path.join(__dirname, dir)
// }
// module.exports = function override(config, env) {
//     config.resolve.alias = {
//         '@': resolve('src')
//     };
//     const pxToVw = [
//         require('postcss-preset-env')(), 
//         require("postcss-aspect-ratio-mini"), 
//         require("postcss-write-svg")({utf8: false}), 
//         // require("postcss-cssnext"), 
//         require("postcss-px-to-viewport")({    
//             viewportWidth: 750,    
//             unitPrecision: 3,    
//             viewportUnit: 'vw',    
//             selectorBlackList: ['.ignore', '.hairlines', /antd-/, /am-/],    
//             minPixelValue: 1,   
//             mediaQuery: false    
//         }),   
//         require("postcss-viewport-units"),    
//         // require("cssnano")({    
//         //         preset: "advanced",    
//         //             autoprefixer: false,    
//         //             "postcss-zindex": false    
//         //         })
//     ] 
//     require('react-app-rewire-postcss')(config, { plugins: loader => {
//             return pxToVw 
//         } 
//     }) 
//     config = rewireLess(config, env); 
//     // if (process.env.NODE_ENV === 'production') {    
//     //     config.output.publicPath = './' 
//     // }
//     return config; 
// }



const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
const {
    override,
    useBabelRc,
    fixBabelImports,
    addPostcssPlugins,
    addLessLoader,
    addWebpackAlias,
    addTslintLoader,
    overrideDevServer
} = require("customize-cra");


const publicPath = () => config => {
    config.output.publicPath = './'
    config.output.path = path.resolve(__dirname, 'dist')
    require('fs').writeFile('./config.json', JSON.stringify(config, null, 2), 'utf8', (err) => {
        if (err) {
            throw (err)
        }
        console.log('scucces')
    })
    return config
}

const server = () => {
    return (arg2) => {
        arg2.proxy = {
            "/toutiao": "http://v.juhe.cn"
        }
        // arg2.open = false
        console.log('--------------server--------------')
        console.log(arg2)
        require('fs').writeFile('./serveconfig.json', JSON.stringify(arg2, null, 2), 'utf8', (err) => {
            if (err) {
                throw (err)
            }
            console.log('scucces')
        })
        return arg2
    }
}

module.exports = {
    webpack: override(
        useBabelRc(),
        addWebpackAlias({
            '@': resolve('src')
        }),
        fixBabelImports('import', {
            libraryName: 'antd-mobile',
            libraryDirectory: 'es',
            style: true
        }),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: {
                '@primary-color': '#2F54EB'
            },
            // strictMath: true,
            // noIeCompat: true,
            localIdentName: '[local]--[hash:base64:5]' // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
        }),
        addPostcssPlugins([
            // require("postcss-px2rem")({ remUnit: 37.5 })
            require('postcss-preset-env')(),
            require("postcss-aspect-ratio-mini"),
            require("postcss-write-svg")({
                utf8: false
            }),
            // require("postcss-cssnext"), 
            require("postcss-px-to-viewport")({
                viewportWidth: 750,
                unitPrecision: 3,
                viewportUnit: 'vw',
                selectorBlackList: ['.ignore', '.hairlines', /antd-/, /am-/, /.*--material/],
                minPixelValue: 1,
                mediaQuery: false,
                exclude: /(\/|\\)(node_modules)(\/|\\)/
            }),
        ]),
        addTslintLoader()
        // publicPath()
    ),
    devServer: overrideDevServer(
        server()
    )
}

// module.exports = override(
//     useBabelRc(),
//     addWebpackAlias({
//         '@': resolve('src')
//     }),
//     fixBabelImports('import', {
//         libraryName: 'antd-mobile',
//         libraryDirectory: 'es',
//         style: true
//     }),
//     addLessLoader({
//         javascriptEnabled: true,
//         modifyVars: {
//             '@primary-color': '#2F54EB'
//         },
//         // strictMath: true,
//         // noIeCompat: true,
//         localIdentName: '[local]--[hash:base64:5]' // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
//     }),
//     addPostcssPlugins([
//         // require("postcss-px2rem")({ remUnit: 37.5 })
//         require('postcss-preset-env')(),
//         require("postcss-aspect-ratio-mini"),
//         require("postcss-write-svg")({
//             utf8: false
//         }),
//         // require("postcss-cssnext"), 
//         require("postcss-px-to-viewport")({
//             viewportWidth: 750,
//             unitPrecision: 3,
//             viewportUnit: 'vw',
//             selectorBlackList: ['.ignore', '.hairlines', /antd-/, /am-/, /.*--material/],
//             minPixelValue: 1,
//             mediaQuery: false,
//             exclude: /(\/|\\)(node_modules)(\/|\\)/
//         }),
//     ]),
//     addTslintLoader(),
//     publicPath()
// );