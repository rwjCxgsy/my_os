import {renderRoutes, Routeres} from '../../../router/index'
import Wechat from '../page/index'

const route: Routeres[] = [
    {
        path: '/wechat',
        exact: true,
        component: Wechat
    }
]

console.log(renderRoutes)

const Router = renderRoutes(route)

export default Router