import React from 'react'
import './App.css'

import AdbIcon from '@material-ui/icons/Adb';
import AndroidIcon from '@material-ui/icons/Android';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';


export default function Square(props) {

    function chooseIcon(value){
        if (value === 1) return <AdbIcon style={{ fontSize: 20 }} />
        if (value === 7) return <AndroidIcon style={{ fontSize: 20 }} />
        if (value === 2) return <AdbIcon style={{ fontSize: 20, color: '#ff0000' }} />
        if (value === 9) return <AndroidIcon style={{ fontSize: 20, color: '#ff0000' }} />
        if (value === 3) return <GpsNotFixedIcon style={{ fontSize: 20, color: '#ffff00' }} />
        
    }
    
    return (
        <button className = "square"
            onClick = { props.onClick }>
                {/*props.value*/}
                {chooseIcon(props.value)}
        </button>
    )
}

