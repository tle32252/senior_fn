import React from 'react';
import axios from './AxiosConfiguration'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Foredit from 'material-ui/svg-icons/image/edit';
import Foradd from 'material-ui/svg-icons/content/add-circle-outline';

import Fordessertkit from 'material-ui/svg-icons/action/delete';



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
import SelectField from 'material-ui/SelectField';


import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


function Bar({onClick, handleOpen_3}) {
    return(
        <AppBar
            title={` ${String(localStorage.getItem("ChooseEdit"))} `}
            iconElementLeft={
                <IconButton onClick={onClick}>
                    <BackIcon/>
                </IconButton>}
            iconElementRight={<RaisedButton
                label="Log Out"
                primary={true}
                onClick={handleOpen_3}
                buttonStyle={{backgroundColor:"#e99833"}}
            />}
            style={{backgroundColor: "#D50000"}}
        />
    );
}


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
        borderColor: "#E53935",
    },
    floatingLabelStyle: {
        color: "#E53935",
    },
    floatingLabelFocusStyle: {
        color: "#E53935",
    },
};

class EditExercise extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCheckboxes: false,
            data: [],
            secondsElapsed: 0,
            globalState : "",
            open: false,
            open_2: false,
            open_3: false,
            open_4: false,
            wantdeleteQuestion: "",
            wantedit:"",
            eiei: String(localStorage.getItem("ChooseEdit")),
            role: "",
            iam: "",
            disable: true,
        }
        // this.tick  = this.tick.bind(this)
    }

    onClick_2 = () => {

    };


    handleSubmit = () => {
        axios.post(`/delete_question?id=${this.state.wantdeleteQuestion}`)
            .then((response) => {
                console.log("Delete Question")
                console.log(response)
                this.setState({open: false});
                window.location.reload();
                this.props.history.push('/admin_edit_exercise')
            })
            .catch((error) => {
                console.log(error)
            })
    };



    handleOpen = (eiei) => {
        console.log(eiei)

        this.setState({wantdeleteQuestion: eiei})
        this.setState({open: true});
        // console.log(this.state.wantdelete)

    };

    handleOpen_edit = (eiei) => {


        this.setState({wantedit: eiei})
        axios.get(`/each_id?id=${eiei}`)
            .then((response) => {
                // console.log("Delete Question")
                console.log(response.data)
                this.setState({topic: response.data.topic});
                this.setState({question: response.data.question});
                this.setState({ca: response.data.choiceA});
                this.setState({cb: response.data.choiceB});
                this.setState({cc: response.data.choiceC});
                this.setState({cd: response.data.choiceD});
                this.setState({value: response.data.correct});
                // this.setState({topic: response.data.topic});
                // this.setState({topic: response.data.topic});

                // this.setState({open: false});
                // this.props.history.push('/admin_edit_exercise')
            })
            .catch((error) => {
                console.log(error)
            })

        this.setState({open_2: true});



        console.log("OPEMNNNNN")
        console.log(this.state.correct)

    };

    handleOpen_3 = () => {
        console.log("add new one")
        this.setState({topic: localStorage.getItem("ChooseEdit")});
        this.setState({open_3: true});
    }

    handleClose_3 = () => {
        console.log("CLOSEeEEEE")
        this.setState({open_3: false});
        this.setState({topic: ""})
        this.setState({question: ""})
        this.setState({ca: ""})
        this.setState({cb: ""})
        this.setState({cc: ""})
        this.setState({cd: ""})
        this.setState({value: ""})
    };


    handleClose_2 = () => {
        console.log("CLOSEeEEEE")
        this.setState({open_2: false});
        this.setState({topic: ""})
        this.setState({question: ""})
        this.setState({ca: ""})
        this.setState({cb: ""})
        this.setState({cc: ""})
        this.setState({cd: ""})
        this.setState({value: ""})
    };

    handleClose = () => {
        // this.setState({wantdelete: ""})
        this.setState({open: false});
        // console.log(this.state.wantdelete)
    };

    handleOpen_4 = () => {
        this.setState({open_4: true});
    };

    handleClose_4 = () => {
        this.setState({open_4: false});
        window.location.reload();
    };

    handleOpen_5 = () => {
        this.setState({open_5: true});
    };

    handleClose_5 = () => {
        this.setState({open_5: false});
        window.location.reload();
    };




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
        //     });
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
        })
        localStorage.setItem('Choose', data);
        this.props.history.push('/StudentDoExercise')
    }

    fetchData = () => {
        console.log("fetch")
        axios.get(`/each_topic?topic=${this.state.eiei}`)
            .then((response) => {
                this.setState({data: response.data})
                console.log(this.state.data)
                if (response.data.length === 0){
                    axios.post(`/delete_null_topic?topic=${this.state.eiei}`)
                        .then((response) => {
                            // this.setState({data: response.data})
                            // console.log(this.state.data)
                            // if (response.data.length === 0){
                            //
                            //     this.props.history.push('/admin_list_of_exercise')
                            // }
                            // this.state.data.map((each) => {
                            //         console.log(each.id);
                            //     }
                            // )
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    this.props.history.push('/admin_list_of_exercise')
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

    updateTopic = (e) => {
        // console.log(e)
        console.log(this.state.topic)
        this.setState({topic: e.target.value}, () => this.checkButtonDisable());
    };

    updateQuestion = (f) => {
        this.setState({question: f.target.value}, () => this.checkButtonDisable());
    };

    updateChoiceA = (g) => {
        // console.log(g)
        console.log(this.state.ca)
        this.setState({ca: g.target.value}, () => this.checkButtonDisable());
    };

    updateChoiceB = (h) => {
        this.setState({cb: h.target.value}, () => this.checkButtonDisable());
    };

    updateChoiceC = (i) => {
        this.setState({cc: i.target.value}, () => this.checkButtonDisable());
    };

    updateChoiceD = (j) => {
        this.setState({cd: j.target.value}, () => this.checkButtonDisable());
    };

    handleChange = (event, index, value) => this.setState({value});

    // checkButtonDisable = () => {
    //     if (this.state.name != "" && this.state.price != "" && this.state.file != "") {
    //         this.setState({disable: false})
    //     }
    //     else{
    //         this.setState({disable: true})
    //     }
    // };
    sendRequest = () => {
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

    // checkButtonDisable = () => {
    //     if (this.state.cd != null) {
    //         console.log("False")
    //         this.setState({disable: false})
    //     }
    //     else{
    //         this.setState({disable: true})
    //         console.log("True")
    //     }
    // };
    checkButtonDisable = () => {
        if (this.state.question != null && this.state.ca != null && this.state.cb != null && this.state.cc != null && this.state.cd != null && this.state.value != null) {
            console.log("False")
            this.setState({disable: false})
        }
        else{
            this.setState({disable: true})
            console.log("True")
        }
    };

    updateExercise = () =>{
        var data = {
            topic: this.state.topic,
            question: this.state.question,
            choiceA: this.state.ca,
            choiceB: this.state.cb,
            choiceC: this.state.cc,
            choiceD: this.state.cd,
            correct: this.state.value
        }

        // this.handleClose();
        console.log("Update Exercise")
        console.log(data)
        axios.put(`/update_question?id=${this.state.wantedit}`, data)
            .then((response) => {
                console.log(response)

            })
            .catch((error) => {
                console.log(error)
            })
        this.setState({open_2: false});
        this.handleOpen_4();

        // this.setState({open_3: true});

        this.setState({topic: ""})
        this.setState({question: ""})
        this.setState({ca: ""})
        this.setState({cb: ""})
        this.setState({cc: ""})
        this.setState({cd: ""})
        this.setState({value: ""})

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
        axios.post(`/post_old_topic`, data)
            .then((response) => {
                console.log(response)

            })
            .catch((error) => {
                console.log(error)
            });
        this.handleClose_3()
        this.handleOpen_5();
        // this.handleOpen_3();

        this.setState({topic: ""});
        this.setState({question: ""});
        this.setState({ca: ""});
        this.setState({cb: ""});
        this.setState({cc: ""});
        this.setState({cd: ""});
        this.setState({value: ""});

    }



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

        const actions_2 = [
            <FlatButton
                label="Cancel"
                backgroundColor="#F44336"
                onClick={()=> this.handleClose_2()}
                style={{float:"left"}}
            />,
            <FlatButton
                label="Save"
                backgroundColor="#8BC34A"
                disabled={this.state.disable}
                onClick={()=> this.updateExercise()}
            />,
        ];

        const actions_3 = [
            <FlatButton
                label="Cancel"
                backgroundColor="#F44336"
                onClick={()=> this.handleClose_3()}
                style={{float:"left"}}
            />,
            <FlatButton
                label="Save"
                backgroundColor="#8BC34A"
                disabled={this.state.disable}
                onClick={()=> this.makeExercise_1()}
            />,
        ];

        const actions_4 = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose_4}
            />,

        ];

        const actions_5 = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose_5}
            />,

        ];

        return (
            <div >

                {/*<Bar onClick={()=>this.props.history.push('/admin_list_of_exercise')}/>*/}

                <AppBar
                    title={` ${String(localStorage.getItem("ChooseEdit"))} `}
                    iconElementLeft={
                        <IconButton onClick={()=>this.props.history.push('/admin_list_of_exercise')}>
                            <BackIcon/>
                        </IconButton>}
                    iconElementRight={<RaisedButton
                        label="Add"
                        primary={true}
                        icon={<Foradd />}
                        onClick={this.handleOpen_3}
                        buttonStyle={{backgroundColor:"#e99833"}}
                    />}
                    style={{backgroundColor: "#D50000"}}
                />

                <Table style ={{top: "100px"}}>
                    <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>

                        <TableRow>
                            {/*<TableHeaderColumn>Table Number</TableHeaderColumn>*/}
                            <TableHeaderColumn >Name</TableHeaderColumn>
                            <TableHeaderColumn >Edit</TableHeaderColumn>
                            <TableHeaderColumn>Delete</TableHeaderColumn>
                            {/*<TableHeaderColumn>Status</TableHeaderColumn>*/}
                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={showCheckboxes}>

                        {data.map((each) => {

                            return(

                                <TableRow>
                                    {/*<TableRowColumn>{each.value}</TableRowColumn>*/}
                                    <TableRowColumn>{each.question}</TableRowColumn>

                                    <TableRowColumn>
                                        {/* {<DropDownMenuOpenImmediateExample />} */}
                                        {/*<MenuItem  leftIcon={<Foredit />} primaryText="Question"  bugs={this.state.globalState} onClick={() => this.handleOpen_edit(each.id)} />*/}
                                        <LoginButton onClick={() => this.handleOpen_edit(each.id)}/>
                                        {/*<MenuItem  primaryText="Delete" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.topic)} />*/}
                                        {/*<MenuItem  primaryText="Cooking" onClick={() => this.updateItemStatus(each.key.id, "Cooking")}/>*/}
                                        {/*<MenuItem  primaryText="Done" onClick={() => this.updateItemStatus(each.key.id, "Done")}/>*/}
                                    </TableRowColumn>


                                    <TableRowColumn>
                                        {/* {<DropDownMenuOpenImmediateExample />} */}
                                        {/*<MenuItem  primaryText="Edit" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.topic)} />*/}
                                        {/*<MenuItem leftIcon={<Fordessertkit />} primaryText="Question"  bugs={this.state.globalState} onClick={() => this.handleOpen(each.id)} />*/}
                                        <SignupButton onClick={() => this.handleOpen(each.id)}/>
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
                    title="Confirm Delete ! "
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    Are you sure you want to delete this question? This action can't be undone.
                </Dialog>


                <Dialog
                    title="Edit Question"
                    modal={true}
                    open={this.state.open_2}
                    actions={actions_2}
                    titleStyle={{backgroundColor:"#D50000", color:"white"}}
                    contentStyle={{ width: '30%',}}
                    autoScrollBodyContent={true}
                >
                    {/*<TextField*/}
                        {/*style={{marginLeft:"20px"}}*/}
                        {/*floatingLabelText="Topic"*/}
                        {/*value={this.state.topic}*/}
                        {/*onChange={(e)=> this.updateTopic(e)}*/}
                        {/*underlineFocusStyle={styles.underlineStyle}*/}
                        {/*floatingLabelFocusStyle={styles.floatingLabelFocusStyle}*/}
                    {/*/>*/}
                    {/*<br />*/}
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
                {/*-----------------------------------------------------------------*/}
                {/*-----------------------------------------------------------------*/}
                {/*-----------------------------------------------------------------*/}
                {/*-----------------------------------------------------------------*/}

                <Dialog
                    title="Add new Question"
                    modal={true}
                    open={this.state.open_3}
                    actions={actions_3}
                    titleStyle={{backgroundColor:"#D50000", color:"white"}}
                    contentStyle={{ width: '30%',}}
                    autoScrollBodyContent={true}
                >
                    {/*<TextField*/}
                    {/*style={{marginLeft:"20px"}}*/}
                    {/*floatingLabelText="Topic"*/}
                    {/*value={this.state.topic}*/}
                    {/*onChange={(e)=> this.updateTopic(e)}*/}
                    {/*underlineFocusStyle={styles.underlineStyle}*/}
                    {/*floatingLabelFocusStyle={styles.floatingLabelFocusStyle}*/}
                    {/*/>*/}
                    {/*<br />*/}
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
                    title="Successfully Edited"
                    actions={actions_4}
                    modal={false}
                    open={this.state.open_4}
                    onRequestClose={this.handleClose}
                >
                    {/*Are you sure to delete all the questions that belong to this topic?*/}
                </Dialog>


                <Dialog
                    title="Successfully Added"
                    actions={actions_5}
                    modal={false}
                    open={this.state.open_5}
                    onRequestClose={this.handleClose}
                >
                    {/*Are you sure to delete all the questions that belong to this topic?*/}
                </Dialog>


            </div>
        )
    }
}

export default EditExercise;
