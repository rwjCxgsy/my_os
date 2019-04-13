
export function parseQuery (query: string) {
    let search = location.href.split('?')[1]
    if (!search) {
        return null
    }
    const reg = `(${query})=([^&]+)`
    const result = search.match(reg)
    return result ? result[2] : null
}