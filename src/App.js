import React, {useState, useEffect} from 'react'
import './App.css'
import * as ds from "./DataService"
import  * as rr from './ReactiveRobot'
import * as ev from './Events'
import UIControls from "./UIControls"
import Component1 from "./Component1"

function App() {
  const [numItems, setNumItems] = useState(0)
  useEffect(()=>{
    rr.addObserver(onEvent)
  },[])

  function onEvent(event){
    switch (event.type){
      case ev.INITIALIZE_COMPONENTS:
        setNumItems(event.data.numItems)
        break
    }
  }

  let components = []
  for(let i=0;i<numItems;i+=1){
    components.push(<Component1 key={i} name={'Component'+i}></Component1>)
  }
  return (
    <div className="App">
      <h4>Reactive Robot</h4>
      <h5>State Management Framework For React</h5>
      <p>
        ReactiveRobot is a lean and mean react state management framework that promotes a high level of decoupling,
        granular control of rendering, and components that react to events. It is intended to be a simple, unopinionated,
        and highly performant alternative to popular state management systems such as Redux, mobx, useContext, etc. It is also
        sort of like rxjs without operators - a way of producing and consuming a stream of data in a network of decoupled objects
        using a pub/sub mechanism.
      </p>
      <span>Reactive Robot has two main rules:</span>
      <ul>
        <li>do not observe or react directly to changes in global state</li>
        <li>use only events to cause ui updates</li>
      </ul>
      <p>
        If you follow these rules, Reactive Robot will allow you to create an application which is highly decoupled,
        scalable and performant. Because everything is an event, you have complete control over rendering and
        asynchronous operations.
      </p>
      <p>
        You can examine the ReactiveRobot object yourself, ReactiveRobot.js. It is quite simple. It has a list of observers,
        methods to add and remove them, and a next method, which will call the registered observer functions with any event
        that comes thru. There is also a globalData, or gData property on the Reactive Robot object which can act as a cache
        for global data that you might want to reuse when loading/unloading views. Do not directly react to changes on this
        object or you will break the first rule above and lose the benefits of the Reactive Robot framework.
      </p>
      <h5>Example</h5>
      <p>
        This application was made with create-react-app. Aside from the files that are generated
        by create-react-app, these have been added to make a demonstration of how to use Reactive Robot:
      </p>
      <ul>
        <li>ReactiveRobot.js</li>
        <li>Events.js</li>
        <li>DataService.js</li>
        <li>UIControls.js</li>
        <li>Component1.js</li>
      </ul>
      <p>
        ReactiveRobot.js itself, which adds/removes observers, and sends events to them and keeps a data cache.
        Events.js is not required, but is a convenient way to store string constants for events that will give you
        code-completion in your IDE. Component1 is an example lower-level component that needs realtime data updates.
        Each Component1 will observe the COMPONENT_UPDATE_RECEIVED event, and check if the name matches its own. If so,
        it updates, and nobody else does. DataService is included to simulate receiving of async data, like if you were
        getting updates over a socket that could be for any component. In this simulation it sends an update to a
        random component, at an interval that is specified in UIControls.

      </p>

      <div className={'ExampleSection'}>
        <h5>Example Application</h5>
        <p>
          Set the number of components you want to create and the rate at which you want updates to occur. By setting
          a very large number of components, and/or a very short update delta, you can test performance, or kill your browser.
          A component that just updated has a red background, a component that has been updated in the past has a red border.
          When components are reloaded, they lose the red border as that data is not maintained outside of the component
          lifecycle - see discussion on gData below.
        </p>
        <UIControls/>
        <div className={'ComponentsContainer'}>
          {components}
        </div>

      </div>
      <p>
        Because everything is an event in this framework there are no issues with async. You can use callbacks,
        promises, async await, sockets, mock data - ReactiveRobot doesn't care, it just sends the data as an event
        when it gets it and the interested parties consume it. Of course you are responsible for pushing your
        observation of events to the appropriate level - usually as far down the component tree as possible.
        Components that want that data consume it, cache it, or useState and rerender. Components that didn't
        register for that data never process that event and do not update, unless you mistakenly or purposely
        cause a rerender in one of their ancestors. This is the main purpose of this framework - to control
        unnecessary re-rendering. If you have developed large-scale react apps, you will recognize this is
        highly desirable for performance reasons.
      </p>

      <h5>Digging Deeper</h5>
      <p>
        Obviously, this is not a full-scale application. And there are some issues that will come up that aren't addressed
        in this example. If you don't have global state and you've pushed it all the way down the component tree to your leaf
        components, how do you maintain their state when they mount, unmount and remount again?
      </p>
      <p>
        Reactive Robot has a property called gData. Because all producers and consumers of events have access to this,
        you can use it to store persistent global data for managing components loading and unloading. For instance in the
        example above, let's say you were mounting and unmounting all of your Component1 instances. You could keep the
        last value for currentValue field on rr.gData, and when you reload a Component1, you could check if that value
        is on rr.gData, then show the red border indicating that that item had been updated previously.
      </p>
      <p>
        Just remember, ReactiveRobot is short on rules and long on flexibility. You decide where you want to store
        data and initiate things like api calls. Obviously you could do an api call from a component when it mounts with
        useEffect, but here you have more options. You send an event. Your component doesn't know anything about any
        API. You control what data it gets back from that event. Maybe call the API the first time, then just reload
        cached data from rr.gData. Maybe you get all the data when the app loads, and just respond to events as needed,
        or maybe you mock everything because the API isn't available yet or you're testing. With Reactive Robot,
        it's up to you.
      </p>
      <h5>Comparisons with Redux</h5>
      <p>
        Like Redux, ReactiveRobot has a specific way to rerender in response to changes in state. Send an event. Unlike Redux,
        there is no enforcement of how you make updates. You can decouple everything with a model that only responds to events,
        or stick everything on gData, or anything in between. Also, unlike Redux, there is no embrace of immutability here.
        Use immutable objects if you like. And unlike Redux where everybody gets access to a global Store, this is not a
        requirement in Reactive Robot. If you have global data that needs to be cached and arbitrarily available, you have
        the gData object as a convenience.
      </p>
      <h5>Observations On Observing and Listening</h5>
      <p>
        Why are we using observers here instead of listeners? Because the visual metaphor is trendy right now. But seriously,
        the audio metaphor is the same. You can be observing events or listening, same thing. Most of your basic intros
        to rx based reactive systems will start teaching you about observables with the metaphor of listening to mouse activity
        and thinking about it as a stream of data using listeners, aka observables. Because there is a similarity between
        ReactiveRobot and rxjs, I've used "next" as the method name to indicate there is another event in the stream.
        I could have used "trigger" but that seemed so...jQuery. We want to stay current, but recognize these issues have
        a long history of multiple solutions. I am just trying to add another solution that has worked well for me, scales
        easily, and encourages optimal performance with react.
      </p>
    </div>
  );
}

export default App;
