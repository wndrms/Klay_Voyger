import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Main from "./Main";
import Voyger from "./Voyger";

const AppRouter = ({address, onLogin}) => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Main address={address} onLogin={onLogin}/>}></Route>
                <Route path="/Voyger" element={<Voyger address={address} onLogin={onLogin}/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRouter;