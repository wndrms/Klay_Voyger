import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import './Header.scss';


const Header = (props) => {
    const navigate = useNavigate();
    const [account, setaccount] = useState(props.address);
    const [open, setopen] = useState(false);

    const onLogin = async () => {
        if (typeof window.klaytn !== 'undefined') {
            // Kaikas user detected. You can now use the provider.
            const provider = window['klaytn']
        }
        try {
            const accounts = await window.klaytn.enable();
            setaccount(accounts['0'])
            props.onLogin(accounts['0'])
        } catch(e){
            console.error(e);
        }
    }

    const onLogout = async () => {
        try {
            await window.klaytn.on('disconnect', () => {});
            setaccount('');
            props.onLogin();
            setopen(false);
        } catch(e){
            console.error(e);
        }
    }

    const cutaddress = (address) => {
        let cut = address.substr(0, 5) + '. . .' + address.substr(-4, 4);
        return cut
    }
    return(
        <>
            <header id="main-header">
                <section className="main-header">
                    <div>
                        <div className="main-header_logo">
                                <img 
                                    className="logo_img" 
                                    src="/img/logo@3x.png" 
                                    alt="main logo"
                                    onClick={() => navigate('/')}/>
                        </div>
                    </div>
                    <div className="vf-center">
                        <article className="main-header__desktop">
                            <nav className="main-header__nav">
                                <ul className="main-header__nav__path">
                                    <li className="nav-with-bar">
                                        <span 
                                            className={classnames({"selected": props.menu==='1'})}
                                            onClick={() => navigate('/')}>?????????</span>
                                    </li>
                                    <li className="nav-with-bar">
                                        <span 
                                            className={classnames({"selected": props.menu==='2'})}
                                            onClick={() => navigate('/Voyger')}>???????????????</span>
                                    </li>
                                    <li className="nav-with-bar">
                                        <span className={classnames({"selected": props.menu==='3'})}>?????? ?????? ??????</span>
                                    </li>
                                    <li className="nav-with-bar">
                                        <span className={classnames({"selected": props.menu==='4'})}>????????????</span>
                                    </li>
                                </ul>
                            </nav>
                            <div className="pointer main-header__user">
                                <div className="vf-center">
                                    {!account ?
                                        <div className="main-access-btn" onClick={onLogin}>
                                                <span className="main-access-btn__text">????????????</span>
                                        </div> :
                                        <div className="main-access-btn auth" onClick={() => setopen(true)}>
                                                <span className="main-access-btn__text">{cutaddress(account)}</span>
                                        </div>
                                    }
                                </div>
                                {open && 
                                    <section className="main-header__user__setting">
                                        <div className="main-header__user__setting__exit">
                                            <img src="/img/icon-exit@3x.png" alt="exit" onClick={() => setopen(false)}/>
                                        </div>
                                        <div className="main-header__user__setting__title">
                                            <span>????????? ??????</span>
                                            <div className="user__address">
                                                {cutaddress(account)}
                                            </div>
                                        </div>
                                        <div className="main-header__button__area" onClick={onLogout}>
                                            <span>????????????</span>
                                        </div>
                                    </section>
                                }
                            </div>
                        </article>
                    </div>
                </section>
            </header>
        </>
    )
}

export default Header