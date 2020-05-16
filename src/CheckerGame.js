import React, { Component } from 'react'
import './App.css'
import Broad from './Broad'



export default class CheckerGame extends Component {

    constructor(props){
        super(props)
        const size = 8
        let squares = new Array(size)
        for (let i = 0; i < size; i++){
            squares[i] = Array(size).fill(null)
        } 
        // initial value
        var walkable = true
        for (let i = 0; i < size; i++){
            if (size%2 === 0) walkable = !walkable
            for (let j =0; j < size; j++){
                walkable = ! walkable
                if (walkable) {
                    if (i < 3) squares[i][j] = {team : 0, mobility: 0}
                    if (i >= size - 3) squares[i][j] = {team : 1, mobility: 0}
                }
            }
        }
        this.state = {
            history: [ { squares: squares, nextX: true,} ], 
            stepnum: 0,    
        }
    }

    

    handleClick(squares){
        const history = this.state.history.slice(0,this.state.stepnum + 1)
        const current = history[history.length -1]
        //const squares = JSON.parse(JSON.stringify(current.squares))
        //const team = current.nextX ? 0 : 1
        
        //console.log(squares)
        this.setState(
            { history: history.concat([{squares: squares, nextX: !current.nextX,},]),
              stepnum: history.length
        })
    }

    jumpTo(step){
        this.setState({
            history:this.state.history.slice(0, this.state.stepnum + 1),
            stepnum: step,
        })
    }


    render() {

        const history = this.state.history.slice(0, this.state.stepnum + 1)
        const current = history[history.length -1]
        var status =  'Next player: ' + (current.nextX? 'X':'O')
       
        
        

        const moves = history.map( (step,move)=>{
            const desc = (move? 'Go to move #'+ move +' by '+ (step.nextX? 'O':'X') : 'start' )
            return(
                <li key = {move}>
                    <buttun onClick = { ()=>this.jumpTo(move) } > {desc}  </buttun>
                </li>
            )
        } )

        return (
            <div className="game">
            <div className="game-board">
            
            <Broad squares = {current.squares}
                    team = {current.nextX}
                    onClick = { (squares)=> this.handleClick(squares) } />
            </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ul>{moves}</ul>
                
                    
                </div>
            </div>
        )
    }
}

