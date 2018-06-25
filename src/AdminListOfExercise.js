import React from 'react';
import axios from './AxiosConfiguration'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import Fordessertkit from 'material-ui/svg-icons/action/delete';
import Foredit from 'material-ui/svg-icons/image/edit';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
// import IconButton from 'material-ui/IconButton';



import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';

import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';

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
            title="Exercise Lists"
            iconElementLeft={
                <IconButton onClick={onClick}>
                    <BackIcon/>
                </IconButton>}
            style={{backgroundColor: "#D50000"}}
        />
    );
}


class AdminListOfExercise extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCheckboxes: false,
            data: [],
            secondsElapsed: 0,
            globalState : "",
            open: false,
            wantdelete: "",
            iam: "",
            role: "",
        }
        // this.tick  = this.tick.bind(this)
    }

    handleSubmit = () => {
        axios.post(`/delete_topic?topic=${this.state.wantdelete}`)
            .then((response) => {
                console.log("Delete")
                console.log(response)
                this.setState({open: false});
                window.location.reload();
                this.props.history.push('/admin_list_of_exercise')
            })
            .catch((error) => {
                console.log(error)
            })
    };



    handleOpen = (eiei) => {
        console.log(eiei)

        this.setState({wantdelete: eiei})
        this.setState({open: true});
        // console.log(this.state.wantdelete)

    };

    handleClose = () => {
        // this.setState({wantdelete: ""})
        this.setState({open: false});
        // console.log(this.state.wantdelete)
    };


    // tick = () => {
    //     this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    //     this.fetchData();
    // }

    componentDidMount() {
        axios.get(`/user/whoami`)
            .then((response) => {
                console.log("this is check")
                console.log(response.data);
                if(response.data === "admin"){
                    console.log("this is admin id")
                    this.setState({role: response.data})
                    this.setState({iam: response.data})
                    console.log(this.state.role)
                    console.log(this.state.iam)
                    this.fetchData()
                }
                else {
                    this.props.history.push('/')
                }
            })
            .catch((error) => {
                console.log(error)
                this.props.history.push('/')
            });
        // this.fetchData()

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
        localStorage.setItem('ChooseEdit', data);
        this.props.history.push('/admin_edit_exercise')
    }

    fetchData = () => {
        // console.log("fetch")
        axios.get("/topic_item")
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
                primary={true}
                // keyboardFocused={true}
                onClick={this.handleSubmit}
            />,
        ];

        return (
            <div >

                <Bar onClick={()=>this.props.history.push('/admin_manage_exercise')}/>

                <Table style ={{top: "100px"}}>
                    <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>

                        <TableRow>
                            {/*<TableHeaderColumn>Table Number</TableHeaderColumn>*/}
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Edit</TableHeaderColumn>
                            <TableHeaderColumn>Delete</TableHeaderColumn>
                            {/*<TableHeaderColumn>Status</TableHeaderColumn>*/}
                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={showCheckboxes}>

                        {data.map((each) => {

                            return(

                                <TableRow>
                                    {/*<TableRowColumn>{each.value}</TableRowColumn>*/}
                                    <TableRowColumn>{each.topic}</TableRowColumn>
                                    <TableRowColumn>
                                        {/* {<DropDownMenuOpenImmediateExample />} */}
                                        <MenuItem leftIcon={<Foredit />} primaryText="Topic"  bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.topic)} />
                                        {/*<MenuItem  primaryText="Delete" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.topic)} />*/}
                                        {/*<MenuItem  primaryText="Cooking" onClick={() => this.updateItemStatus(each.key.id, "Cooking")}/>*/}
                                        {/*<MenuItem  primaryText="Done" onClick={() => this.updateItemStatus(each.key.id, "Done")}/>*/}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        {/* {<DropDownMenuOpenImmediateExample />} */}
                                        {/*<MenuItem  primaryText="Edit" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.topic)} />*/}
                                        <MenuItem  leftIcon={<Fordessertkit />} primaryText="Topic"  bugs={this.state.globalState} onClick={() => this.handleOpen(each.topic)} />
                                        {/*<MenuItem  primaryText="Cooking" onClick={() => this.updateItemStatus(each.key.id, "Cooking")}/>*/}
                                        {/*<MenuItem  primaryText="Done" onClick={() => this.updateItemStatus(each.key.id, "Done")}/>*/}
                                    </TableRowColumn>
                                    {/*<TableRowColumn>{each.key.currentStatus}</TableRowColumn>*/}
                                    {/* <TableRowColumn> <RaisedButton onClick={() => console.log(each)}/> </TableRowColumn> */}
                                </TableRow>
                            )


                        })
                        }

                    </TableBody>
                </Table>
                <Dialog
                    title="Confirm Delete , This Action Can't be Undone !!"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    Are you sure to delete all the questions that belong to this topic?
                </Dialog>


            </div>
        )
    }
}

export default AdminListOfExercise;
