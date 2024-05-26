import { useState } from 'react'

//Header component
const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
  }

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine =(props) => {
  return (
  <p>
    {props.text} {props.value}
  </p>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = ((good * 3) + (neutral * 2) + (bad * 1) ) / all
  const positive = (good / all) * 100

  if (all === 0) {
    return (
      <div>{'No feedback given'}</div>
    )
  }

  return (
    <div>
      <StatisticLine text={'good'} value={good}/>
      <StatisticLine text={'neutral'} value={neutral}/>
      <StatisticLine text={'bad'} value={bad}/>
      <StatisticLine text={'all'} value={all}/>
      <StatisticLine text={'average'} value={average}/>
      <StatisticLine text={'positive'} value={positive + '%'}/>
    </div>
  )

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Header text={'give feedback'}/>
      <p>
        <Button handleClick={() => setGood(good + 1)} text={'good'}/>
        <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'}/>
        <Button handleClick={() => setBad(bad + 1)} text={'bad'}/>
      </p>
      <Header text={'statistics'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App

