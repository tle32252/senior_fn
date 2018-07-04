// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
// export default App;


import React, { Component } from 'react'
import Player from 'react-hls'
import { parseQueryString } from './utils'
import './style.css'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import AppBar from 'material-ui/AppBar';


const DURATION = 60
const SOURCE = ''
const TOKEN = ''


function Bar({onClick}) {
    return(
        <AppBar
            title="Video"
            iconElementLeft={
                <IconButton onClick={onClick}>
                    <BackIcon/>
                </IconButton>}
            style={{backgroundColor: "#D50000"}}
        />
    );
}

class App extends Component {
    constructor () {
        super(...arguments)

        this.state = {
            source: String(localStorage.getItem("ChooseWatch")),
            token: String(localStorage.getItem("Jwt")),
            // duration: DURATION,
            // readyToPlay: false
        }

        // this.handlePlayButton = this.handlePlayButton.bind(this)

        // window.addEventListener('popstate', () => {
        //     console.log('pop state')
        //     this.setComponentState()
        // })
    }

    // componentDidMount () {
    //     this.setState({ DURATION: 60 })
    //     this.setState({ SOURCE: 'http://localhost:8085/hls/2130.mp4/index.m3u8' })
    //     this.setState({ TOKEN: 'asdasdds' })
    //     this.setState({ readyToPlay: true })
    // }

    // componentWillMount () {
    //     this.setComponentState()
    // }
    //
    // handleInputChange (field, value) {
    //     this.setState({ [field]: value })
    // }
    //
    // handlePlayButton () {
    //     const { source, token, duration } = this.state
    //     // const urlChunks = []
    //     //if (duration) urlChunks.push(`duration=${duration}`)
    //     // if (source) urlChunks.push(`url=${source}`)
    //     //if (token) urlChunks.push(`token=${token}`)
    //     // const newUrl = `${window.location.href}?${urlChunks.join('&')}`
    //     if (source) {
    //         // window.history.pushState({}, '/d', newUrl)
    //         console.log("eee")
    //         this.setState({ readyToPlay: true })
    //         console.log("sss")
    //     }
    // }
    // //
    // prepareChapters (duration = 0) {
    //     const chapters = [
    //         'Intro',
    //         'Chapter 1. Example of label', 'Chapter 2. Example of label',
    //         'Chapter 3. Example of label', 'Chapter 4. Example of label',
    //         'Outro'
    //     ]
    //     const getStartEnd = (length, list) => {
    //         const chunkLength = length / list.length
    //         return list.map((it, i) => ({
    //             start: i * chunkLength,
    //             end: i * chunkLength + chunkLength,
    //             label: it
    //         }))
    //     }
    //     return getStartEnd(duration, chapters)
    // }
    //
    setComponentState () {
        const { token, url, duration } = parseQueryString()
        const newState = {}

        if (token) newState.token = token
        if (url) newState.source = url
        if (duration) newState.duration = duration
        if (Object.keys(newState).length) {
            newState.readyToPlay = true
            this.setState(newState)
        } else {
            this.setState({ source: SOURCE, token: TOKEN, duration: DURATION, readyToPlay: false })
        }
    }

    render () {
       const { readyToPlay, source, token, duration } = this.state
        const playerOptions = {
            isHLS: true,
            url: source,
            autoPlay: true,
//            fluid: true,
            hlsConfig: {
                debug: true,
                xhrSetup: (xhr) => {
                    if (!token) return false
                    xhr.setRequestHeader('Authorization', `${token}`)
                    console.log("hello")
                }
            }
        }


        return (

            <div className='player'>
                <Bar onClick={()=>this.props.history.push('/student_choose_video')}/>

                <Player {...playerOptions} />
                {/*{ !readyToPlay &&*/}
                {/*<form onSubmit={this.handlePlayButton}>*/}
                {/*<span>Video source:</span>*/}
                {/*<input*/}
                {/*defaultValue={source}*/}
                {/*type='text'*/}
                {/*onChange={(e) => { this.handleInputChange('source', e.target.value) }}*/}
                {/*/>*/}
                {/*<br/>*/}
                {/*<span>Supposed duration:</span>*/}
                {/*<input*/}
                {/*defaultValue={duration}*/}
                {/*type='text'*/}
                {/*onChange={(e) => { this.handleInputChange('duration', e.target.value) }}*/}
                {/*/>*/}
                {/*<br/>*/}
                {/*<span>Authorization token:</span>*/}
                {/*<input*/}
                {/*defaultValue={token}*/}
                {/*type='text'*/}
                {/*onChange={(e) => { this.handleInputChange('token', e.target.value) }}*/}
                {/*/>*/}
                {/*<br/>*/}
                {/*<button type='submit'>Play</button>*/}
                {/*</form>*/}
                {/*}*/}
                {/*{ readyToPlay && <Player {...playerOptions} /> }*/}
            </div>
        )
    }
}

export default App

// import React, { Component } from 'react';
// import HLSPlayer from 'react-hls';
// // import 'react-hls/src/style.css'; // need to import basic styles
// // import 'react-hls/src/icons.css'; // need to import basic icons
//
// class HLSPage extends Component {
//     render() {
//         const source = 'http://192.168.43.234:8085/hls/2130.mp4/index.m3u8';
//
//         return (
//             <div>
//                 <HLSPlayer source={source} />
//             </div>
//         );
//     }
// }
//
// export default HLSPage;