import React from 'react';
import axios from './AxiosConfiguration'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"


import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
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
            title="Exercise That Has Been done"
            iconElementLeft={
                <IconButton onClick={onClick}>
                    <BackIcon/>
                </IconButton>}
            style={{backgroundColor: "#D50000"}}
        />
    );
}

function LoginButton({onClick}){
    return (<RaisedButton label="Redo"
                          fullWidth={false}
                          primary={true}
                          onClick={onClick}
    />)
}


class StudentDoneExercise extends React.Component {
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
        // axios.get(`/user/whoami`)
        //     .then((response) => {
        //         console.log("this is check")
        //         console.log(response.data);
        //         if(response.data === "table"){
        //             this.props.history.push('/menu')
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //         this.props.history.push('/')
        // console.log("tle");
        //     });

        // this.interval = setInterval(this.fetchData, 5000);
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
        localStorage.setItem('Choose', data);
        this.props.history.push('/StudentDoExercise')
    }

    handleOpen_3 = () => {
        this.setState({open_3: true});
    };

    handleClose_3 = () => {
        this.setState({open_3: false});
        this.props.history.push('/mainstudent')

    };

    fetchData = () => {
        console.log("fetch")
        axios.get(`/each_done?username=${this.state.iam}`)
            .then((response) => {
                this.setState({data: response.data})
                console.log(this.state.data)
                if (response.data.length == 0){
                    this.handleOpen_3()
                }
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

    render(){
        const {data, showCheckboxes} = this.state
        const actions_3 = [
            <FlatButton
                label="Close"
                secondary={true}
                onClick={this.handleClose_3}
            />,
        ];
        return (
            <div >

                <Bar onClick={()=>this.props.history.push('/mainstudent')}/>

                <Table style ={{top: "100px"}}>
                    <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>

                        <TableRow>
                            {/*<TableHeaderColumn>Table Number</TableHeaderColumn>*/}
                            <TableHeaderColumn>Exercise</TableHeaderColumn>
                            <TableHeaderColumn>Score</TableHeaderColumn>
                            <TableHeaderColumn>OutOf</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={showCheckboxes}>

                        {data.map((each) => {

                            return(

                                <TableRow>
                                    {/*<TableRowColumn>{each.value}</TableRowColumn>*/}
                                    <TableRowColumn>{each.exercise}</TableRowColumn>
                                    <TableRowColumn>{each.score}</TableRowColumn>
                                    <TableRowColumn>{each.outof}</TableRowColumn>
                                    <TableRowColumn>
                                        {/* {<DropDownMenuOpenImmediateExample />} */}
                                        {/*<MenuItem  primaryText="Do this" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.topic)} />*/}
                                        <LoginButton onClick={() => this.globalStateHandler(each.exercise)}/>
                                        {/*<MenuItem  primaryText="Cooking" onClick={() => this.updateItemStatus(each.key.id, "Cooking")}/>*/}
                                        {/*<MenuItem  primaryText="Done" onClick={() => this.updateItemStatus(each.key.id, "Done")}/>*/}
                                    </TableRowColumn>
                                    {/*<TableRowColumn>*/}
                                        {/*/!* {<DropDownMenuOpenImmediateExample />} *!/*/}
                                        {/*/!*<MenuItem  primaryText="Do this" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.topic)} />*!/*/}
                                        {/*<LoginButton onClick={() => this.globalStateHandler(each.topic)}/>*/}
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

                <Dialog
                    title="You didn't do any exercise yet."
                    actions={actions_3}
                    modal={false}
                    open={this.state.open_3}
                    onRequestClose={this.handleClose}
                >
                    {/*Are you sure to delete all the questions that belong to this topic?*/}
                </Dialog>

            </div>
        )
    }
}

export default StudentDoneExercise;
