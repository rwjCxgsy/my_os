// import { duration } from "moment";
import { ProgressCircular,  } from 'react-onsenui';
import ReactDOM from 'react-dom';
import { ReactHTML, ReactNode } from 'react';
import React from 'react'

export function parseQuery (query: string) {
    let search = location.href.split('?')[1]
    if (!search) {
        return null
    }
    const reg = `(${query})=([^&]+)`
    const result = search.match(reg)
    return result ? result[2] : null
}

interface Ioption {
    message: '',
    duration: 0
}

let div: HTMLElement | null = null

class Loading extends React.Component<any> {
    render () {
        return (
            <div className="mask">
                <div>
                    <ProgressCircular indeterminate/>
                    <p>
                        {this.props.message}
                    </p>   
                </div>
            </div>
        )
    }
}

let loadingInstance: any
export function loading (message: string) {
    destory()
    div = document.createElement('div')
    ReactDOM.render(<Loading message={message}/>, div)
    document.body.append(div)
}

export function destory () {
    if (div) {
        ReactDOM.unmountComponentAtNode(div)
        div.remove()
        div = null
    }
}