import React from 'react'
import AndroidIcon from '@material-ui/icons/Android';
import GitHubIcon from '@material-ui/icons/GitHub';

export default function Rule() {
    return (
        <div style = {{width : 500}} >
            <h1>Game Rule of Checkers</h1>
            <h2>Taking a Turn</h2>
            <p>Each player takes their turn by moving a piece. Pieces are always moved diagonally and can be moved in the following ways:</p>
            <ul>
                <li>Diagonally in the forward direction (towards the opponent) to the next empty square.</li>
                <li>If there is one of the opponent's pieces next to a piece and an empty space on the other side, you jump your opponent and remove their piece. You can do multiple jumps if they are lined up in the forward direction.</li>
            </ul>
            <h2>King Pieces  <AndroidIcon /> </h2>
            <p>The last row is called the king row. If you get a piece across the board to the opponent's king row, that piece becomes a king. King pieces can move in both directions, forward and backward.</p>
            <h2>Winning</h2>
            <p>You win the game when the opponent has no more pieces or can't move.</p>

            
            <a href="https://www.ducksters.com/games/checkers_rules.php" target="_blank" > <p>Reference</p> </a>
            
            <a href="https://github.com/snow0112/CheckerGame" target="_blank" ><button><GitHubIcon /></button></a>



        </div>
    )
}
