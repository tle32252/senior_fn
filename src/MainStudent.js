import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import ForTable from 'material-ui/svg-icons/av/music-video';
import ForDone from 'material-ui/svg-icons/action/done-all';
import ForKit from 'material-ui/svg-icons/communication/import-contacts';
import Fordessertkit from 'material-ui/svg-icons/action/supervisor-account';
import Formoney from 'material-ui/svg-icons/editor/attach-money';
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
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';




class MainStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: "",
            iam: "",
            token: "",
            open: false,
            open_2: false,
        };
    }

    componentDidMount(){
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

                console.log("this is student id")
                this.setState({role: response.data})
                this.setState({iam: response.data})
                console.log(this.state.role)
                console.log(this.state.iam)

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

        // const { OmiseCard }  = window;
        // OmiseCard.configure({
        //     publicKey: 'pkey_test_5brcmnpnbk98pwnizcv',
        //     amount: 10000,
        //     image: 'https://i.imgur.com/FjBMpPM.jpg',
        //     onCreateTokenSuccess: (x) => {
        //         this.setState({token: x})
        //         this.onSubmit();
        //     },
        //     submitAuto: 'no'
        //
        // });
        // OmiseCard.configureButton('#checkout-button', {
        //     frameLabel: 'Max Toeic',
        //     submitLabel: 'PAY NOW ',
        //     submitFormTarget: '#checkout-form'
        // });
        //
        // OmiseCard.attach();
    }

    // componentDidMount() {
    //     axios.get(`/user/whoami`)
    //         .then((response) => {
    //             console.log("this is check")
    //             console.log(response.data);
    //             if(response.data === "table"){
    //                 this.props.history.push('/menu')
    //             }
    //             this.setState({role: response.data})
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             this.props.history.push('/')
    //         })
    // }

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

    // $("#checkout-button").submit(function(e){
    //     return false;
    // });

    onClickOmise = () => {
        console.log('haha')

        // $("#checkout-button").submit(function(e){
        //     return false;
        // });

        var bodyFormData = new FormData();


        // var payOmise = {
        //     omiseToken: this.state.username,
        //     omiseSource: this.state.password,
        // }

        // e.preventDefault();
        bodyFormData.set('omiseToken', '');
        bodyFormData.set('omiseSource', '');

        axios({
            method: 'Post',
            url: 'http://localhost:8080/user/omiseCharge',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });


        // axios.post("/user/omiseCharge")
        //     .then((response) => {
        //         console.log("Omiseeee")
        //         console.log(response)
        //         // this.props.history.push('/')
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })

    }

    onSubmit = () => {
        console.log(this.state.token)
        axios.post(`/user/omiseCharge?omisetoken=${this.state.token}&username=${this.state.iam}`)
            .then((response) => {
                console.log("Check validate")
                console.log(response)
                if (response.data === "OK"){
                    this.handleOpen();
                }
                else if (response.data === "BAD"){
                    this.handleOpen_2() ;
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    onClickTest = () => {
        console.log("1")
        axios.post("/user/test")
            .then((response) => {
                console.log("Omiseeee")
                console.log(response)
                // this.props.history.push('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleOpen = () => {
        this.setState({open: true});
        // console.log(this.state.wantdelete)

    };

    handleOpen_2 = () => {
        // console.log(eiei)

        // this.setState({wantdeleteQuestion: eiei})
        this.setState({open_2: true});
        // console.log(this.state.wantdelete)

    };

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



    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />,
        ];
        const actions_2 = [
            <FlatButton
                label="Close"
                secondary={true}
                onClick={this.handleClose_2}
            />,
        ];


        // if (localStorage.getItem("login") != "true") {
        //   return <Redirect to='/'/>;
        // }

        return (
            <div>
                <AppBar
                    title="Welcome, Student"
                    showMenuIconButton={false}
                    style={{backgroundColor: "#D50000"}}
                    iconElementRight={<RaisedButton
                        label="Log Out"
                        primary={true}
                        onClick={this.sendRequest}
                        buttonStyle={{backgroundColor:"#e99833"}}
                    />}
                />
                <div class="center">
                    <h4> PLEASE CHOOSE YOUR ACTION </h4>
                    <List>
                        <ListItem primaryText="Videos" leftIcon={<ForTable />}  onClick={()=>this.props.history.push('/student_choose_video')}/>
                        <ListItem primaryText="Exercises" leftIcon={<ForKit />} onClick={()=>this.props.history.push('/student_choose_exercise')}/>
                        {/*<ListItem primaryText="Done Exercises" leftIcon={<ForDone />} onClick={()=>this.props.history.push('/student_done')}/>*/}
                        {/*<ListItem primaryText="Course Details" leftIcon={<Fordessertkit />} onClick={()=>this.props.history.push('/admin_list_of_students')}/>*/}


                        {/*<ListItem primaryText="Pay The Course"  disabled={false}  leftIcon={<Formoney />} type="submit" value="Pay The Course." id="checkout-button"/>*/}
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


                        {/*<form*/}
                            {/*onSubmit = {(e) => this.onSubmit(e)}*/}
                            {/*id="checkout-form"*/}
                            {/*name="checkoutForm"*/}
                            {/*method="POST"*/}

                            {/*action="http://localhost:8080/user/omiseCharge"  >*/}
                            {/*<ListItem*/}
                                {/*hidden={true}*/}
                                {/*primaryText="Pay The Course"*/}
                                {/*disabled={false}*/}
                                {/*leftIcon={<Formoney/>}*/}
                                {/*type="submit"*/}
                                {/*value="Pay The Course."*/}
                                {/*id="checkout-button" />*/}
                        {/*</form>*/}


                        {/*<form name="checkoutForm" method="POST" action="checkout.php" >*/}
                            {/*<input type="submit" disabled value="Pasdyyy" id="checkout-button"/>*/}
                        {/*</form>*/}



                    </List>
                </div>

                <Dialog
                    title="Payment Success "
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    You can now start view our course.
                </Dialog>

                <Dialog
                    title="Payment Fail "
                    actions={actions_2}
                    modal={false}
                    open={this.state.open_2}
                    onRequestClose={this.handleClose}
                >
                    There is something wrong. Please check your card and try again.
                </Dialog>

            </div>
        );
    }
}

export default MainStudent;