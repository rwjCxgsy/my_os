
import Computer from '../app/computer'
import Browser from '../app/browser'
// import Os from '../app/os'
// import Elevator from '../app/elevator'
import YouKu from '../app/youku'
import News from '../app/news'
import Wechat from '../app/wechat'

let iocnList: Ilauncher[] = [
    {
        type: 2,
        id: '1',
        icon: '#icon-jisuanqi1',
        title: '计算器',
        app: Computer,
        router: '/jisuanqi'
    },
    {
        type: 2,
        id: '3',
        icon: '#icon-youku',
        title: '优酷',
        app: YouKu
    },
    {
        type: 2,
        id: '4',
        icon: '#icon-xinwennews',
        title: '新闻',
        app: News,
        router: '/news'
    },
    {
        type: 2,
        id: '5',
        icon: '#icon-yinle',
        title: '音乐',
        app: YouKu
    },
    // {
    //     type: 2,
    //     id: '6',
    //     icon: '#icon-xiangji',
    //     title: '相机',
    //     app: YouKu
    // },
    // {
    //     type: 2,
    //     id: '7',
    //     icon: '#icon-weixindenglu',
    //     title: '微信',
    //     app: Wechat,
    //     router: '/wechat'
    // },
    {
        type: 2,
        id: '7',
        icon: '#icon-tianqi',
        title: '天气'
    }
]

export function getAppList (): Ilauncher[] {
    return iocnList
}
