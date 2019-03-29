
import Computer from '../app/computer'
import Browser from '../app/browser'
import Os from '../app/os'
import YouKu from '../app/youku'
let iocnList: Ilauncher[] = [
    {
        type: 1,
        id: '1',
        icon: '#icon-ONLINEQUESTION',
        title: '我的电脑',
        app: Os
    },
    {
        type: 1,
        id: '2',
        icon: '#icon-WORLD',
        title: '浏览器',
        app: Browser
    },
    {
        type: 1,
        id: '3',
        icon: '#icon-MAILBOX',
        title: '邮件',
        app: undefined
    },
    {
        type: 2,
        id: '4',
        icon: '#icon-jisuanqi',
        title: '计算器',
        app: Computer
    },
    {
        type: 3,
        id: '5',
        icon: '#icon-wenjianjia',
        title: '文件夹',
        app: undefined
    },
    {
        type: 4,
        id: '6',
        icon: '#icon-wenjian',
        title: '文件',
        app: undefined
    },
    {
        type: 2,
        id: '7',
        icon: '#icon-xiami',
        title: '虾米音乐',
        app: undefined
    },
    {
        type: 2,
        id: '8',
        icon: '#icon-youku',
        title: '优酷',
        app: YouKu
    }
]

export function getAppList (): Ilauncher[] {
    return iocnList
}
