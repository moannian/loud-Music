import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import '@/assets/css/Base.css'
import App from './App'
render( < HashRouter > < App / > < /HashRouter> , document.querySelector('#root'))