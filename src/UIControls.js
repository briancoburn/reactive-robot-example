import React, {useState, useEffect} from 'react'
import './UIControls.css'
import * as rr from './ReactiveRobot'
import * as ev from './Events'

function UIControls() {
  const [hasRequestedData, setHasRequestedData] = useState(false)
  const [numItems, setNumItems] = useState(10)
  const [updateDelta, setUpdateDelta] = useState(1000)
  useEffect(()=>{
    rr.addObserver(onEvent)
    return ()=>{rr.removeObserver(onEvent)}//cleanup on unmount
  },[])

  function onEvent(event){
    switch (event.type){
      case ev.UI_CONTROLS_UPDATE:
        break

    }
  }
  function initializeComponents(){
    rr.next({type:ev.INITIALIZE_COMPONENTS, data:{numItems,updateDelta}})
  }
  return (
    <div className="UIControls">
      <span>UI Controls</span>
      <span>number of dynamically updating components</span>
      <input type={'text'} value={numItems} onChange={(evt)=>{setNumItems(evt.target.value)}}/>
      <span>Rate of updates</span>
      <input type={'text'} value={updateDelta} onChange={(evt)=>{setUpdateDelta(evt.target.value)}}/>
      <button onClick={()=>{initializeComponents()}}>INITIALIZE COMPONENTS</button>
    </div>
  );
}

export default UIControls;
