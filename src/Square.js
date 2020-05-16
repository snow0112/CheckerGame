import React from 'react'
import './App.css'

import AdbIcon from '@material-ui/icons/Adb';
import AndroidIcon from '@material-ui/icons/Android';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';


export default function Square(props) {

    function chooseIcon(value){
        if (value === 1) return <AdbIcon />
        if (value === 7) return <AndroidIcon />
        if (value === 2) return <AdbIcon style={{ color: '#ff0000' }} />
        if (value === 9) return <AndroidIcon style={{ color: '#ff0000' }} />
        if (value === 3) return <GpsNotFixedIcon style={{ color: '#ffff00' }} />
        
    }
    
    return (
        <button className = "square"
            onClick = { props.onClick }>
                {/*props.value*/}
                {chooseIcon(props.value)}
        </button>
    )
}

