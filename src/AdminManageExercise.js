import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import ForTable from 'material-ui/svg-icons/action/note-add';
import ForKit from 'material-ui/svg-icons/communication/import-contacts';
import Fordessertkit from 'material-ui/svg-icons/av/library-books';
import ForCashier from 'material-ui/svg-icons/editor/attach-money';
import AddMenu from 'material-ui/svg-icons/content/add-circle-outline';
import Chart from 'material-ui/svg-icons/editor/insert-chart';
import { Redirect } from 'react-router'
// import './App.css';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import urlencode from "form-urlencoded";


import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import CloseIcon from "material-ui/svg-icons/navigation/close"
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import axios from './AxiosConfiguration';
import AppBar from 'material-ui/AppBar';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import AddIcon from "material-ui/svg-icons/content/add-circle"
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import AutoComplete from 'material-ui/AutoComplete';


import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';

function Bar({onClick, onClick_2}) {
    return(
        <AppBar
            title="Manage Table"
            iconElementLeft={
                <IconButton onClick={onClick}>
                    <BackIcon/>
                </IconButton>}
            iconElementRight={<RaisedButton
                label="Log Out"
                primary={true}
                onClick={onClick_2}
                buttonStyle={{backgroundColor:"#e99833"}}
            />}
            style={{backgroundColor: "#D50000"}}
        />
    );
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



class AdminManageExercise extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: "",
            open: false,
            open_2: false,
            open_3: false,
            data: [],
            data2: [],
            iam: "",
            eiei: [],
            disable: true,
        };
    }

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
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen_2 = () => {
        this.setState({open_2: true});
    };

    handleClose_2 = () => {
        this.setState({open_2: false});
    };

    handleOpen_3 = () => {
        this.setState({open_3: true});
    };

    handleClose_3 = () => {
        this.setState({open_3: false});
    };

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
        this.handleClose();
        this.handleOpen_3();

        this.setState({topic: ""});
        this.setState({question: ""});
        this.setState({ca: ""});
        this.setState({cb: ""});
        this.setState({cc: ""});
        this.setState({cd: ""});
        this.setState({value: ""});

    }

    makeExercise_2 = () =>{
        var data2 = {
            topic: this.state.topic,
            question: this.state.question,
            choiceA: this.state.ca,
            choiceB: this.state.cb,
            choiceC: this.state.cc,
            choiceD: this.state.cd,
            correct: this.state.value
        };

        console.log("Make Old Exercise");
        console.log(data2);
        axios.post(`/post_old_topic`, data2)
            .then((response) => {
                console.log(response)


            })
            .catch((error) => {
                console.log(error)
            });
        this.handleClose_2();
        this.setState({open_3: true});

    }


    fetchData = () => {
        var ll = [];
        console.log("fetch")
        axios.get("/topic_item")
            .then((response) => {
                this.setState({data: response.data})
                this.state.data.map((each) => {
                    ll.push(each.topic)
                })
                this.setState({eiei: ll});
                console.log(this.state.eiei)

                // this.state.data.map((each) => {
                //         console.log(each.id);
                //     }
                // )
            })
            .catch((error) => {
                console.log(error)
            })
    };

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

    // checkButtonDisable = () => {
    //     if (this.state.topic === "" && this.state.question === "" && this.state.ca === "" && this.state.cb === "" && this.state.cc === "" && this.state.cd === "" && this.state.value === "") {
    //         console.log("False")
    //         this.setState({disable: false})
    //     }
    //     else{
    //         this.setState({disable: true})
    //         console.log("Still True")
    //     }
    // };



    handleChange = (event, index, value) => {
        this.setState({value}, () => this.checkButtonDisable());
        console.log(this.state.value)
    };



    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                backgroundColor="#F44336"
                onClick={this.handleClose}
                style={{float:"left"}}
            />,
            <FlatButton
                label="Save"
                backgroundColor="#8BC34A"
                // disabled={true}
                disabled={this.state.disable}
                onClick={()=> this.makeExercise_1()}
            />,
        ];

        const actions_2 = [
            <FlatButton
                label="Cancel"
                backgroundColor="#F44336"
                onClick={this.handleClose_2}
                style={{float:"left"}}
            />,
            <FlatButton
                label="Save"
                backgroundColor="#8BC34A"
                disabled={this.state.disable}
                onClick={()=> this.makeExercise_2()}
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
            <div>
                {/*<Bar onClick={()=>this.props.history.push('/mainmenuadmin')}/>*/}
                <AppBar
                    title="Manage Exercises"
                    iconElementLeft={
                        <IconButton onClick={()=>this.props.history.push('/mainmenuadmin')}>
                            <BackIcon/>
                        </IconButton>}
                    iconElementRight={<RaisedButton
                        label="Log Out"
                        primary={true}
                        onClick={this.sendRequest}
                        buttonStyle={{backgroundColor:"#e99833"}}
                    />}
                    style={{backgroundColor: "#D50000"}}
                />

                <div class="center">
                    <h4 style={{textAlign: "center"}}> MANAGE EXERCISES </h4>
                    <List>
                        <ListItem primaryText="Create New Question With 'New Topic'" leftIcon={<ForTable />} onClick={this.handleOpen}/>
                        <ListItem primaryText="Create New Question With 'Existed Topic'" leftIcon={<ForKit />} onClick={this.handleOpen_2}/>
                        <ListItem primaryText="List of Exercises" leftIcon={<Fordessertkit />} onClick={()=>this.props.history.push('/admin_list_of_exercise')}/>
                        {/*<ListItem primaryText="Cashier" leftIcon={<ForCashier />} onClick={()=>this.props.history.push('/cashier')}/>*/}
                        {/*<ListItem primaryText="Menu Management"*/}
                        {/*leftIcon={<AddMenu />}*/}
                        {/*disabled={this.state.role === "staff"}*/}
                        {/*onClick={()=>this.props.history.push('/manage')}*/}
                        {/*/>*/}
                        {/*<ListItem primaryText="Sale Report"*/}
                        {/*leftIcon={<Chart />}*/}
                        {/*disabled={this.state.role === "staff"}*/}
                        {/*onClick={()=>this.props.history.push('/saleReport')}*/}
                        {/*/>*/}
                    </List>
                </div>

                <Dialog
                    title="Create New Question With 'New Topic'"
                    modal={true}
                    open={this.state.open}
                    actions={actions}
                    titleStyle={{backgroundColor:"#D50000", color:"white"}}
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

                {/********************************************************************************************/}
                {/********************************************************************************************/}
                {/********************************************************************************************/}
                {/********************************************************************************************/}
                {/********************************************************************************************/}
                {/********************************************************************************************/}


                <Dialog
                    title="Create New Question With 'Existed Topic'"
                    modal={true}
                    open={this.state.open_2}
                    actions={actions_2}
                    titleStyle={{backgroundColor:"#D50000", color:"white"}}
                    contentStyle={{ width: '30%',}}
                    autoScrollBodyContent={true}
                >
                    <br />



                    <AutoComplete
                        floatingLabelText="Choose existed topic."
                        style={{marginLeft:"20px"}}
                        filter={AutoComplete.caseInsensitiveFilter}
                        // value={this.state.topic}
                        searchText={this.state.topic}
                        // onChange={(e)=> this.updateTopic(e)}
                        onUpdateInput ={(e)=> this.setState({topic: e})}

                        dataSource={this.state.eiei}
                        autoScrollBodyContent={true}
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

                    {/*<DropDownMenu value={this.state.value} onChange={this.handleChange}>*/}
                    {/*<MenuItem value={1} primaryText="Food" />*/}
                    {/*<MenuItem value={2} primaryText="Dessert" />*/}
                    {/*</DropDownMenu>*/}

                </Dialog>

                <Dialog
                    title="Successfully Added"
                    actions={actions_3}
                    modal={false}
                    open={this.state.open_3}
                    onRequestClose={this.handleClose}
                >
                    {/*Are you sure to delete all the questions that belong to this topic?*/}
                </Dialog>
            </div>
        );
    }
}

export default AdminManageExercise;
