import React from 'react';
import axios from './AxiosConfiguration'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import Forvid from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';




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
            title="Video Lists"
            iconElementLeft={
                <IconButton onClick={onClick}>
                    <BackIcon/>
                </IconButton>}
            style={{backgroundColor: "#986d51"}}
        />
    );
}

function LoginButton({onClick}){
    return (<RaisedButton label="Delete this"
                          fullWidth={false}
                          // secondary={true}
                          buttonStyle={{backgroundColor:"#DABD97"}}
                          onClick={onClick}
                          icon={<Forvid />}
    />)
}


class AdminListOfVideo extends React.Component {
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

    componentDidMount() {
        axios.get(`/user/whoami`)
            .then((response) => {
                // console.log("this is check")
                console.log(response)
                console.log(response.data);

                if(response.data === "admin"){
                    console.log("this is admin id")
                    this.setState({role: response.data})
                    this.setState({iam: response.data})
                    console.log(this.state.role)
                    console.log(this.state.iam)
                    this.fetchData();
                }
                else {
                    this.props.history.push('/')
                }


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

    fetchData = () => {
        console.log("fetch")
        axios.get("/video_item")
            .then((response) => {
                this.setState({data: response.data})
                console.log(this.state.data)
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

    globalStateHandler = (data) => {
        // perhaps some processing...
        this.makeJwt(data);

        this.setState({
            globalState: data,
        })
        localStorage.setItem('ChooseWatch', data);
        this.props.history.push('/hls_page')
    }

    handleOpen = (eiei) => {
        console.log(eiei)

        this.setState({wantdeletevid: eiei})
        this.setState({open: true});
        // console.log(this.state.wantdelete)

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

    handleSubmit = () => {
        console.log(this.state.wantdeletevid)
        axios.post(`/delete_video?id=${this.state.wantdeletevid}`)
            .then((response) => {
                console.log("Delete")
                console.log(response)
                this.setState({open: false});
                window.location.reload();
                // this.props.history.push('/admin_list_of_exercise')
            })
            .catch((error) => {
                console.log(error)
            })
    };

    handleClose = () => {
        // this.setState({wantdelete: ""})
        this.setState({open: false});
        // console.log(this.state.wantdelete)
    };

    render(){
        const {data, showCheckboxes} = this.state
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                secondary={true}
                // keyboardFocused={true}
                onClick={this.handleSubmit}
            />,
        ];
        return (
            <div >
                <AppBar
                    title="Video Lists"
                    iconElementLeft={
                        <IconButton onClick={()=>this.props.history.push('/admin_manage_video')}>
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



                {/*<Bar onClick={()=>this.props.history.push('/admin_manage_video')}/>*/}

                <Table style ={{top: "100px"}}>
                    <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>

                        <TableRow>
                            <TableHeaderColumn>Topic</TableHeaderColumn>
                            <TableHeaderColumn>Description</TableHeaderColumn>
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

                                    <TableRowColumn>
                                        {/* {<DropDownMenuOpenImmediateExample />} */}
                                        {/*<a href={each.url+"?jwt=sadasd"}>  Watch This</a>*/}
                                        {/*<MenuItem  primaryText="Watch this" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.url)} />*/}
                                        <LoginButton onClick={() => this.handleOpen(each.id)}/>

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

                <Dialog
                    title="Confirm Delete ! "
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    Are you sure you want to delete this video?
                </Dialog>

            </div>
        )
    }
}

export default AdminListOfVideo;
