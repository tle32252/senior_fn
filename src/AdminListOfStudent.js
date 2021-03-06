import React from 'react';
import axios from './AxiosConfiguration'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import Forvid from 'material-ui/svg-icons/action/done-all';



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
            title="List of Students"
            iconElementLeft={
                <IconButton onClick={onClick}>
                    <BackIcon/>
                </IconButton>}
            style={{backgroundColor: "#986d51"}}
        />
    );
}

function LoginButton({onClick}){
    return (<RaisedButton label="Exercises"
                          fullWidth={false}
                          // secondary={true}
                          onClick={onClick}
                          buttonStyle={{backgroundColor:"#DABD97"}}
                          // style={{backgroundColor: "#986d51"}}
                          icon={<Forvid />}
    />)
}


class AdminListOfStudent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCheckboxes: false,
            data: [],
            secondsElapsed: 0,
            globalState : "",
            iam: "",
            role: "",
        }
        // this.tick  = this.tick.bind(this)
    }

    // tick = () => {
    //     this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    //     this.fetchData();
    // }

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

    componentWillUnmount = () =>{
        clearInterval(this.interval);
    }

    updateItemStatus = (id, status) => {
        axios.put(`/update_by_kitchen?id=${id}&currentStatus=${status}`)
            .then((response) => {
                this.fetchData()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    globalStateHandler = (data) => {
        // perhaps some processing...
        this.setState({
            globalState: data,
        })
        localStorage.setItem('ChooseViewExercise', data);
        this.props.history.push('/admin_view_each_student')
    }

    fetchData = () => {
        console.log("fetch")
        axios.get("/user/all_student")
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

                {/*<Bar onClick={()=>this.props.history.push('/mainmenuadmin')}/>*/}

                <AppBar
                    title="List of Students"
                    iconElementLeft={
                        <IconButton onClick={()=>this.props.history.push('/mainmenuadmin')}>
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

                <Table style ={{top: "100px"}}>
                    <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>

                        <TableRow>
                            {/*<TableHeaderColumn>Table Number</TableHeaderColumn>*/}
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            {/*<TableHeaderColumn>Button</TableHeaderColumn>*/}
                            <TableHeaderColumn>Line</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Progress</TableHeaderColumn>
                            {/*<TableHeaderColumn>Status</TableHeaderColumn>*/}
                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={showCheckboxes}>

                        {data.map((each) => {

                            return(

                                <TableRow>
                                    {/*<TableRowColumn>{each.value}</TableRowColumn>*/}
                                    <TableRowColumn>{each.name}</TableRowColumn>
                                    <TableRowColumn>{each.line}</TableRowColumn>
                                    <TableRowColumn>{each.email}</TableRowColumn>
                                    <TableRowColumn>{each.status}</TableRowColumn>
                                    <TableRowColumn>
                                        {/* {<DropDownMenuOpenImmediateExample />} */}
                                        {/*<a href={each.url+"?jwt=sadasd"}>  Watch This</a>*/}
                                        {/*<MenuItem  primaryText="Watch this" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.url)} />*/}
                                        <LoginButton onClick={() => this.globalStateHandler(each.username)}/>

                                        {/*<MenuItem  primaryText="Watch this" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.filepath)}*/}
                                        {/*/>*/}
                                        {/*<MenuItem  primaryText="Cooking" onClick={() => this.updateItemStatus(each.key.id, "Cooking")}/>*/}
                                        {/*<MenuItem  primaryText="Done" onClick={() => this.updateItemStatus(each.key.id, "Done")}/>*/}
                                    </TableRowColumn>
                                    {/*<TableRowColumn>*/}
                                        {/*/!* {<DropDownMenuOpenImmediateExample />} *!/*/}
                                        {/*<MenuItem  primaryText="Do this" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.name)} />*/}
                                        {/*/!*<MenuItem  primaryText="Cooking" onClick={() => this.updateItemStatus(each.key.id, "Cooking")}/>*!/*/}
                                        {/*/!*<MenuItem  primaryText="Done" onClick={() => this.updateItemStatus(each.key.id, "Done")}/>*!/*/}
                                    {/*</TableRowColumn>*/}
                                    {/*<TableRowColumn>{each.key.currentStatus}</TableRowColumn>*/}
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

export default AdminListOfStudent;
