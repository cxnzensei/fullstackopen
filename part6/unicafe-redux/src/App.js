import counterReducer from './reducers/counterReducer'
import Button from './components/Button'
import Header from './components/Header'
import Statistics from './components/Statistics'
import { createStore } from 'redux'

const store = createStore(counterReducer)

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <Header text='Give Feedback' />
      <div style={{ display: 'flex' }}>
        <Button
          handleClick={(e) => store.dispatch({ type: 'GOOD' })}
          text='good'
        />
        <Button
          handleClick={(e) => store.dispatch({ type: 'OK' })}
          text='neutral'
        />
        <Button
          handleClick={(e) => store.dispatch({ type: 'BAD' })}
          text='bad'
        />
        <Button
          handleClick={(e) => store.dispatch({ type: 'ZERO' })}
          text='Reset to zero'
        />
      </div>
      <Statistics data={store.getState()} />
    </div>
  )
}

export { App, store }
