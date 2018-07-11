import React from 'react';
import axios from './AxiosConfiguration'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import Forvid from 'material-ui/svg-icons/notification/ondemand-video';
import MoneyIcon from 'material-ui/svg-icons/action/done-all';



import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';

import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


function Bar({onClick}) {
    return(
        <AppBar
            title="Video Lists Available"
            iconElementLeft={
                <IconButton onClick={onClick}>
                    <BackIcon/>
                </IconButton>}
            style={{backgroundColor: "#986d51"}}
        />
    );
}

var delayInMilliseconds = 1000; //1 second

// setTimeout(function eiei() {
//     this.props.history.push('/hls_page')
// }, delayInMilliseconds);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    console.log('Taking a break...');
    await sleep(1000);
    console.log('Two second later');

}

function LoginButton({onClick}){
    return (<RaisedButton label="Watch this"
                          fullWidth={false}
                          // primary={true}
                          onClick={onClick}
                          buttonStyle={{backgroundColor:"#DABD97"}}
                          icon={<Forvid />}
    />)
}


class StudentChooseVideo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCheckboxes: false,
            data: [],
            secondsElapsed: 0,
            role: "",
            iam: "",
        }
        this.tick  = this.tick.bind(this)
    }

    tick = () => {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
        this.fetchData();
    }

    // sleep = (ms) => {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
    //
    // async demo() {
    //     console.log('Taking a break...');
    //     await sleep(1000);
    //     console.log('Two second later');
    //     // this.history.push('/hls_page');
    // }

    componentDidMount(){
        axios.get(`/user/whoami`)
            .then((response) => {
                // console.log("this is check")
                axios.get(`/user/check_paid_2?username=${response.data}`)
                    .then((response) => {
                        console.log("True")

                    })
                    .catch((error) => {
                        console.log("False")
                        console.log(error)
                        this.props.history.push('/mainstudentunpaid')
                    })

                console.log(response)
                console.log(response.data);

                console.log("this is for student")
                this.setState({role: response.data})
                this.setState({iam: response.data})
                console.log(this.state.role)
                console.log(this.state.iam)
                this.fetchData()

                // if(response.data === "admin"){
                //
                // }
                // else {
                //     this.props.history.push('/')
                // }


            })
            .catch((error) => {
                console.log(error)
                this.props.history.push('/')
            })

    }

    // componentDidMount() {
    //     axios.get(`/user/whoami`)
    //         .then((response) => {
    //             console.log("this is check")
    //             console.log(response.data);
    //             if(response.data === "table"){
    //                 this.props.history.push('/menu')
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             this.props.history.push('/')
    //         });
    //     this.fetchData()
    //     this.interval = setInterval(this.fetchData, 5000);
    // }

    componentWillUnmount = () =>{
        clearInterval(this.interval);
    }



    fetchData = () => {
        console.log("fetch")
        axios.get("/video_item")
            .then((response) => {
                this.setState({data: response.data})
                console.log(this.state.data)
                this.setState({dataLength: response.data.length})
                axios.get(`/each_videodone?username=${this.state.iam}`)
                    .then((response) => {
                        this.setState({data_2: response.data})
                        console.log(this.state.data_2)
                        this.setState({dataLength_2: response.data.length})

                        for (var i = 0; i < this.state.dataLength; i++) {
                            // console.log(this.state.data[i].id)
                            for (var j = 0; j < this.state.dataLength_2; j++) {
                                if (this.state.data[i].topic == this.state.data_2[j].video){
                                    console.log("yess")
                                    this.state.data[i].watch = "Watched"
                                    // this.state.data[i].outof = this.state.data_2[j].outof
                                }
                                // else {
                                //     console.log("nooo")
                                //     this.state.data[i].score = "-"
                                //     this.state.data[i].outof = "-"
                                // }
                            }
                        }
                        console.log(this.state.data)
                        this.setState({finaldata: this.state.data})
                    })
                    .catch((error) => {
                        console.log(error)
                    })




                // this.state.data.map((each) => {
                //         console.log(each.id);
                //     }
                // )
            })
            .catch((error) => {
                console.log(error)
            })
    };

    iWillLoopForU = (each) => {
        console.log(each)
        each.map((elt) => {
            console.log(elt)
        })
    };

    makeJwt = (data) => {
        // /user/make_jwt?username=tle&video=asdsad
        axios.post(`/user/make_jwt?username=${this.state.iam}&video=${data}`)
            .then((response) => {
                console.log(response.data)
                localStorage.setItem('Jwt', response.data);

            })
            .catch((error) => {
                console.log(error)
            })
    }

    globalStateHandler = (data,data2,data3) => {
        // perhaps some processing...
        axios.post(`/user/make_jwt?username=${this.state.iam}&video=${data}`)
            .then((response) => {
                console.log(response.data)
                localStorage.setItem('Jwt', response.data);
                console.log("set jwt")
                axios.post(`/upload_videodone?username=${this.state.iam}&video=${data2}`)
                    .then((response) => {
                        console.log("im heree")
                        console.log(response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })

            })
            .catch((error) => {
                console.log(error)
            })



        this.setState({
            globalState: data,
        })
        localStorage.setItem('ChooseWatch', data);
        localStorage.setItem('HeaderHls', data2);
        localStorage.setItem('Description', data3);
        // demo();
        console.log("be 4 tiimeout");
        setTimeout(this.go, 500);
        console.log("after timeout");

        // this.props.history.push('/hls_page');

    };

    go =() =>{
        this.props.history.push('/hls_page');
    };

    sendRequest_2 = () => {
        axios.post("/logout")
            .then((response) => {
                console.log("log out")
                console.log(response)
                this.props.history.push('/')
            })
            .catch((error) => {
                console.log(error)
            })
    };


    render(){
        const {data, showCheckboxes} = this.state
        return (
            <div >


                {/*<Bar onClick={()=>this.props.history.push('/mainstudent')}/>*/}

                <AppBar
                    title="Video Lists Available"
                    iconElementLeft={
                        <IconButton onClick={()=>this.props.history.push('/mainstudent')}>
                            <BackIcon/>
                        </IconButton>}
                    iconElementRight={<RaisedButton
                        label="Log Out"
                        primary={true}
                        onClick={this.sendRequest_2}
                        buttonStyle={{backgroundColor:"#e99833"}}
                        style={{marginTop:"5px"}}
                    />}
                    style={{backgroundColor: "#986d51"}}
                />

                {/*<AppBar*/}
                    {/*title="Video Lists Available"*/}
                    {/*showMenuIconButton={false}*/}
                    {/*style={{backgroundColor: "#986d51"}}*/}
                    {/*iconElementLeft={*/}
                        {/*<IconButton onClick={()=>this.props.history.push('/mainmenustudent')}>*/}
                            {/*<BackIcon/>*/}
                        {/*</IconButton>}*/}
                    {/*iconElementRight={<RaisedButton*/}
                        {/*label="Log Out"*/}
                        {/*primary={true}*/}
                        {/*onClick={this.sendRequest}*/}
                        {/*buttonStyle={{backgroundColor:"#e99833"}}*/}
                        {/*style={{marginTop:"5px"}}*/}
                    {/*/>}*/}
                {/*/>*/}

                <Table style ={{top: "100px"}}>
                    <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>

                        <TableRow>
                            <TableHeaderColumn>Topic</TableHeaderColumn>
                            <TableHeaderColumn>Description</TableHeaderColumn>
                            <TableHeaderColumn>Remark</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                            {/*<TableHeaderColumn>Status</TableHeaderColumn>*/}
                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={showCheckboxes}>

                        {data.map((each) => {



                            return(

                                <TableRow>
                                    <TableRowColumn>{each.topic}</TableRowColumn>
                                    <TableRowColumn>{each.description}</TableRowColumn>
                                    {/*<TableRowColumn>*/}
                                        {/*/!* {<DropDownMenuOpenImmediateExample />} *!/*/}
                                        {/*<MenuItem  primaryText="Waiting" onClick={() => this.updateItemStatus(each.key.id, "Waiting")}/>*/}
                                        {/*<MenuItem  primaryText="Cooking" onClick={() => this.updateItemStatus(each.key.id, "Cooking")}/>*/}
                                        {/*<MenuItem  primaryText="Done" onClick={() => this.updateItemStatus(each.key.id, "Done")}/>*/}
                                    {/*</TableRowColumn>*/}
                                    {/*<TableRowColumn>{each.id}</TableRowColumn>*/}
                                    {/*<TableRowColumn>{each.watch}</TableRowColumn>*/}


                                    <TableRowColumn >
                                        <IconButton disabled={!("Watched" === each.watch)}>
                                            <MoneyIcon
                                                color={"green"}
                                                viewBox={'0 0 24 24'}
                                            />
                                        </IconButton>
                                    </TableRowColumn>

                                    <TableRowColumn>
                                        {/* {<DropDownMenuOpenImmediateExample />} */}
                                        {/*<a href={each.url+"?jwt=sadasd"}>  Watch This</a>*/}
                                        {/*<MenuItem  primaryText="Watch this" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.url)} />*/}
                                        <LoginButton onClick={() => this.globalStateHandler(each.url, each.topic, each.description)}/>

                                        {/*<MenuItem  primaryText="Watch this" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.filepath)}*/}
                                        {/*/>*/}
                                        {/*<MenuItem  primaryText="Cooking" onClick={() => this.updateItemStatus(each.key.id, "Cooking")}/>*/}
                                        {/*<MenuItem  primaryText="Done" onClick={() => this.updateItemStatus(each.key.id, "Done")}/>*/}
                                    </TableRowColumn>
                                    {/* <TableRowColumn> <RaisedButton onClick={() => console.log(each)}/> </TableRowColumn> */}
                                </TableRow>
                            )


                        })
                        }

                    </TableBody>
                </Table>

            </div>
        )
    }
}

export default StudentChooseVideo;
