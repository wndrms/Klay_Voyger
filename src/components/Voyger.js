import React, { useState } from "react";
import Header from "components/Header";
import './Voyger.scss';
import classNames from "classnames";
import InputBox from "./InputBox";
import DataBox from "./DataBox";
import Button from "./Button";

const Voyger = ({address, onLogin}) => {
    const [card, setcard] = useState(false);
    const [error1, seterror1] = useState(false);
    const [error2, seterror2] = useState(false);
    const [Krno, setKrno] = useState();
    const [VYG, setVYG] = useState();
    return(
        <>
            <div>
                <Header menu='2' address={address} onLogin={onLogin}></Header>
            </div>
            <main className="main-view">
                <section className="main-page">
                    <section className="main-title-voyger">
                        <span className="main-title-text">
                            VOYGER TOKEN
                        </span>
                    </section>
                    <section className="sub-title-voyger">
                        <span className="sub-title-text">
                            KRNO를 보이저토큰으로 변경하고 예치하여 보상을 수령하세요
                        </span>
                    </section>
                    <section className="main-card">
                        <div className="card-area">
                            <div className="card short" style={{paddingRight:"20px"}}>
                                <div className="card-box">
                                    <div className="box-tab">
                                        <div className="box-menu-max">
                                            <span className="menu-text">
                                                보이저 스왑
                                            </span>
                                        </div>
                                    </div>
                                    <div className="box-content">
                                        <InputBox
                                            title="KRNO 입력"
                                            detail="크로노스로 보이저 토큰 얻기&nbsp;&nbsp;&nbsp;&nbsp;
                                            0.01KRNO = 1VYG"
                                            type="number"
                                            placeholder="0"
                                            symbol="KRNO"
                                            padding="60px 0"
                                            onChange={value => setKrno(value)}
                                            error={error1}
                                            errorMessage="소유한 KRNO 보다 많습니다."/>
                                    </div>
                                    <Button
                                        text="등록"
                                        correct={address && Krno}
                                        onError={() => seterror1(true)}/>
                                </div>
                            </div>
                            <div className={classNames("card", {"short": !card})} style={{paddingLeft:"20px"}}>
                                <div className="card-box">
                                    <div className="box-tab">
                                        <div className="box-menu" onClick={() => setcard(false)}>
                                            <div>
                                                <span className={classNames("menu-text", {'selected': !card})}>보이저 스테이킹</span>
                                            </div>
                                        </div>
                                        <div className="box-menu" onClick={() => setcard(true)}>
                                            <div>
                                                <span className={classNames("menu-text", {'selected': card})}>보상수령</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-content">
                                        {!card ? 
                                            <InputBox
                                                title="보이저 토큰 입력"
                                                detail="보유 중인 보이저 토큰 : 123"
                                                type="number"
                                                placeholder="0"
                                                symbol="VYG"
                                                padding="60px 0"
                                                onChange={value => setVYG(value)}
                                                error={error2}
                                                errorMessage="소유한 보이저 토큰보다 많습니다."/> :
                                            <>
                                                <DataBox
                                                    title="스테이킹한 보이저 토큰"
                                                    pointer="0"
                                                    symbol="VYG"
                                                    padding="50px"/>
                                                <DataBox
                                                    title="총 스테이킹된 보이저 토큰"
                                                    pointer="0"
                                                    symbol="VYG"
                                                    padding="60px"/>
                                                <div className="information-box">
                                                    <div className="information-box-title">
                                                        <span className="information-title-text">스테이킹 보상</span>
                                                    </div>
                                                    <div className="symbol">
                                                        <span>0 KRNO</span>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>
                                    <Button 
                                        text="수령하기"
                                        correct={address && VYG}
                                        onError={() => seterror2(true)}/>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}

export default Voyger;