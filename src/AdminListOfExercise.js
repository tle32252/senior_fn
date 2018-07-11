import React from 'react';
import axios from './AxiosConfiguration'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import Fordessertkit from 'material-ui/svg-icons/action/delete';
import Foredit from 'material-ui/svg-icons/image/edit';
import Foradd from 'material-ui/svg-icons/content/add-circle-outline';

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
// import Dialog from 'material-ui/Dialog';
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
import EditExercise from "./EditExercise";

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

const styles = {
    button: {
        margin: 12,
    },
    exampleImageInput: {
        // cursor: 'pointer',
        // position: 'absolute',
        // top: 0,
        // bottom: 0,
        // right: 0,
        // left: 0,
        // width: '100%',
        // opacity: 0,
    },
    // errorStyle: {
    //   color: orange500,
    // },
    underlineStyle: {
        borderColor: "#673630",
    },
    floatingLabelStyle: {
        color: "#673630",
    },
    floatingLabelFocusStyle: {
        color: "#673630",
    },
};


function LoginButton({onClick}){
    return (<RaisedButton label="Topic"
                          fullWidth={false}
                          primary={true}
                          onClick={onClick}
                          icon={<Foredit />}
    />)
}

function SignupButton({onClick}){
    return (<RaisedButton label="Topic"
                          fullWidth={false}
                          secondary={true}
                          onClick={onClick}
                          icon={<Fordessertkit />}
        // secondary={true}
    />)
}
function Bar({onClick}) {
    return(
        <AppBar
            title="Exercise Lists"
            iconElementLeft={
                <IconButton onClick={onClick}>
                    <BackIcon/>
                </IconButton>}
            iconElementRight={<RaisedButton
                label="Add new topic"
                primary={true}
                icon={<Foradd />}
                // onClick={handleOpen_2}
                buttonStyle={{backgroundColor:"#e99833"}}
            />}
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
            open_2: false,
            wantdelete: "",
            iam: "",
            role: "",
            fonytas: "",
            disable: true,
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

    handleOpen_2 = () => {
        console.log("add new one")
        // this.setState({topic: localStorage.getItem("ChooseEdit")});
        this.setState({open_2: true});
    }

    handleClose = () => {
        // this.setState({wantdelete: ""})
        this.setState({open: false});
        // console.log(this.state.wantdelete)
    };
    handleClose_2 = () => {
        // this.setState({wantdelete: ""})
        this.setState({open_2: false});
        // console.log(this.state.wantdelete)
    };


    // tick = () => {
    //     this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    //     this.fetchData();
    // }

    componentDidMount() {
        // console.log(props.name)
        console.log(this.props.example);
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



    globalStateHandler = (data) => {
        // perhaps some processing...
        this.setState({
            globalState: data,
            fonytas: data
        })
        localStorage.setItem('ChooseEdit', data);
        this.props.history.push('/admin_edit_exercise')

    }

    makeExercise_1 = () =>{
        var data = {
            topic: this.state.topic,
            question: this.state.question,
            choiceA: this.state.ca,
            choiceB: this.state.cb,
            choiceC: this.state.cc,
            choiceD: this.state.cd,
            correct: this.state.value
        };

        console.log("Make New Exercise");
        console.log(data);
        axios.post(`/post_new_topic`, data)
            .then((response) => {
                console.log(response)

            })
            .catch((error) => {
                console.log(error)
            });
        this.handleClose_2();
        this.handleOpen_3();

        this.setState({topic: ""});
        this.setState({question: ""});
        this.setState({ca: ""});
        this.setState({cb: ""});
        this.setState({cc: ""});
        this.setState({cd: ""});
        this.setState({value: ""});
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

    updateTopic = (e) => {
        this.setState({topic: e.target.value}, () => this.checkButtonDisable());
        console.log(this.state.topic)
    };

    updateQuestion = (f) => {
        this.setState({question: f.target.value}, () => this.checkButtonDisable());
        console.log(this.state.question)
    };

    updateChoiceA = (g) => {
        this.setState({ca: g.target.value}, () => this.checkButtonDisable());
        console.log(this.state.ca)
    };

    updateChoiceB = (h) => {
        this.setState({cb: h.target.value}, () => this.checkButtonDisable());
        console.log(this.state.cb)
    };

    updateChoiceC = (i) => {
        this.setState({cc: i.target.value}, () => this.checkButtonDisable());
        console.log(this.state.cc)
    };

    updateChoiceD = (j) => {
        this.setState({cd: j.target.value}, () => this.checkButtonDisable());
        console.log(this.state.cd)
    };

    checkButtonDisable = () => {
        if (this.state.topic != null && this.state.question != null && this.state.ca != null && this.state.cb != null && this.state.cc != null && this.state.cd != null && this.state.value != null) {
            console.log("False")
            this.setState({disable: false})
        }
        else{
            this.setState({disable: true})
            console.log("True")
        }
    };

    handleChange = (event, index, value) => {
        this.setState({value}, () => this.checkButtonDisable());
        console.log(this.state.value)
    };

    handleOpen_3 = () => {
        this.setState({open_3: true});
    };

    handleClose_3 = () => {
        this.setState({open_3: false});
        window.location.reload();
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

                // backgroundColor="#F44336"
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

        const actions_2 = [
            <FlatButton
                label="Cancel"
                backgroundColor="#C98134"
                onClick={this.handleClose_2}
                style={{float:"left"}}
            />,
            <FlatButton
                label="Save"
                backgroundColor="#DABD97"
                // disabled={true}
                disabled={this.state.disable}
                onClick={()=> this.makeExercise_1()}
            />,
        ];

        const actions_3 = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose_3}
            />,

        ];

        return (
            <div >

                <AppBar
                    title="Exercise Lists"
                    iconElementLeft={
                        <IconButton onClick={()=>this.props.history.push('/mainmenuadmin')}>
                            <BackIcon/>
                        </IconButton>}
                    iconElementRight={<RaisedButton
                        label="Add new exercise"
                        primary={true}
                        icon={<Foradd />}
                        onClick={this.handleOpen_2}
                        buttonStyle={{backgroundColor:"#f1bf58"}}
                        style={{marginTop:"5px"}}
                    />}
                    style={{backgroundColor: "#986d51"}}
                />

                {/*<Bar onClick={()=>this.props.history.push('/admin_manage_exercise')}/>*/}

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
                                        {/*<MenuItem leftIcon={<Foredit />} primaryText="Topic"  bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.topic)} />*/}
                                        <LoginButton onClick={() => this.globalStateHandler(each.topic)}/>
                                        {/*<MenuItem  primaryText="Delete" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.topic)} />*/}
                                        {/*<MenuItem  primaryText="Cooking" onClick={() => this.updateItemStatus(each.key.id, "Cooking")}/>*/}
                                        {/*<MenuItem  primaryText="Done" onClick={() => this.updateItemStatus(each.key.id, "Done")}/>*/}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        {/* {<DropDownMenuOpenImmediateExample />} */}
                                        {/*<MenuItem  primaryText="Edit" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.topic)} />*/}
                                        {/*<MenuItem  leftIcon={<Fordessertkit />} primaryText="Topic"  bugs={this.state.globalState} onClick={() => this.handleOpen(each.topic)} />*/}
                                        <SignupButton onClick={() => this.handleOpen(each.topic)}/>
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

                <Dialog
                    title="Create New Question With 'New Topic'"
                    modal={true}
                    open={this.state.open_2}
                    actions={actions_2}
                    titleStyle={{backgroundColor:"#986d51", color:"white"}}
                    contentStyle={{ width: '30%',}}
                    autoScrollBodyContent={true}
                >

                    <TextField
                        style={{marginLeft:"20px"}}
                        floatingLabelText="Topic"
                        value={this.state.topic}
                        onChange={(e)=> this.updateTopic(e)}
                        underlineFocusStyle={styles.underlineStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                    <br />
                    <TextField
                        style={{marginLeft:"20px"}}
                        floatingLabelText="Question"
                        value={this.state.question}
                        onChange={(f)=> this.updateQuestion(f)}
                        underlineFocusStyle={styles.underlineStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                    <br />
                    <TextField
                        style={{marginLeft:"20px"}}
                        floatingLabelText="Choice A"
                        value={this.state.ca}
                        onChange={(g)=> this.updateChoiceA(g)}
                        underlineFocusStyle={styles.underlineStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                    <br />
                    <TextField
                        style={{marginLeft:"20px"}}
                        floatingLabelText="Choice B"
                        value={this.state.cb}
                        onChange={(h)=> this.updateChoiceB(h)}
                        underlineFocusStyle={styles.underlineStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                    <br />
                    <TextField
                        style={{marginLeft:"20px"}}
                        floatingLabelText="Choice C"
                        value={this.state.cc}
                        onChange={(i)=> this.updateChoiceC(i)}
                        underlineFocusStyle={styles.underlineStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                    <br />
                    <TextField
                        style={{marginLeft:"20px"}}
                        floatingLabelText="Choice D"
                        value={this.state.cd}
                        onChange={(j)=> this.updateChoiceD(j)}
                        underlineFocusStyle={styles.underlineStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                    <br />
                    <SelectField
                        floatingLabelText="Choose the correct answer."
                        value={this.state.value}
                        onChange={this.handleChange}
                        style={{marginLeft:"20px"}}
                    >
                        <MenuItem value={"Choice A"} primaryText="Choice A" />
                        <MenuItem value={"Choice B"} primaryText="Choice B" />
                        <MenuItem value={"Choice C"} primaryText="Choice C" />
                        <MenuItem value={"Choice D"} primaryText="Choice D" />
                        {/*<MenuItem value={5} primaryText="Weekly" />*/}
                    </SelectField>
                    <br />
                </Dialog>

                <Dialog
                    title="Successfully Added"
                    actions={actions_3}
                    modal={false}
                    open={this.state.open_3}
                    onRequestClose={this.handleClose_3}
                >
                    {/*Are you sure to delete all the questions that belong to this topic?*/}
                </Dialog>


            </div>
        )
    }
}

export default AdminListOfExercise;
