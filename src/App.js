import React, { Component } from 'react';
import './App.css';
import TextField from 'material-ui/TextField';
import axios from './AxiosConfiguration';
import urlencode from 'form-urlencoded'
import RaisedButton from 'material-ui/RaisedButton';


function UsernameField({onChange, onKeyPress}){
    return (<TextField
        fullWidth={true}
        hintText="Username"
        floatingLabelText="Username"
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
    />)
}

function PasswordField({onChange, onKeyPress}){
    return (<TextField
        fullWidth={true}
        hintText="Password"
        floatingLabelText="Password"
        type="password"
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
    />)
}



function LoginButton({onClick}){
    return (<RaisedButton label="Login"
                          fullWidth={true}
                          secondary={true}
                          onClick={onClick}
    />)
}

function SignupButton({onClick}){
    return (<RaisedButton label="Signup"
                          fullWidth={true}
                          primary={true}
                          onClick={onClick}
                          // secondary={true}
    />)
}

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            show: false,
        };
    }

    eachstudent = () => {
        axios.get(`/user/each_student_login?username=${this.state.username}`)
            // console.log("hello")
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    sendRequest = () => {
        var loginParams = {
            username: this.state.username,
            password: this.state.password
        }

        // console.log('loginparam', urlencode(loginParams))
        axios.post("/login", urlencode(loginParams))
            .then((response) => {
                // localStorage.setItem("role", response.data.role)
                // localStorage.setItem("id", response.data.id)
                console.log(response.data);
                // console.log("be4 func")
                // this.eachstudent();
                // axios.get(`/each_student_login?username=${this.state.username}`)
                //     console.log("helloooo")
                //     .then((response) => {
                //         console.log(response)
                //     })

                if (response.data.role === "admin" ){
                    this.props.history.push('/mainmenuadmin');
                }
                else{

                    this.props.history.push('/mainstudent');
                }

            })
            .catch((error) => {
                console.log(error)
                this.setState({show: true})
                // console.log(authentication);
            })
    }
    sendRequest_2 = () => {
        this.props.history.push('/signup')
    }


    onUsernameChange = (username) =>{

        this.setState({username})
    }

    onPasswordChange = (password) => {
        this.setState({password})
    }

    onEnterpress = (e) => {
        if (e.charCode == 13) {
            this.sendRequest()
        }
    }

    // componentDidMount(){
    //     const { OmiseCard }  = window;
    //     OmiseCard.configure({
    //         publicKey: 'pkey_test_5brcmnpnbk98pwnizcv',
    //         amount: 1000,
    //         image: 'https://i.imgur.com/FjBMpPM.jpg'
    //     });
    //
    //     OmiseCard.configureButton('#checkout-button', {
    //         frameLabel: 'Max Toeic',
    //         submitLabel: 'PAY RIGHT NOW ',
    //     });
    //
    //     OmiseCard.attach();
    // }

    render() {
        return (
            <div>
                <div className="W5-animate-bottom-text">
                    <div className="center">
                        {/*<div className="cen2">*/}
                        <h4> LOGIN TO ACCESS YOUR MAX TOEIC ACCOUNT</h4>
                        <br/>
                        <div style={{ display: (this.state.show ? 'block' : 'none'), color: "red" }}>Wrong username or password</div>
                        <UsernameField
                            onChange={this.onUsernameChange}
                            onKeyPress={this.onEnterpress}
                        />
                        <br />
                        <PasswordField
                            onChange={this.onPasswordChange}
                            onKeyPress={this.onEnterpress}
                        />
                        <br />
                        <br />

                        <LoginButton onClick={this.sendRequest}/>

                        <br />
                        <br />
                        <SignupButton onClick={this.sendRequest_2}/>

                        {/*<form id="checkout-form" action="/checkout.php" method="POST">*/}

                        {/*<input type="hidden" name="omiseToken" />*/}

                        {/*<div>*/}
                        {/*<label>Card Number</label>*/}
                        {/*<input type="text" data-name="cardNumber" placeholder="••••••••••••••••" />*/}
                        {/*</div>*/}

                        {/*<div>*/}
                        {/*<label>Name on card</label>*/}
                        {/*<input type="text" data-name="nameOnCard" placeholder="Full Name" />*/}
                        {/*</div>*/}

                        {/*<div>*/}
                        {/*<label>Expiry date</label>*/}
                        {/*<select data-name="expiryMonth">*/}
                        {/*<option value="">MM</option>*/}
                        {/*<option value="1">1</option>*/}
                        {/*<option value="12">12</option>*/}
                        {/*</select>*/}

                        {/*<select data-name="expiryYear">*/}
                        {/*<option value="">YYYY</option>*/}
                        {/*<option value="2017">2017</option>*/}
                        {/*<option value="2025">2025</option>*/}
                        {/*</select>*/}
                        {/*</div>*/}

                        {/*<div>*/}
                        {/*<label>Security code</label>*/}
                        {/*<input type="text" data-name="securityCode" placeholder="123" />*/}
                        {/*</div>*/}

                        {/*<div>*/}
                        {/*<button>Checkout</button>*/}
                        {/*</div>*/}
                        {/*</form>*/}

                        {/*<script src="https://cdn.omise.co/omise.js"></script>*/}

                        {/*<script src="app.js"></script>*/}
                        {/*</div>*/}
                        {/*<form name="checkoutForm" method="POST" action="checkout.php" >*/}
                        {/*<input type="submit" value="Pasdyyy" id="checkout-button"/>*/}
                        {/*</form>*/}
                        {/*<form className="checkout-form" name="checkoutForm" method="POST" action="/checkout">*/}
                        {/*<script type="text/javascript" src="https://cdn.omise.co/omise.js"*/}
                        {/*data-key="YOUR_PUBLIC_KEY"*/}
                        {/*data-amount="10025"*/}
                        {/*data-button-label="Click to see an example">*/}
                        {/*</script>*/}
                        {/*</form>*/}
                    </div>

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