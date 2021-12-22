import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import './Header.scss';
import Button from "./Button";


const Header = (props) => {
    const navigate = useNavigate();
    const [account, setaccount] = useState('');
    const [open, setopen] = useState(false);

    const onClick = async () => {
        if (typeof window.klaytn !== 'undefined') {
            // Kaikas user detected. You can now use the provider.
            const provider = window['klaytn']
        }
        try {
            const accounts = await window.klaytn.enable();
            setaccount(accounts['0'])
        } catch(e){
            console.error(e);
        }
    }

    const cutaddress = (address) => {
        let cut = address.substr(0, 5) + '. . .' + address.substr(-4, 4);
        console.log(cut);
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
                                            onClick={() => navigate('/')}>보이저</span>
                                    </li>
                                    <li className="nav-with-bar">
                                        <span 
                                            className={classnames({"selected": props.menu==='2'})}
                                            onClick={() => navigate('/Voyger')}>보이저토큰</span>
                                    </li>
                                    <li className="nav-with-bar">
                                        <span className={classnames({"selected": props.menu==='3'})}>토성 가는 방법</span>
                                    </li>
                                    <li className="nav-with-bar">
                                        <span className={classnames({"selected": props.menu==='4'})}>커뮤니티</span>
                                    </li>
                                </ul>
                            </nav>
                            <div className="pointer main-header__user">
                                <div className="vf-center">
                                    {!account ?
                                        <div className="main-access-btn" onClick={onClick}>
                                                <span className="main-access-btn__text">지갑연결</span>
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
                                            <span>연결된 지갑</span>
                                            <div className="user__address">
                                                {cutaddress(account)}
                                            </div>
                                        </div>
                                        <div className="main-header__button__area">
                                            <span>로그아웃</span>
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