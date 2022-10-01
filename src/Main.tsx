import './Main.css';
import './App.css';
import { Upgrade } from './App';

export function SideBar(props: any) {
    let {children, upgrades} = props
    return (
        <div className='SideBar'>
            {children}
        </div>
    )
}

export function Main(props: any) {
    let {clicks, money, increment, trade, clickVal, setClickVal } = props;

    //upgradeStats
    let clickIncrease = 1;
    let clickUpgrade = {
        // increase
    }

    return (
        <div className='content-row'>
            <div className='content-col'>
                <button className='clicker' onClick={() => {
                    increment();
                }}>
                    <div className='orangeText'> Click:</div>
                    <div className='orangeText'> {`Gain ${clickVal}C`}</div>
                </button>
            </div>
            <SideBar>
                <Upgrade
                    title={`Click Potency: ${clickVal}`}
                    onClick_1={() => {
                        if (money >= 30) {
                            trade(0, -30);
                            setClickVal(clickVal+clickIncrease);
                        }
                        
                    }}
                    onClick_2={() => {
                        if (clickVal > 1) {
                            trade(0, 10);
                            setClickVal(clickVal-clickIncrease);
                        }
                    }}
                    text_1={`increase: -30$`}
                    text_2={`decrease: +10$`}
                />
            </SideBar>
        </div>
    )
} 