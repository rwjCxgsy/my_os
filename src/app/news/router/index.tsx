import {renderRoutes, Routeres} from '../../../router/index'
import News from '../page/index'
import Info from '../page/info'

const route: Routeres[] = [
    {
        path: '/news',
        exact: true,
        component: News
    },
    {
        path: '/news/info',
        exact: true,
        component: Info
    }
]

console.log(renderRoutes)

const Router = renderRoutes(route)

export default Router