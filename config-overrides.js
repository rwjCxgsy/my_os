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
const { override, useBabelRc, fixBabelImports, addPostcssPlugins, addLessLoader, addWebpackAlias, addTslintLoader } = require("customize-cra");

module.exports = override(
    useBabelRc(),
    addWebpackAlias({
        '@': resolve('src')
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#2F54EB' },
        // strictMath: true,
        // noIeCompat: true,
        localIdentName: '[local]--[hash:base64:5]' // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    }),
    addPostcssPlugins([
        // require("postcss-px2rem")({ remUnit: 37.5 })
        require('postcss-preset-env')(), 
        require("postcss-aspect-ratio-mini"), 
        require("postcss-write-svg")({utf8: false}), 
        // require("postcss-cssnext"), 
        // require("postcss-px-to-viewport")({    
        //     viewportWidth: 750,    
        //     unitPrecision: 3,    
        //     viewportUnit: 'vw',    
        //     selectorBlackList: ['.ignore', '.hairlines', /antd-/, /am-/, /.*--material/],    
        //     minPixelValue: 1,   
        //     mediaQuery: false
        // }),
    ]),
    addTslintLoader(),
);