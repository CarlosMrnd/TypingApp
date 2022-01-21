import React, {useState} from "react";
import CustomBtn from "./components/Btn";
import Title from "./components/Title";

export default function App(){
    
    const [playGame, setPlayGame] = useState(false);
    const [textData, setTexData] = useState({text:""});
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(10);
    const [disabledContainer, setDisabledContainer] = useState(true);

    function handleChange(event){
        setTexData(() => {
            return {
                [event.target.name]: event.target.value
            }
        });
        let newCount = handleCount();
        if(newCount){setCount(newCount.length);}
    }
    
    function handleCount(){
        let containerText = textData.text;
        let regex = /\S{1,}/ig;
        let textArray = containerText.match(regex);
        return textArray;
    }

    function handleTime(){
        const interval = setInterval(()=>{
            setTime(prevTime => {
                if(prevTime > 0){
                    return prevTime - 1;
                }
                else if(prevTime === 0){
                    clearInterval(interval);
                    setDisabledContainer(true);
                }
            });
        }, 1000);
    }

    function startGame(){
        setPlayGame(true);
        setDisabledContainer(false);
        handleTime();
    }

    function restartGame(){
        setPlayGame(false);
        setTexData({text:""});
        setTime(10);
        setCount(0);
    }

    return(
        <main>
            <Title />
            <h3 className="text-light">Time remaining: <span>{time>0 ? time : 0}s</span></h3>
            <textarea value={textData.text} name="text" onChange={handleChange} 
                className="textarea" disabled={disabledContainer}
            />
            <h3 className="text-light">Words count: {count}</h3>
            {!playGame && <CustomBtn click={startGame} text="Start" class="start-btn"/>}
            {playGame && <CustomBtn click={restartGame} text="Try again" class="try-btn"/>}
        </main>
    )
}