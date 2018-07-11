import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import ForTable from 'material-ui/svg-icons/av/music-video';
import ForKit from 'material-ui/svg-icons/communication/import-contacts';
import Fordessertkit from 'material-ui/svg-icons/social/people';
import Fordone from 'material-ui/svg-icons/action/done-all';
import ForCashier from 'material-ui/svg-icons/editor/attach-money';
import AddMenu from 'material-ui/svg-icons/content/add-circle-outline';
import Chart from 'material-ui/svg-icons/editor/insert-chart';
import { Redirect } from 'react-router'
// import './App.css';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import urlencode from "form-urlencoded";
import axios from "./AxiosConfiguration";





class MainMenuAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: "",
            iam: "",
        };
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

    render() {

        // if (localStorage.getItem("login") != "true") {
        //   return <Redirect to='/'/>;
        // }

        return (
            <div>
                <AppBar
                    title="Welcome, Admin"
                    showMenuIconButton={false}
                    style={{backgroundColor: "#986d51"}}
                    iconElementRight={<RaisedButton
                        label="Log Out"
                        primary={true}
                        onClick={this.sendRequest}
                        buttonStyle={{backgroundColor:"#e99833"}}
                        style={{marginTop:"5px"}}
                    />}
                />
                <div class="center">
                    <h4> PLEASE CHOOSE YOUR ACTION </h4>
                    <List>
                        <ListItem primaryText="Manage Videos" leftIcon={<ForTable />} onClick={()=>this.props.history.push('/admin_manage_video')}/>
                        <ListItem primaryText="Manage Exercises" leftIcon={<ForKit />} onClick={()=>this.props.history.push('/admin_list_of_exercise')}/>
                        <ListItem primaryText="List of Students" leftIcon={<Fordessertkit />} onClick={()=>this.props.history.push('/admin_list_of_students')}/>
                        {/*<ListItem primaryText="Students Exercise Results" leftIcon={<Fordone />} onClick={()=>this.props.history.push('/all_done_exercise')}/>*/}

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
            </div>
        );
    }
}

export default MainMenuAdmin;
