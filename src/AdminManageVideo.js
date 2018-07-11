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
import LinearProgress from 'material-ui/LinearProgress';


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
        borderColor: "#673630",
    },
    floatingLabelStyle: {
        color: "#673630",
    },
    floatingLabelFocusStyle: {
        color: "#673630",
    },
};



class AdminManageVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: "",
            iam: "",
            open: false,
            open_3: false,
            progress: 0,
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
                    this.checkButtonDisable();
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



    upload(files) {
        const config = {
            onUploadProgress: function(progressEvent) {
                var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                console.log(percentCompleted)
            }
        }

        let data = new FormData()
        data.append('file', files[0])

        axios.put('/endpoint/url', data, config)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    sendRequest = () => {
        // console.log(this.state.value)
        const data = new FormData();
        // const data = {name: this.state.name,
        //   price: this.state.email};
        data.append('topic', this.state.name);
        data.append('description', this.state.description);
        data.append('file', this.state.file);
        this.setState({open: false});

        let config = {
            onUploadProgress: progressEvent => {
                let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                console.log(percentCompleted)
                this.setState({progress: percentCompleted});
                // do whatever you like with the percentage complete
                // maybe dispatch an action that will update a progress bar or something
            }
        }

        // console.log(data);
        axios.post("/video/upload", data,config)
            .then((response) => {
                this.setState({open_3: true});
                this.setState({name: ""});
                this.setState({description: ""});
                this.setState({file: ""});
                console.log(response);
                console.log("complete");

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
        if (this.state.name != null && this.state.description != null && this.state.file != null) {
            this.setState({disable: false})
        }
        else{
            this.setState({disable: true})
        }
    };

    handleOpen_3 = () => {
        this.setState({open_3: true});
    };

    handleClose_3 = () => {
        this.setState({open_3: false});
        this.setState({progress: 0});
        // window.location.reload();
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

    handleChange = (event, index, value) => this.setState({value});

    render() {
        const actions_3 = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose_3}
            />,

        ];


        const actions = [
            <FlatButton
                label="Cancel"
                backgroundColor="#C98134"
                onClick={this.handleClose}
                style={{float:"left"}}
            />,
            <FlatButton
                label="Upload"
                backgroundColor="#DABD97"
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
                        onClick={this.sendRequest_2}
                        buttonStyle={{backgroundColor:"#e99833"}}
                        style={{marginTop:"5px"}}
                    />}
                    style={{backgroundColor: "#986d51"}}
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

                {/*<div className="W5-animate-bottom-text">*/}
                    <div className="center">
                        <h4 style={{textAlign: "center"}}> MANAGE VIDEOS </h4>
                        <List>
                            <ListItem primaryText="Upload New Video" leftIcon={<ForTable/>} onClick={this.handleOpen}/>
                            {/*<ListItem primaryText="Create New Question With 'Existed Topic'" leftIcon={<ForKit />} onClick={()=>this.props.history.push('/admin_manage_exercise')}/>*/}
                            <ListItem primaryText="List of Videos" leftIcon={<Fordessertkit/>}
                                      onClick={() => this.props.history.push('/admin_list_of_video')}/>
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

                {/*</div>*/}

                <Dialog
                    title="Upload New Video."
                    modal={true}
                    open={this.state.open}
                    actions={actions}
                    titleStyle={{backgroundColor:"#986d51", color:"white"}}
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
                <Dialog
                    title="Successfully Added"
                    actions={actions_3}
                    modal={false}
                    open={this.state.open_3}
                    onRequestClose={this.handleClose}
                >
                    {/*Are you sure to delete all the questions that belong to this topic?*/}
                </Dialog>

                <LinearProgress mode="determinate" color={"#E9F800"} value={this.state.progress} open={false} style={{Color:"#D25FDB",}} />
            </div>
        );
    }
}

export default AdminManageVideo;
