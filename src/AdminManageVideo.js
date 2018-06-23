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

import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';

function Bar({onClick, onClick_2}) {
    return(
        <AppBar
            title="Manage Video"
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



class AdminManageVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: "",
            iam: "",
            open: false,
        };
    }

    componentDidMount() {
        axios.get(`/user/whoami`)
            .then((response) => {
                // console.log("this is check")
                console.log(response.data);
                if(response.data === "admin"){
                    console.log("this is admin id")
                    this.setState({role: response.data})
                    this.setState({iam: response.data})
                    console.log(this.state.role)
                    console.log(this.state.iam)
                    // this.props.history.push('/menu')
                }
                else {
                    this.props.history.push('/')
                }
                // this.setState({role: response.data})
            })
            .catch((error) => {
                console.log(error)
                this.props.history.push('/')
            })
    }
    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result}, () => this.checkButtonDisable());
        };

        reader.readAsDataURL(file)
    };

    sendRequest = () => {
        // console.log(this.state.value)
        const data = new FormData();
        // const data = {name: this.state.name,
        //   price: this.state.email};
        data.append('topic', this.state.name);
        data.append('description', this.state.description);
        data.append('file', this.state.file);

        // console.log(data);
        axios.post("/video/upload", data)
            .then((response) => {
                this.setState({open: false});
                this.setState({name: ""});
                this.setState({description: ""});
                this.setState({file: ""});
                console.log(response);
            })
            .catch((error) => {
                console.log(error)
            })
    };

    updateName = (e) => {
        this.setState({name: e.target.value}, () => this.checkButtonDisable());
    };

    updateDescription = (i) => {
        this.setState({description: i.target.value}, () => this.checkButtonDisable());
    };

    checkButtonDisable = () => {
        if (this.state.name != "" && this.state.price != "" && this.state.file != "") {
            this.setState({disable: false})
        }
        else{
            this.setState({disable: true})
        }
    };

    handleChange = (event, index, value) => this.setState({value});

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
                disabled={this.state.disable}
                onClick={()=> this.sendRequest()}
            />,
        ];

        // if (localStorage.getItem("login") != "true") {
        //   return <Redirect to='/'/>;
        // }

        return (
            <div>
                {/*<Bar onClick={()=>this.props.history.push('/mainmenuadmin')}/>*/}
                <AppBar
                    title="Manage Videos"
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
                {/*<AppBar*/}

                {/*title="Welcome, Admin"*/}
                {/*showMenuIconButton={false}*/}
                {/*style={{backgroundColor: "#D50000"}}*/}
                {/*iconElementLeft={*/}
                {/*<IconButton onClick={()=>this.props.history.push('/mainmenuadmin')}>*/}
                {/*<BackIcon/>*/}
                {/*</IconButton>}*/}
                {/*iconElementRight={<RaisedButton*/}
                {/*label="Log Out"*/}
                {/*primary={true}*/}
                {/*onClick={this.sendRequest}*/}
                {/*buttonStyle={{backgroundColor:"#e99833"}}*/}
                {/*/>}*/}

                {/*/>*/}
                <div class="center">
                    <h4 style={{textAlign: "center"}}> MANAGE VIDEOS </h4>
                    <List>
                        <ListItem primaryText="Upload New Video" leftIcon={<ForTable />} onClick={this.handleOpen}/>
                        {/*<ListItem primaryText="Create New Question With 'Existed Topic'" leftIcon={<ForKit />} onClick={()=>this.props.history.push('/admin_manage_exercise')}/>*/}
                        <ListItem primaryText="List of Videos" leftIcon={<Fordessertkit />} onClick={()=>this.props.history.push('/admin_list_of_students')}/>
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
                    title="Upload New Video."
                    modal={true}
                    open={this.state.open}
                    actions={actions}
                    titleStyle={{backgroundColor:"#D50000", color:"white"}}
                    contentStyle={{ width: '30%',}}
                    autoScrollBodyContent={true}
                >
                    <br />
                    <input type="file"
                           style={{marginLeft:"20px"}}
                        // style={styles.exampleImageInput}
                           onChange={(e) => this.handleImageChange(e)}
                    />
                    {/* </RaisedButton> */}
                    <br />
                    <TextField
                        style={{marginLeft:"20px"}}
                        floatingLabelText="Topic"
                        value={this.state.name}
                        onChange={(e)=> this.updateName(e)}
                        underlineFocusStyle={styles.underlineStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                    <br />
                    <TextField
                        style={{marginLeft:"20px"}}
                        floatingLabelText="Description"
                        value={this.state.description}
                        onChange={(i)=> this.updateDescription(i)}
                        underlineFocusStyle={styles.underlineStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                    <br />
                    {/*<Checkbox*/}
                    {/*label="A"*/}
                    {/*style={styles.checkbox}*/}
                    {/*/>*/}

                    {/*<TextField*/}
                        {/*style={{marginLeft:"20px"}}*/}
                        {/*floatingLabelText="Choice A"*/}
                        {/*value={this.state.name}*/}
                        {/*onChange={(e)=> this.updateName(e)}*/}
                        {/*underlineFocusStyle={styles.underlineStyle}*/}
                        {/*floatingLabelFocusStyle={styles.floatingLabelFocusStyle}*/}
                    {/*/>*/}
                    {/*<br />*/}
                    {/*<TextField*/}
                        {/*style={{marginLeft:"20px"}}*/}
                        {/*floatingLabelText="Choice B"*/}
                        {/*value={this.state.name}*/}
                        {/*onChange={(e)=> this.updateName(e)}*/}
                        {/*underlineFocusStyle={styles.underlineStyle}*/}
                        {/*floatingLabelFocusStyle={styles.floatingLabelFocusStyle}*/}
                    {/*/>*/}
                    {/*<br />*/}

                    {/*<TextField*/}
                        {/*style={{marginLeft:"20px"}}*/}
                        {/*floatingLabelText="Choice C"*/}
                        {/*value={this.state.name}*/}
                        {/*onChange={(e)=> this.updateName(e)}*/}
                        {/*underlineFocusStyle={styles.underlineStyle}*/}
                        {/*floatingLabelFocusStyle={styles.floatingLabelFocusStyle}*/}
                    {/*/>*/}
                    {/*<br />*/}
                    {/*<TextField*/}
                        {/*style={{marginLeft:"20px"}}*/}
                        {/*floatingLabelText="Choice D"*/}
                        {/*value={this.state.name}*/}
                        {/*onChange={(e)=> this.updateName(e)}*/}
                        {/*underlineFocusStyle={styles.underlineStyle}*/}
                        {/*floatingLabelFocusStyle={styles.floatingLabelFocusStyle}*/}
                    {/*/>*/}
                    {/*<br />*/}
                    {/*<SelectField*/}
                        {/*floatingLabelText="Choose the correct answer."*/}
                        {/*value={this.state.value}*/}
                        {/*onChange={this.handleChange}*/}
                        {/*style={{marginLeft:"20px"}}*/}
                    {/*>*/}
                        {/*<MenuItem value={1} primaryText="Choice A" />*/}
                        {/*<MenuItem value={2} primaryText="Choice B" />*/}
                        {/*<MenuItem value={3} primaryText="Choice C" />*/}
                        {/*<MenuItem value={4} primaryText="Choice D" />*/}
                        {/*/!*<MenuItem value={5} primaryText="Weekly" />*!/*/}
                    {/*</SelectField>*/}
                    {/*<br />*/}
                    {/*<DropDownMenu value={this.state.value} onChange={this.handleChange}>*/}
                    {/*<MenuItem value={1} primaryText="Food" />*/}
                    {/*<MenuItem value={2} primaryText="Dessert" />*/}
                    {/*</DropDownMenu>*/}
                </Dialog>
            </div>
        );
    }
}

export default AdminManageVideo;
