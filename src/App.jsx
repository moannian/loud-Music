import React, { memo, useEffect } from 'react'
import { Provider } from 'react-redux'

import { MajorRouter } from '@/Router/index'
import AppHeader from './Components/App-header'
import AppFooter from './Components/App-footer'
import AppPlay from './Components/App-play/AppPlay'
import store from './Redux/store'

import './assets/css/reset.css'

import './assets/Less/App.less'
export default memo(function App() {
    let storage = window.localStorage;


    Array.prototype.Remove = function (arr) {
        let index = this.indexOf(arr)
        if (index != -1) {
            return this.splice(index, 1)
        }
        return null
    }
    return (

        <div className='App'>
            <Provider store={store}>
                <header>
                    <AppHeader />
                </header>
                <div>
                    <MajorRouter />
                </div>
                <footer>
                    <AppFooter />
                </footer>
                <AppPlay />
            </Provider>
        </div>

    )
})
