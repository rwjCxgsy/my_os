
const merchantRouter = [
    {
        path: '/merchant',
        component: require('@/views/merchant/layout.js').default,
        children: [
            {
                path: '/merchant/',
                component: require('@/views/merchant/merchantBasic.js').default,
            },
            {
                path: '/merchant/result',
                component: require('@/views/merchant/result.js').default,
            },
        ]
    }
]
export default merchantRouter