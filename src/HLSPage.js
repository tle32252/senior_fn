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
import axios from "./AxiosConfiguration";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
// import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


const DURATION = 60
const SOURCE = ''
const TOKEN = ''


function Bar({onClick,eiei}) {
    return(
        <AppBar
            title={eiei}
            iconElementLeft={
                <IconButton onClick={onClick}>
                    <BackIcon/>
                </IconButton>}
            style={{backgroundColor: "#986d51"}}
        />
    );
}

class App extends Component {
    constructor () {
        super(...arguments)

        this.state = {
            source: String(localStorage.getItem("ChooseWatch")),
            token: String(localStorage.getItem("Jwt")),
            description: String(localStorage.getItem("Description")),

        }


    }

    // componentDidMount() {
    //     axios.get(`/user/whoami`)
    //         .then((response) => {
    //             // console.log("this is check")
    //             // axios.get(`/user/check_paid_2?username=${response.data}`)
    //             //     .then((response) => {
    //             //         console.log("True")
    //             //
    //             //     })
    //             //     .catch((error) => {
    //             //         console.log("False")
    //             //         console.log(error)
    //             //         this.props.history.push('/mainstudentunpaid')
    //             //     })
    //
    //             console.log(response)
    //             console.log(response.data);
    //
    //             console.log("this is for student")
    //             this.setState({role: response.data})
    //             this.setState({iam: response.data})
    //             console.log(this.state.role)
    //             console.log(this.state.iam)
    //             this.fetchData()
    //
    //             // if(response.data === "admin"){
    //             //
    //             // }
    //             // else {
    //             //     this.props.history.push('/')
    //             // }
    //
    //
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             console.log("bye bye")
    //             this.props.history.push('/')
    //         })
    //     // axios.get(`/user/whoami`)
    //     //     .then((response) => {
    //     //         console.log("this is check")
    //     //         console.log(response.data);
    //     //         if(response.data === "table"){
    //     //             this.props.history.push('/menu')
    //     //         }
    //     //     })
    //     //     .catch((error) => {
    //     //         console.log(error)
    //     //         this.props.history.push('/')
    //     // console.log("tle");
    //     //     });
    //
    //     // this.interval = setInterval(this.fetchData, 5000);
    // }

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

            <div>
                <Bar
                    onClick={()=>this.props.history.push('/student_choose_video')}
                    // eiei =
                    eiei={` ${String(localStorage.getItem("HeaderHls"))} `}
                    // se={true}

                />
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Player {...playerOptions} />
                </div>
                <br/>
                <br/>

                <Card>
                    <CardHeader
                        title="Descriptions"
                        // subtitle="Subtitle"
                        actAsExpander={true}
                        showExpandableButton={true}
                        // color={"green"}
                    />
                    {/*<CardActions>*/}
                        {/*<FlatButton label="Action1" />*/}
                        {/*<FlatButton label="Action2" />*/}
                    {/*</CardActions>*/}
                    <CardText expandable={true}>
                        {this.state.description}
                        {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit.*/}
                        {/*Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.*/}
                        {/*Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.*/}
                        {/*Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.*/}
                    </CardText>
                </Card>



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