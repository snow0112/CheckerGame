import React, { Component } from 'react'
import Square from './Square'
import './App.css'


export class Broad extends Component {

    constructor(props){
        super(props)
        this.state = {squares: this.props.squares}
    }

    SquareValue(value){
        //console.log(value)
        if (!value || value.mobility === null) return null
        const team = value.team
        const mobility = value.mobility

        if (value.reachable) return 3
        if (team === 0 && mobility === 0) return 1;
        if (team === 0 && mobility === 1) return 7;
        if (team === 1 && mobility === 0) return 2;
        if (team === 1 && mobility === 1) return 9;

    }

    renderSquare(i,j){
        //console.log(i, j)
        //console.log(this.props.squares[i][j])
        
        return <Square value = { this.SquareValue(this.state.squares[i][j])}
                onClick = { ()=>{this.handleClick(i,j)} }/>
    }

    setReachable(i,j,team,mobility,first_step,square){
        var direction
        if (mobility === 1) direction = [ [1,1],[1,-1],[-1,1],[-1,-1] ]
        else if (team === 0) direction = [ [1,1],[1,-1] ]
        else direction = [ [-1,1],[-1,-1] ]
        const size = square.length
        for(let k = 0; k < direction.length; k++){
            let dx = direction[k][0]
            let dy = direction[k][1]
            if ( i + dx < 0 || i + dx >= size || j + dy < 0 || j + dy >= size  ) continue
            let value = square[i+dx][j+dy]
            if (!value && first_step) {
                square[i+dx][j+dy] = {reachable: true, from: [i,j]}
            }
            if ( i + 2*dx < 0 || i + 2*dx >= size || j + 2*dy < 0 || j + 2*dy >= size  )continue
            else if (value && value.team !== team && !square[i+2*dx][j+2*dy]) {
                square[i+2*dx][j+2*dy] = {reachable: true, from: [i,j]}
                this.setReachable(i+2*dx,j+2*dy,team,mobility,false,square)
            } 
        }
    }

    moveChecker(i,j, squares){  
        if (!squares[i][j].reachable) return
        let x0 = squares[i][j].from[0]
        let y0 = squares[i][j].from[1]
        this.moveChecker(x0,y0,squares)
        let temp = squares[i][j]
        squares[i][j] = squares[x0][y0]
        squares[x0][y0] = temp
        if (i-x0 === 2 || x0 - i === 2) squares[(i+x0)/2][(j+y0)/2] = null
    }

    cleanSquare(squares){
        const size = squares.length
        for (let i = 0; i < size; i++){
            for (let j = 0; j < size; j++){
                if (squares[i][j] && squares[i][j].reachable) squares[i][j] = null
            }
        }
        for (let j = 0; j < size; j++){
            if (squares[0][j] && squares[0][j].team) squares[0][j].mobility = 1
            if (squares[size-1][j] && !squares[size-1][j].team) squares[size-1][j].mobility = 1
        }

    }

    handleClick(i,j){
        var squares = JSON.parse(JSON.stringify(this.state.squares))
        
        const team = this.props.team? 0: 1
        if ( !squares[i][j] ) return

        if (squares[i][j].reachable ){
            console.log('move')
            this.moveChecker(i,j, squares)
            this.cleanSquare(squares)
            this.setState({squares:squares})
            this.props.onClick(squares)
        }
        else if (squares[i][j].team === team ){
            this.setState( {squares: squares} )
            squares = JSON.parse(JSON.stringify(this.props.squares))
            this.setReachable(i,j,team,squares[i][j].mobility, true ,squares)
            this.setState({ squares: squares})
        }
    }

    lastStep(){
        console.log(this.props.squares)
        console.log(this.state.squares)
        //this.props.last()
        this.setState({ squares: this.props.squares})
    }

    goBack(){

    }


    render() {

        var walkable = true;

        const table = this.state.squares.map( (step,move1)=>{
            if (this.state.squares.length%2 === 0) walkable = !walkable
            const row = step.map( (step,move2) =>{
                let reachable = this.state.squares[move1[move2]] && this.state.squares[move1[move2]].reachable
                let className = reachable? 'reachable': (walkable? 'walkable': 'nonwalkable')
                walkable = ! walkable
                return <td key = {move2} 
                        className = {className} 
                        >{this.renderSquare(move1,move2)}</td>
            } )
            return(
                <tr key = {move1}>{row}</tr>
            )
        } )

        return (
            <div className = 'leftside'>
            <table>
                <tbody>
                    {table}
                </tbody>
            </table>
            <button onClick = {()=>{this.lastStep()}} >Update</button>
            { /*<button onClick = {()=>{this.goBack()}} >Back</button> */}
            </div>
        )
    }
}

export default Broad