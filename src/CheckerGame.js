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
                    if (i > 4) squares[i][j] = {team : 1, mobility: 0}
                }
            }
        }

        

        this.state = {
            history: [ { squares: squares, nextX: true,} ], 
            stepnum: 0,
            
        }
    }

    

    afterChosen(i,j){
        console.log(i,j)
        const history = this.state.history.slice(0,this.state.stepnum + 1)
        const current = history[history.length -1].squares
        const squares = current.squares
        const team = current.nextX ? 0 : 1
        if (squares[i][j] && squares[i][j].team !== team ) {
            this.setState({chosen:[i,j]})
            return
        }
        
        var candi = [[3,1]]
        var x0 = this.state.chosen[0]
        var y0 = this.state.chosen[1]
        const mobility = squares[x0][y0].mobolity
        this.goable(x0, y0, team, mobility, candi)
        console.log(candi)

        for (let k = 0; k < candi.length; k++){
            if (i === candi[k][0] && j === candi[k][j]){
                squares[i][j] = squares[x0][y0]
                squares[x0][y0] = null
                this.setState(
                    { history: history.concat([{squares: squares, nextX: !current.nextX,},]),
                      stepnum: history.length,
                      chosen:null
                })
            }
        }
    }

    Findreachable(i,j, mobility){
        const history = this.state.history.slice(0,this.state.stepnum + 1)
        const current = history[history.length -1]
        const squares = JSON.parse(JSON.stringify(current.squares))
        const team = current.nextX ? 0 : 1

        var direction
        if (mobility === 1) direction = [ [1,1],[1,-1],[-1,1],[-1,-1] ]
        else if (team === 0) direction = [ [1,1],[1,-1] ]
        else direction = [ [-1,1],[-1,-1] ]
        
        for (let k = 0; k < direction; k++){
            let x = i+direction[k][0]
            let y = j+direction[k][1]
            if (!squares[x][y] && !squares[i][j].killed) {
                squares[x][y].team = team 
            }else if (squares[x][y] && squares[x][y].team !== team){
                let x2 = i+2*direction[k][0]
                let y2 = j+2*direction[k][1]
                squares[x2][y2].killed = squares[i][j].killed.concat([x,y])
                this.Findreachable(x2,y2,mobility)
            }
            //else if (squares[x][y].team !== team) this.goable(x,y,team,mobility,candi)
        }

        return

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

