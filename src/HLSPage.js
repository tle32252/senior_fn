// import React, { Component } from 'react';
// import HLSPlayer from 'react-hls';
// // import 'react-hls/src/style.css'; // need to import basic styles
// // import 'react-hls/src/icons.css'; // need to import basic icons
//
// class HLSPage extends Component {
//     render() {
//         const source = 'http://10.99.123.26:8085/hls/2130.mp4/index.m3u8';
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


import React, { Component } from 'react'
import Player from 'react-hls/dist/assets/player.bundle';
import { parseQueryString } from './utils'

import './style.css'

const DURATION = '60'
const SOURCE = 'http://localhost:8085/hls/JavaProgramming.mp4/index.m3u8'
const TOKEN = 'asdasdsadsd'


class HLSPage extends Component {
    constructor () {
        super(...arguments)

        this.state = {
            source: SOURCE,
            token: TOKEN,
            duration: DURATION,
            readyToPlay: false
        }


        this.handlePlayButton = this.handlePlayButton.bind(this)

        window.addEventListener('popstate', () => {
            // console.log('pop state')
            this.setComponentState()
        })
    }

    componentWillMount () {
        this.setComponentState()
    }

    handleInputChange (field, value) {
        this.setState({ [field]: value })
    }

    handlePlayButton () {
        const { source, token, duration } = this.state
        const urlChunks = []
        if (duration) urlChunks.push(`duration=${duration}`)
        if (source) urlChunks.push(`url=${source}`)
        if (token) urlChunks.push(`token=${token}`)
        const newUrl = `${window.location.href}?${urlChunks.join('&')}`
        // console.log(newUrl)
        if (source) {
            console.log("source" + source)
            window.history.pushState({}, '', newUrl)
            this.setState({ readyToPlay: true })
        }
    }

    prepareChapters (duration = 0) {
        const chapters = [
            'Intro',
            'Chapter 1. Example of label', 'Chapter 2. Example of label',
            'Chapter 3. Example of label', 'Chapter 4. Example of label',
            'Outro'
        ]
        const getStartEnd = (length, list) => {
            const chunkLength = length / list.length
            return list.map((it, i) => ({
                start: i * chunkLength,
                end: i * chunkLength + chunkLength,
                label: it
            }))
        }
        return getStartEnd(duration, chapters)
    }

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
            autoPlay: false,
            fluid: true,
            hlsConfig: {
                debug: true,
                xhrSetup: (xhr) => {
                    if (!token) return false
                    xhr.setRequestHeader('Authorization', `Beaddrer ${token}`)
                }
            }
        }

        // console.log(source)

        return (
            <div className='player'>
                { !readyToPlay &&
                <form onSubmit={this.handlePlayButton}>
                    <span>Video source:</span>
                    <input
                        defaultValue={source}
                        type='text'
                        onChange={(e) => { this.handleInputChange('source', e.target.value) }}
                    />
                    <br/>
                    <span>Supposed duration:</span>
                    <input
                        defaultValue={duration}
                        type='text'
                        onChange={(e) => { this.handleInputChange('duration', e.target.value) }}
                    />
                    <br/>
                    <span>Authorization sdasdsad token:</span>
                    <input
                        defaultValue={token}
                        type='text'
                        onChange={(e) => { this.handleInputChange('token', e.target.value) }}
                    />
                    <br/>
                    <button type='submit'>Play</button>
                </form>
                }
                { readyToPlay && <Player {...playerOptions} /> }
            </div>
        )
    }
}

export default HLSPage;

