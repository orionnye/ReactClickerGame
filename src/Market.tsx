import React, { useState, useEffect } from 'react';
import { SideBar } from './Main';
import './Market.css';
import './App.css';
import { ClickText, MoneyText, Upgrade } from './App';

function TradeOfferRandom(props: any) {
    let { clicks, money, trade, total } = props;

    const clickScalar = Math.ceil(Math.random()*2*total);
    const moneyScalar = Math.ceil(Math.random()*10*total);

    //determines what currency type is used for the transaction
    let costIsClicks = (Math.random() < 0.5) ? true : false;
    let [clickTotal, moneyTotal] = [clickScalar, moneyScalar];
    
    let [cost, gain] = costIsClicks ? [clickTotal, moneyTotal] : [moneyTotal, clickTotal];
    // let cost = costIsClicks ? clickScalar*total : moneyScalar*total;
    return <TradeOffer
        clicks={clicks}
        money={money}
        trade={trade}
        cost={cost}
        gain={gain}
        costIsClicks={costIsClicks}
    />
}

function TradeOffer(props: any) {
    //Stats
    let { clicks, money, trade, cost, gain, costIsClicks = true } = props;
    //Cosmetic
    const [clickSign, moneySign] = ["C", "$"];
    const [orange, gold] = ['orangeText', 'goldText'];
    const [costSign, gainSign] = costIsClicks ? [clickSign, moneySign] : [moneySign, clickSign];

    let costDiv;
    let gainDiv;
    if (costIsClicks) {
        costDiv = <ClickText text={`Cost: ${cost}${costSign}`}/>;
        gainDiv = <MoneyText text={`Gain: ${gain}${gainSign}`}/>;
    } else {
        costDiv = <MoneyText text={`Cost: ${cost}${costSign}`}/>;
        gainDiv = <ClickText text={`Gain: ${gain}${gainSign}`}/>;
    }
    //Cost and Gain Display with Color Coding

    let tradeButton = <button className='trade' onClick={() => {
        //Function Call, checking transaction validity
        let [clickImpact, moneyImpact] = (costIsClicks) ? [-cost, gain] : [gain, -cost]
        trade(clickImpact, moneyImpact);
    }}>
        {costDiv}
        {gainDiv}
    </button>

    return tradeButton
}

export default function Market(props: any) {
    let {increment, clicks, money, 
        trade, tradeTotal, setTradeTotal, 
        tradeCeil, setTradeCeil} = props
    // let [tradeTotal, setTradeTotal] = useState(5);
    // let [tradeCeil, setTradeCeil] = useState(20);

    let upgradeCost = 50;
    let downgradeGain = 20; 

    let tradeList = [];
    for (let i = 0; i < tradeTotal; i++) {
        tradeList.push(
            <TradeOfferRandom
                clicks={clicks}
                money={money}
                trade={trade}
                total={tradeCeil}
                key={i}
            />
        )
    }

    return (
        <div className='content-row'>
            <div className='tradeColumn'>
                {tradeList}
            </div>
            <SideBar>
                <Upgrade
                    title={`Trade Total: ${tradeTotal}`}
                    onClick_1={() => {
                        if (clicks >= upgradeCost) {
                            trade(-upgradeCost, 0);
                            setTradeTotal(tradeTotal+1);
                        }
                    }}
                    onClick_2={() => {
                        if (tradeTotal > 0) {
                            trade(+downgradeGain, 0);
                            setTradeTotal(tradeTotal-1);
                        }
                    }}
                    text_1={`-${upgradeCost}C : ^`}
                    text_2={`+${downgradeGain}C : v`}
                />
                <Upgrade
                    title= {`Trade Ceiling: ${tradeCeil}`}
                    onClick_1={() => {
                        if (money >= 50) {
                            trade(0, -50);
                            setTradeCeil(tradeCeil+4);
                        }
                    }}
                    onClick_2={() => {
                        if (tradeCeil > 0) {
                            trade(0, +20);
                            setTradeCeil(tradeCeil-4)
                        }
                    }}
                    text_1={`-${upgradeCost}$ : ^`}
                    text_2={`+${downgradeGain}$ : v`}
                />
            </SideBar>
        </div>
    );
}