import {Action} from 'redux'
export default function (state = false, action: Action) {
    switch (action.type) {
        case 'open_menu':
            return true
        default:
            return false
    }
}