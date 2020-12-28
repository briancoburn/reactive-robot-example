import React, {useState, useEffect} from 'react'
import './Component1.css'
import * as rr from './ReactiveRobot'
import * as ev from './Events'

function Component1(props) {
  const [currentValue, setCurrentValue] = useState(` inited at ${Date.now()}`)
  const [useRedBackground, setUseRedBackground] = useState(false)
  const [useRedOutline, setUseRedOutline] = useState(false)
  useEffect(()=>{
    rr.addObserver(onEvent)
    rr.next({type:ev.COMPONENT_UPDATE_GET,data:{name:props.name}})
    return ()=>{rr.removeObserver(onEvent)}//cleanup on unmount
  },[])

  function showRedBackground(){
    setUseRedBackground(true)
  }

  function hideRedBackground(){
    setUseRedBackground(false)
    setUseRedOutline(true)
  }

  function onEvent(event){
    switch (event.type){

      case ev.INITIALIZE_COMPONENTS:
        setUseRedBackground(false)
        setUseRedOutline(false)
        break;
      case ev.COMPONENT_UPDATE_RECEIVED:
        if(event.data.name===props.name){
          showRedBackground()
          setTimeout(hideRedBackground,500)
          setCurrentValue(event.data.message)
        }
    }
  }
  let backgroundClass = 'Component1'
  if(useRedBackground){
    backgroundClass = 'Component1JustUpdated'
  }else if(useRedOutline){
    backgroundClass = 'Component1HasUpdated'
  }
  return (
    <div className={backgroundClass}>
      <span>{props.name}</span>
      <span>{currentValue}</span>
    </div>
  );
}

export default Component1;
