import React, { useState, useEffect } from 'react';
import { Main } from './Main';
import './App.css';
import Market from './Market';

function Banner(props: any) {
    let { clicks, money, setFocus } = props;
    return (
        <div className='banner'>
            <div>
                <ClickText text={`C: ${clicks}`}/>
                <MoneyText text={`$: ${money}`}/>
            </div>
            <div className='title'> RONaN2 </div>
            <div>
                <button onClick={() => {
                    setFocus("main")
                }}>main</button>
                <button onClick={() => {
                    setFocus("market")
                }}>market</button>
            </div>
        </div>
    )
}
export function ClickText(props: any) {
    let {text} = props
    return <div className='orangeText'>
        {text}
    </div>
}
export function MoneyText(props: any) {
    let {text} = props
    return <div className='goldText'>
        {text}
    </div>
}

export function Upgrade(props: any) {
    let { title, onClick_1, onClick_2, text_1, text_2} = props;
    
    return <div>
        <div>{title}</div>
        <button onClick={onClick_1}>{text_1}</button>
        <button onClick={onClick_2}>{text_2}</button>
    </div>
}

export type Page = "main" | "market" 

function App() {
    const[focus, setFocus] = useState<Page>("main");
    //global properties
    const[clicks, setClicks] = useState(0);
    const[money, setMoney] = useState(0);
    //market properties
    let [tradeTotal, setTradeTotal] = useState(5);
    let [tradeCeil, setTradeCeil] = useState(20);
    //main properties
    let [clickVal, setClickVal] = useState(1);

    function increment() {
        setClicks(clicks+clickVal);
    }
    function trade(clickVal: number, moneyVal: number) {
        if ( clickVal+clicks >= 0 && money+moneyVal >= 0 ) {
            setClicks(clicks+clickVal);
            setMoney(money+moneyVal);
        }
    }

    let content
    switch (focus) {
        case("market"): {
            content = <Market
                clicks={clicks}
                money={money}
                increment={increment}
                trade={trade}
                tradeTotal={tradeTotal}
                setTradeTotal={setTradeTotal}
                tradeCeil={tradeCeil}
                setTradeCeil={setTradeCeil}
            />;
            break;
        }
        default: {
            content = <Main
                clicks={clicks}
                money={money}
                increment={increment}
                trade={trade}
                clickVal={clickVal}
                setClickVal={setClickVal}
            />;
            break;
        }
    }

    return (
        <div className='App'>
            <Banner
                setFocus={setFocus}
                clicks={clicks}
                money={money}
            />
            {content}
        </div>
    );
} 

export default App;
