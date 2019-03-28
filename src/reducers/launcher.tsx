
import Computer from '../app/computer'

let iocnList: Ilauncher[] = [
    {
        type: 1,
        id: '1',
        icon: require('../assets/icon/imageres.dll(109).ico'),
        title: '我的电脑',
        launcher: 'open'
    },
    {
        type: 1,
        id: '2',
        icon: require('../assets/icon/imageres.dll(178).ico'),
        title: '用户',
        launcher: 'open'
    },
    {
        type: 1,
        id: '3',
        icon: require('../assets/icon/imageres.dll(55).ico'),
        title: '回收站',
        launcher: 'open'
    },
    {
        type: 1,
        id: '4',
        icon: require('../assets/icon/imageres.dll(1021).ico'),
        title: '控制面板',
        launcher: 'open',
        app: Computer
    },
    {
        type: 1,
        id: '5',
        icon: require('../assets/icon/imageres.dll(25).ico'),
        title: '网络',
        launcher: 'open',
        app: Computer
    },
]

interface IlauncherAction {
    iconLauncher: Ilauncher,
    type: string,
}

export default function (state = iocnList, action: IlauncherAction) {
    switch (action.type) {
        case 'add_launcher':
            // const {iconLauncher} = action
            return [...state, action.iconLauncher]
        case 'remove_launcher':
            const _state = state.filter(v => {
                return v.id !== action.iconLauncher.id
            })
            return [..._state]
        default:
            return state
    }
}