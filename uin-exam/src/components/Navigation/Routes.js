import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../Home'
import Games from '../Games'
import Game from '../Game'
import Library from '../Library'
import Login from '../Login'

const RoutesComp = () => {
  return (
    <div className="pl-72 m-4">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:category" element={<Games />} />
            <Route path="/game/:slug" element={<Game />} />
            <Route path="/library" element={<Library />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  )
}

export default RoutesComp