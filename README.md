This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## State Management Framework For React

ReactiveRobot is a lean and mean react state management framework that promotes a high level of decoupling, granular control of rendering, and components that react to events. It is intended to be a simple, unopinionated, and highly performant alternative to popular state management systems such as Redux, mobx, useContext, etc. It is also sort of like rxjs without operators - a way of producing and consuming a stream of data in a network of decoupled objects using a pub/sub mechanism.

Reactive Robot has two main rules:<br />
do not observe or react directly to changes in global state<br />
use only events to cause ui updates<br />

If you follow these rules, Reactive Robot will allow you to create an application which is highly decoupled, scalable and performant. Because everything is an event, you have complete control over rendering and asynchronous operations.

You can examine the ReactiveRobot object yourself, ReactiveRobot.js. It is quite simple. It has a list of observers, methods to add and remove them, and a next method, which will call the registered observer functions with any event that comes thru. There is also a globalData, or gData property on the Reactive Robot object which can act as a cache for global data that you might want to reuse when loading/unloading views. Do not directly react to changes on this object or you will break the first rule above and lose the benefits of the Reactive Robot framework.



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
# reactive-robot-example
