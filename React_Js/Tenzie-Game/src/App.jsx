import React, { useEffect, useState } from 'react'
import Die from './Components/Die'
import {nanoid} from 'nanoid'


export default function App() {

const [dice, setDice] = useState(allNewDice())
const [tenzies, setTenzies] = useState(false)

useEffect( ()=> {
const allHeld = dice.every(die => die.isHeld)
const firstValue = dice[0].value
const allSameValue = dice.every(die => die.value === firstValue)
if(allHeld && allSameValue){
  setTenzies(true)
  console.log("You Won!");
  
}
}, [dice])

  function allNewDice(){
    const newDice = [];
    for (let i =0; i < 10; i++){
     
      newDice.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      });
    }
    return newDice;
  }

  const diceElements = dice.map(die => <Die  key ={die.id} value={die.value} isHeld={die.isHeld}  holdDice={() => holdDice(die.id)}/>)


  function rollDice(){
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? 
      die: {
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      }
    }))
  }


  function holdDice(id){
setDice(oldDice => oldDice.map( die => {
  return die.id === id ? 
  {...die, isHeld: !die.isHeld} : 
  die
}))

  }

  return (
    <main>
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'> Roll untill the Dice are the same.Click each die to freeze it at its current value between rools.</p>
      <div className='Dice-container'>
     {diceElements}
      </div>
      
        <button className='roll-dice' onClick={rollDice}>Roll</button>
      
    </main>
  )
}
