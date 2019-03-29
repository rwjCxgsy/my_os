interface IlauncherAction {
    iconLauncher: Ilauncher,
    type: string,
}

export default function (state: Ilauncher[] = [], action: IlauncherAction) {
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