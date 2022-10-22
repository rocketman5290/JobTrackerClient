import React, { useEffect, 
               useState, 
               createContext,
               useContext,
               useRef,
               useReducer } from 'react';
import './App.css';

const moods = {
  happy: ':-)',
  sad: ':-(',
  suprised: ':-O',
  flirty: ';-}'
}
const MoodContext = createContext(moods)

function App() {
  //useState == [state, setState]
  const [count, setCount] = useState(0)

  //useRef == set render immutable state
  const persistingStateThroughRenders = useRef(0);

  function reducer(state, action) {
    switch(action.type){
      case 'increment':
        return state + 1;
      case 'decrement':
        return state - 1;
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, 0);



  useEffect(() => {
    //componentDidMount() { initialized }
    console.log('run when mounted')
    console.log('run when state changes')
  
  // teardown function(code to run when component unmounts or
  // right before the component unmounts)
  return () => {
    console.log('same as componentWillUnmount() {destroyed}')
    alert('goodbye component aka teardown function called')
  }
  })//,[]) //when state updates or said values in the array
  // array of dependencies, which will cause useffect to run
  // any time the dependency changes or is updated.
  // componentDidUpdate() { state updated and can happen multiple times }
  //If left empty then it will only render once
  // on the initial mounting of the component.

  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch({type: 'decrement'})}>
          dispatch action: {}
        </button>
        useReducer state: {state}
      </div>
      <button onClick={() => setCount(count + 1)}>
         count +1
        <br></br>
         {count}
      </button>
      <button onClick={() => setCount(count + 2)}>
        count + 2
        <br></br>
        { count }
        <br></br>
        { persistingStateThroughRenders.current }
      </button>
      { /* __Context.Provider allows us to define the value 
      that will be accessible to it enclosing child component */ }
      <MoodContext.Provider value={moods.happy}>
        {/* if this providers value changes here the MoodEmoji or child component
        will be updated in the DOM automatically */}
        {/* MoodEmoji component will access the mood based on the providers value 
        by using the useContext hook inside of its functional definition */}
        <MoodEmoji />
      </MoodContext.Provider>
      <MoodContext.Provider value={moods.sad}>
        <MoodEmoji />
      </MoodContext.Provider>
    </div>
  );
}

function MoodEmoji() {
  //useContext allows us to access the defined providers value
  //without having to pass down props.
  //Cleaner replacment of the Context.Consumer
  const mood = useContext(MoodContext)

  return <p>{ mood }</p>
}

export default App;
