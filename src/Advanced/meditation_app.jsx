import React,{useState, useEffect}from "react";



export default function MeditationApp() {
    const [breatheState, setBreatheState] = useState("inhale");
    const [timer, setTimer] = useState(0);
    const [totalTime, setTotalTime] = useState(300);
    const [isActive, setIsActive] = useState(false);
    const [cycle, setCycle] = useState(0);


