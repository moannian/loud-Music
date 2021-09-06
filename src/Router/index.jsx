import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'

//主要的路由
import Home from '@/View/Home'
import LQMYMiusic from '@/View/MyMiusic'
import LQLyric from '@/View/Lyric/Lyric'

// HOme的路由
import Recommend from '../View/Home/Components/Recommend'
import Ranking from '../View/Home/Components/Ranking'
export const MajorRouter = () => {
    return (
        <div>

            <Switch>
                <Route path='/home' component={Home} ></Route>
                <Route path='/mymiusic' component={LQMYMiusic} ></Route>
                <Route path='/LQLyric' component={LQLyric} ></Route>
                <Redirect to='/home' />
            </Switch>
        </div>
    )
}
export const HomeRouter = () => {
    return (
        <div>
            <Switch>
                <Route path='/home/recommend' component={Recommend} ></Route>
                <Route path='/home/ranking' component={Ranking}></Route>
                <Redirect to='/home/recommend' />
            </Switch>
        </div>
    )
}


