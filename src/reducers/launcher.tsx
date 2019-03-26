

let iocnList: Ilauncher[] = [
    {
        type: 1,
        id: '1',
        icon: require('../assets/icon/imageres.dll(109).ico'),
        text: '我的电脑',
        launcher: 'open'
    },
    {
        type: 1,
        id: '1',
        icon: require('../assets/icon/imageres.dll(178).ico'),
        text: '用户',
        launcher: 'open'
    },
    {
        type: 1,
        id: '1',
        icon: require('../assets/icon/imageres.dll(55).ico'),
        text: '回收站',
        launcher: 'open'
    },
    {
        type: 1,
        id: '1',
        icon: require('../assets/icon/imageres.dll(1021).ico'),
        text: '控制面板',
        launcher: 'open'
    },
    {
        type: 1,
        id: '1',
        icon: require('../assets/icon/imageres.dll(25).ico'),
        text: '网络',
        launcher: 'open'
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