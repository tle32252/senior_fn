// import React from 'react';
// import ReactDOM from 'react-dom';
// import ReactJWPlayer from 'react-jw-player';
//
//
// ReactDOM.render(
//     <ReactJWPlayer
//         playerId='my-unique-id'
//         playerScript='http://192.168.1.11:8085/hls/2130.mp4/index.m3u8'
//         playlist='http://192.168.1.11:8085/hls/2130.mp4/index.m3u8'
//     />,
//     document.getElementById('root')
// );
// export default VideoStudent;




//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------


import React from 'react';
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
// import React from 'react';
import ReactDOM from 'react-dom';
import ReactJWPlayer from 'react-jw-player';



import AppBar from 'material-ui/AppBar';


function Bar({onClick}) {
    return(
        <AppBar
            title="Video Player"
            iconElementLeft={
                <IconButton onClick={onClick}>
                    <BackIcon/>
                </IconButton>}
            style={{backgroundColor: "#D50000"}}
        />
    );
}



class VideoStudent extends React.Component {



    render(){
        // const {data, showCheckboxes} = this.state
        {/*<ReactJWPlayer*/}
        {/*playerId='my-unique-id'*/}
        {/*playerScript='https://link-to-my-jw-player/script.js'*/}
        {/*file='http://172.28.4.231:8085/hls/2130.mp4/index.m3u8'*/}
        {/*/>*/}
        return (
            <div >
                <Bar onClick={()=>this.props.history.push('/student_choose_video')}/>
                <ReactJWPlayer
                    playerId='my-unique-id'
                    playerScript='http://jwpsrv.com/library/CKT7slhiEeOspBIxOQfUww.js'
                    file='http://localhost:8085/hls/JavaProgramming.mp4/index.m3u8?token=eeee'
                />,
                {/*document.getElementById('root');*/}




            </div >


        )
    }
}

export default VideoStudent;

