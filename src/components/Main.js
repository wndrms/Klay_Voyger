import React, { useEffect, useState } from "react";
import Header from "components/Header";
import './Main.scss';
import classNames from "classnames";
import InputBox from "./InputBox";
import DataBox from "./DataBox";
import Button from "./Button";
import Caver from "caver-js";
import FoMo3D from "../FoMo3Dlong.json";

const Main = ({address, onLogin}) => {
    const caver = new Caver(window.klaytn);

    const [card1, setcard1] = useState(false);
    const [card2, setcard2] = useState(false);
    const [team, setteam] = useState(0);
    const [ticket_in, setticket_in] = useState();
    const [user_name, setuser_name] = useState("");
    const [user_ticket, setuser_ticket] = useState(0);
    const [error1, seterror1] = useState(false);
    const [error2, seterror2] = useState(false);

    useEffect( async() => {
        if (address){
            const myContract = new caver.klay.Contract(FoMo3D, '0x8DA93FC0B59BDd4d03A575e47254996f3B2f07A4');
            const Info = await myContract.call('getPlayerInfoByAddress', address)
            setuser_ticket(Info['2']/Math.pow(10, 18));
        }
    }, [address])

    const check_name = (name) => {
        var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;
        if(name.length > 15) return false
        else if (pattern_spc.test(name)) return false
        else if (name.search(/\s/) > 2) return false
        else return true
    }

    const buyticket = () => {
        const myContract = new caver.klay.Contract(FoMo3D, '0x8DA93FC0B59BDd4d03A575e47254996f3B2f07A4');
        console.log(myContract);
        const team_num = (team === 'mom' ? 0
                        : team === 'dad' ? 1
                        : team === 'gf' ? 2
                        : 3);
        const klayspend = new caver.utils.toBN(ticket_in/4);
        console.log(team_num);
        myContract.methods.buyXaddr(
            address, team_num
        ).send({
            from: address, 
            value: caver.utils.toPeb(klayspend, 'KLAY'),
            gas: '0x4bfd200'
        }, function(error, transactionHash){
            console.log(transactionHash);
        });
    }

    const register = (name) => {
        const myContract = new caver.klay.Contract(FoMo3D, '0x8DA93FC0B59BDd4d03A575e47254996f3B2f07A4');
        
        console.log(myContract);
        myContract.methods.registerNameXname(
            name, "0x000000000000000000000000000000000000000000", true
        ).send({
            from: address, 
            value: caver.utils.toPeb('1', 'KLAY'),
            gas: '0x4bfd200'
        }, function(error, transactionHash){
            console.log(transactionHash);
        });
    }
    return(
        <>
            <div>
                <Header menu='1' address={address} onLogin={onLogin}></Header>
            </div>
            <main className="main-view">
                <section className="main-page">
                    <div className="rocket-img-area">
                        <img src="/img/img-et@3x.png" alt="Rocket"/>
                    </div>
                    <section className="main-title">
                        <span className="main-title-text">
                            사용자 이름, 엄마<span className="main-title-text1">랑 토성 가는 중</span>
                        </span>
                    </section>
                    <section className="klay-data">
                        <div className="data-box">
                            <div className="deposit-amount">
                                <span className="data-text">토성에 있는 KRNO&nbsp;&nbsp;&nbsp;1,238,327</span>
                            </div>
                            <div className="time-remain">
                                <span className="data-text">남은 시간&nbsp;&nbsp;&nbsp;03:00:00</span>
                            </div>
                        </div>
                    </section>
                    <section className="main-card">
                        <div className="card-area">
                            <div className="card" style={{paddingRight:"20px"}}>
                                <div className="card-box">
                                    <div className="box-tab">
                                        <div className="box-menu" onClick={() => setcard1(false)}>
                                            <div>
                                                <div>
                                                    <span className={classNames("menu-text", {'selected': !card1})}>티켓팅</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-menu" onClick={() => setcard1(true)}>
                                            <div>
                                                <span className={classNames("menu-text", {'selected': card1})}>작명소</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-content">
                                        {!card1 ? 
                                            <InputBox
                                                title="티켓 입력"
                                                detail="티켓 1장에 15초 연장 / 1티켓 = 0.25 KLAY"
                                                type="number"
                                                placeholder="0"
                                                input={ticket_in}
                                                onChange={value => {
                                                    setticket_in(value);
                                                    seterror1(false);
                                                }}
                                                symbol="TICKET"
                                                padding="58px 10px 0 10px"
                                                error={error1}
                                                errorMessage="소유한 티켓보다 많습니다."/> :
                                            <InputBox
                                                title="이름 입력"
                                                detail="리더보드에 표기될 이름을 입력하세요"
                                                type="text"
                                                placeholder="사용자 이름"
                                                input={user_name}
                                                onChange={value => {
                                                    setuser_name(value);
                                                    seterror2(false);
                                                }}
                                                padding="58px 10px 0 10px"
                                                error={error2}
                                                errorMessage="띄어쓰기가 한칸 이상입니다.\n
                                                15자리가 넘었습니다.\n
                                                등록 비용이 모자랍니다."/>                                                
                                        }
                                        <div className="notice-box">
                                            <div className="notice-title">
                                                {!card1 ? 
                                                    <>
                                                        <span className="notice-text">동료 선택</span>
                                                        <div>
                                                            <img src="img/icon-question@3x.png" alt="?" className="help"/>
                                                        </div>
                                                    </> : 
                                                    <span className="notice-text">작명 유의사항</span>
                                                }
                                            </div>
                                            {!card1 ? 
                                                <div className="buddies">
                                                    <div className={classNames("buddy", {'select' : team === 'mom'})} onClick={() => setteam('mom')}>
                                                        <img src={team !== 'mom' ? "img/icon-mom-default@3x.png" : "img/icon-mom-select@3x.png"} alt="mom" className="buddy-img"/>
                                                        <div className="buddy-name">
                                                            <span className={classNames("buddy-name-text", {'select' : team === 'mom'})}>엄마</span>
                                                        </div>
                                                    </div>
                                                    <div className={classNames("buddy", {'select' : team === 'dad'})} onClick={() => setteam('dad')}>
                                                        <img src={team !== 'dad' ? "img/icon-dad-default@3x.png" : "img/icon-dad-select@3x.png"} alt="dad" className="buddy-img"/>
                                                        <div className="buddy-name">
                                                            <span className={classNames("buddy-name-text", {'select' : team === 'dad'})}>아빠</span>
                                                        </div>
                                                    </div>
                                                    <div className={classNames("buddy", {'select' : team === 'gf'})} onClick={() => setteam('gf')}>
                                                        <img src={team !== 'gf' ? "img/icon-gf-default@3x.png" : "img/icon-gf-select@3x.png"} alt="gf" className="buddy-img"/>
                                                        <div className="buddy-name">
                                                            <span className={classNames("buddy-name-text", {'select' : team === 'gf'})}>여자친구</span>
                                                        </div>
                                                    </div>
                                                    <div className={classNames("buddy", {'select' : team === 'dragon'})} onClick={() => setteam('dragon')}>
                                                        <img src={team !== 'dragon' ? "img/icon-dragon-default@3x.png" : "img/icon-dragon-select@3x.png"} alt="dragon" className="buddy-img"/>
                                                        <div className="buddy-name">
                                                            <span className={classNames("buddy-name-text", {'select' : team === 'dragon'})}>크롱이</span>
                                                        </div>
                                                    </div>
                                                </div> :
                                                <div>
                                                    <p className="notice-text-detail">*최대 15자 이내</p>
                                                    <p className="notice-text-detail">*특수문자 불가, 띄어쓰기는 한칸만</p>
                                                    <p className="notice-text-detail">*등록 비용 : 5 KLAY</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {!card1 ? 
                                        <Button 
                                            text="보내기" 
                                            correct={address && ticket_in && team && !error1}
                                            onCheck={() => ticket_in <= parseFloat(user_ticket)}
                                            onClick={() => buyticket()}
                                            onError={() => seterror1(true)}/> :
                                        <Button 
                                            text="등록"
                                            correct={address && user_name && !error2}
                                            onCheck={() => check_name(user_name)}
                                            onClick={() => register(user_name)}
                                            onError={() => seterror2(true)}/>
                                    }
                                </div>
                            </div>
                            <div className="card" style={{paddingLeft:"20px"}}>
                                <div className="card-box">
                                    <div className="box-tab">
                                        <div className="box-menu" onClick={() => setcard2(false)}>
                                            <div>
                                                <span className={classNames("menu-text", {'selected': !card2})}>현황</span>
                                            </div>
                                        </div>
                                        <div className="box-menu" onClick={() => setcard2(true)}>
                                            <div>
                                                <span className={classNames("menu-text", {'selected': card2})}>보상수령</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-content">
                                        {!card2 ?
                                            <>
                                                <div className="card-title">
                                                    <span className="card-title-text">라운드 #1</span>
                                                </div>
                                                <DataBox
                                                    title="내 티켓"
                                                    detail={"전체 티켓 수 : " + user_ticket + "개"}
                                                    pointer="0"
                                                    symbol="TICKET"
                                                    padding="12px"/>
                                                <DataBox
                                                    title="획득한 KRNO"
                                                    pointer="0"
                                                    symbol="KRNO"
                                                    padding="60px"/>
                                                <div className="popularity">
                                                    <div className="popularity-title-box">
                                                        <div className="popularity-title-text">
                                                            <span>인기도</span>
                                                        </div>
                                                        <div className="popularity-title-sub">
                                                            <span>*단위 : KRNO</span>
                                                        </div>
                                                    </div>
                                                    <div className="popularity-data">
                                                        <div className="popularity-data-div">
                                                            <div className="popularity-box-title">
                                                                <span>엄마</span>
                                                            </div>
                                                            <div className="popularity-data-num">
                                                                <span>124,123.123</span>
                                                            </div>
                                                        </div>
                                                        <div className="popularity-data-div">
                                                            <div className="popularity-box-title">
                                                                <span>아빠</span>
                                                            </div>
                                                            <div className="popularity-data-num">
                                                                <span>124,123.123</span>
                                                            </div>
                                                        </div>
                                                        <div className="popularity-data-div">
                                                            <div className="popularity-box-title">
                                                                <span>여자친구</span>
                                                            </div>
                                                            <div className="popularity-data-num">
                                                                <span>124,123.123</span>
                                                            </div>
                                                        </div>
                                                        <div className="popularity-data-div">
                                                            <div className="popularity-box-title">
                                                                <span>크롱이</span>
                                                            </div>
                                                            <div className="popularity-data-num">
                                                                <span>124,123.123</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </> : 
                                            <>
                                                <DataBox
                                                    title="티켓 지분"
                                                    pointer="0"
                                                    symbol="KLAY"
                                                    padding="50px"/>
                                                <DataBox
                                                    title="토성 도착"
                                                    pointer="0"
                                                    symbol="KLAY"
                                                    padding="60px"/>
                                                <div className="information-box">
                                                    <div className="information-box-title">
                                                        <span className="information-title-text">총 획득</span>
                                                    </div>
                                                    <div className="symbol">
                                                        <span>0 KLAY</span>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>
                                    { card2 && 
                                        <Button text="수령하기"/>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}

export default Main;