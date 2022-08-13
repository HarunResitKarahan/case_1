import './App.css';
import React, { useState, useEffect, useRef  } from 'react';

function App() {
  const [whoIsTurn, setWhoIsTurn] = useState('player1')
  const [player1Moves, setPlayer1Moves] = useState([])
  const [player2Moves, setPlayer2Moves] = useState([])
  var player1MovesCounter = useRef(0)
  var player2MovesCounter = useRef(0)
  var [winner,setWinner] = useState('')
  useEffect(() => {
    const winConditions = [[0,1,2], [3,4,5], [6,7,8], [2,4,6], [0,4,8], [0,3,6], [1,4,7], [2,5,8]]
    var isFinished = null
    if (player1Moves.length >= 3) {
      // player1Moves.forEach((item) => {
      //   console.log(item)
      // })
      winConditions.forEach((itemArrays) => {
        player1MovesCounter.current = 0
        itemArrays.forEach((item)=> {
          if (player1Moves.includes(item)) {
            player1MovesCounter.current += 1
          }
        })
        if (player1MovesCounter.current === 3) {
          isFinished = true
          setWinner('Kullanıcı 1 Kazandı.')
          document.querySelector(".winnerPopUp").style.top = '0'
          console.log("Oyun Bitti Player1 Kazandı.")
        }
      })
      // console.log("Player1: " + player1Moves.sort())
    }
    if (player2Moves.length >= 3) {
      winConditions.forEach((itemArrays) => {
        player2MovesCounter.current = 0
        itemArrays.forEach((item)=> {
          if (player2Moves.includes(item)) {
            player2MovesCounter.current += 1
          }
        })
        if (player2MovesCounter.current === 3) {
          isFinished = true
          setWinner('Kullanıcı 2 Kazandı.')
          document.querySelector(".winnerPopUp").style.top = '0'
          console.log("Oyun Bitti Player2 Kazandı.")
        }
      })
      // console.log("Player2: " +player2Moves.sort())
    }
    if (player1Moves.length === 5 && player2Moves.length === 4 && isFinished === null) {
      setWinner('Berabere')
      document.querySelector(".winnerPopUp").style.top = '0'
      console.log("Berabere")
    }
}, [player1Moves, player2Moves]);
  // const gameItems = document.querySelectorAll('.game-item')
  const playGame = (event) => {
    // event.target.style.padd
    if (whoIsTurn === 'player1') {
      if (event.target.innerHTML === '' && winner === '') {
        event.target.innerHTML = 'X'
        setPlayer1Moves(oldArray => [...oldArray, Number(event.target.attributes.id.value)])
        setWhoIsTurn('player2')
      }
    } else if (whoIsTurn === 'player2' && winner === '') {
      if (event.target.innerHTML === '') {
        event.target.innerHTML = 'O'
        setPlayer2Moves(oldArray => [...oldArray, Number(event.target.attributes.id.value)])
        setWhoIsTurn('player1')
      }
    }
  }
  const hidePopUp = (event) => {
    if (event.target.className === 'winnerPopUp') {
      event.target.style.display = 'none'
      document.location.reload()
    }
  }
  const reloadPage = () => {
    document.location.reload()
  }
  return (
    <div className="App">
      <div className="container">
        <div className='showplayer'>Oyun Sırası {whoIsTurn === 'player1' ? 'Kullanıcı 1\'de(X)':'Kullanıcı 2\'de(O)'}</div>
        <div className="game">
          {Array.from(Array(9), (e, item) => {
            return <div className='game-item' id={item} key={item} onClick={playGame}></div>
          })}
        </div>
        <div className='winnerPopUp' onClick={hidePopUp}>
          <div className='popUpContainer'>
            <div className='popUpContainerHeader'>
              <span>{winner}</span>
            </div>
            <div className='replay' onClick={reloadPage}>
              <p>Tekrar Oyna</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
