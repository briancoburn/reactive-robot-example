import * as rr from './ReactiveRobot'
import * as ev from './Events'

let clients = []
let updateDelta = 100
let interval = null
function onEvent(event){
  switch (event.type){
    case ev.INITIALIZE_COMPONENTS:
      updateDelta = event.data.updateDelta
      getData()
    case ev.COMPONENT_UPDATE_GET:
      clients.push(event.data.name)
  }
}
rr.addObserver(onEvent)
export function getData(){

  function sendUpdate(){
    if(clients.length > 0){
      let index = Math.floor(Math.random()*clients.length)
      let nameOfClientToUpdate = clients[index]
      rr.next({type:ev.COMPONENT_UPDATE_RECEIVED,data:{name:nameOfClientToUpdate, message:'updated at '+Date.now()}})
    }

  }
  clearInterval(interval)
  interval = setInterval(sendUpdate,updateDelta)
}