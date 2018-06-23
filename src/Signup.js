import React, { Component } from 'react';
import './Signup.css';
import TextField from 'material-ui/TextField';
import axios from './AxiosConfiguration';
import urlencode from 'form-urlencoded'
import RaisedButton from 'material-ui/RaisedButton';


function UsernameField({onChange, onKeyPress}){
    return (<TextField
        fullWidth={true}
        // hintText="Username"
        floatingLabelText="Username"
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
    />)
}

function PasswordField({onChange, onKeyPress}){
    return (<TextField
        fullWidth={true}
        hintText="Must be at least 6 characters."
        floatingLabelText="Password"
        type="password"
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
    />)
}

function ConfirmPasswordField({onChange, onKeyPress}){
    return (<TextField
        fullWidth={true}
        hintText="Must be at least 6 characters."
        floatingLabelText="Confirm Password"
        type="password"
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
    />)
}

function NameField({onChange, onKeyPress}){
    return (<TextField
        fullWidth={true}
        // hintText="Must be at least 6 characters."
        floatingLabelText="Name"
        // type="password"
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
    />)
}

function LineField({onChange, onKeyPress}){
    return (<TextField
        fullWidth={true}
        hintText="LineId"
        floatingLabelText="Line"
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
    />)
}

function EmailFeild({onChange, onKeyPress}){
    return (<TextField
        fullWidth={true}
        hintText="Email"
        floatingLabelText="Email"
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
    />)
}

function NationalIdField({onChange, onKeyPress}){
    return (<TextField
        fullWidth={true}
        // hintText="Username"
        floatingLabelText="National Id Card Number"
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
    />)
}



// function LoginButton({onClick}){
//     return (<RaisedButton label="Login"
//                           fullWidth={true}
//                           secondary={true}
//                           onClick={onClick}
//     />)
// }

function SignupButton({onClick}){
    return (<RaisedButton label="Signup"
                          fullWidth={true}
                          // primary={true}
                          onClick={onClick}
                          secondary={true}
    />)
}

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            show: false,
            nationalID: "",
            name:"",
            line:"",
            email:""
        };
    }



    sendRequest = () => {
        var loginParams = {
            username: this.state.username,
            password: this.state.password,
            repeatPassword: this.state.confpassword,
            role: "student",
            name: this.state.name,
            line: this.state.line,
            email: this.state.email,
            status: "Unpaid",
        }

        console.log(this.state.email);

        console.log('loginparam', urlencode(loginParams))
        axios.post("/user/register", urlencode(loginParams))
            .then((response) => {
                localStorage.setItem("role", response.data.role)
                localStorage.setItem("id", response.data.id)
                console.log("Regis Success")
                console.log(response.data);

                //
                if (response.data.role === "student"){
                    this.props.history.push('/mainstudent');
                }
                // else{
                //     this.props.history.push('/mainmenu');
                // }
            })
            .catch((error) => {
                console.log(error)
                this.setState({show: true})
                // console.log(authentication);
            })
    }

    onUsernameChange = (username) =>{

        this.setState({username})
    }

    onPasswordChange = (password) => {
        this.setState({password})
    }

    onConfirmPasswordChange = (confpassword) => {
        this.setState({confpassword})
    }

    onNameChange = (name) => {
        this.setState({name})
    }

    onLineChange = (line) => {
        this.setState({line})
    }

    onEmailChange = (email) => {
        this.setState({email})
    }



    onEnterpress = (e) => {
        if (e.charCode == 13) {
            this.sendRequest()
        }
    }

    onNumberType = (e) => {
        console.log(!isNaN(e.target.value));
        if(!isNaN(e.target.value)){
            this.setState({nationalID: e.target.value});
        }
    }

    render() {
        return (
            <div>
                <div className="center">
                    {/*<div className="cen2">*/}
                    <h4 style={{textAlign: "center"}}> SIGNUP TO ACCESS MAXTOEIC</h4>
                    {/*<br/>*/}
                    <div style={{ display: (this.state.show ? 'block' : 'none'), color: "red" }}>Error</div>
                    <UsernameField
                        onChange={this.onUsernameChange}
                        onKeyPress={this.onEnterpress}
                    />
                    {/*<br />*/}
                    <PasswordField
                        onChange={this.onPasswordChange}
                        onKeyPress={this.onEnterpress}
                    />

                    <ConfirmPasswordField
                        onChange={this.onConfirmPasswordChange}
                        onKeyPress={this.onEnterpress}
                    />
                    {/*<br />*/}
                    {/*<br />*/}
                    <NameField
                        onChange={this.onNameChange}
                        onKeyPress={this.onEnterpress}
                    />

                    <LineField
                        onChange={this.onLineChange}
                        onKeyPress={this.onEnterpress}
                    />

                    <EmailFeild
                        onChange={this.onEmailChange}
                        onKeyPress={this.onEnterpress}
                    />

                    {/*<NationalIdField*/}
                        {/*onChange={this.onNumberType}*/}
                        {/*// onKeyPress={this.onNumberType()}*/}
                    {/*/>*/}
                    {/*<TextField*/}
                        {/*floatingLabelText="National Id Card Number"*/}
                        {/*value={this.state.nationalID}*/}
                        {/*onChange={(e) => this.onNumberType(e)}*/}
                        {/*fullWidth={true}*/}
                        {/*// onKeyPress ={(e)=> this.handleTest(e)}*/}
                    {/*/>*/}



                    {/*<br />*/}
                    {/*<br />*/}

                    {/*<LoginButton onClick={this.sendRequest}/>*/}

                    <br />
                    <br />
                    <SignupButton onClick={this.sendRequest} disabled={true}/>

                    {/*</div>*/}
                </div>
            </div>
        );
    }

    // handleChange = name => event => {
    //     //     this.setState({
    //     //         [name]: event.target.value,
    //     //     });
    //     // }



    // render() {
    //     return (
    //         <div>
    //             <h1>Log in</h1>
    //             <form onSubmit={this.onSubmit}>
    //                 <input value={this.state.email} type="text" placeholder="Email"></input>
    //                 <input value={this.state.password} type="password" placeholder="Password"></input>
    //                 <button type="submit">Log in</button>
    //             </form>
    //         </div>
    //     );
    //
    // }


}

export default App;