import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Main from "./Main";
import Voyger from "./Voyger";

const AppRouter = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/Voyger" element={<Voyger/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRouter;