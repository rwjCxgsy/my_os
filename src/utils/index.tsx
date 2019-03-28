
export function addDocumentMoveEvent (fn: (e: MouseEvent) => void) {
    document.addEventListener('mousemove', e => {
        fn(e)
    })
}

export function removeDocumentMoveEvent () {
    document.removeEventListener('mousemove', e => {
        console.log('移除')
    })
}


export function addDocumentUpEvent (fn: (e: MouseEvent) => void) {
    document.addEventListener('mouseup', e => {
        fn(e)
    })
}

export function removeDocumentUpEvent () {
    document.removeEventListener('mouseup', e => {
        console.log('移除')
    })
}