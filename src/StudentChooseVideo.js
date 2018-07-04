import React from 'react';
import axios from './AxiosConfiguration'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import Forvid from 'material-ui/svg-icons/notification/ondemand-video';



import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';

import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

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
            title="Video Lists Available"
            iconElementLeft={
                <IconButton onClick={onClick}>
                    <BackIcon/>
                </IconButton>}
            style={{backgroundColor: "#D50000"}}
        />
    );
}

function LoginButton({onClick}){
    return (<RaisedButton label="Watch this"
                          fullWidth={false}
                          primary={true}
                          onClick={onClick}
                          icon={<Forvid />}
    />)
}


class StudentChooseVideo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCheckboxes: false,
            data: [],
            secondsElapsed: 0,
            role: "",
            iam: "",
        }
        this.tick  = this.tick.bind(this)
    }

    tick = () => {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
        this.fetchData();
    }

    componentDidMount(){
        axios.get(`/user/whoami`)
            .then((response) => {
                // console.log("this is check")
                console.log(response)
                console.log(response.data);

                console.log("this is for student")
                this.setState({role: response.data})
                this.setState({iam: response.data})
                console.log(this.state.role)
                console.log(this.state.iam)
                this.fetchData()

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

    }

    // componentDidMount() {
    //     axios.get(`/user/whoami`)
    //         .then((response) => {
    //             console.log("this is check")
    //             console.log(response.data);
    //             if(response.data === "table"){
    //                 this.props.history.push('/menu')
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             this.props.history.push('/')
    //         });
    //     this.fetchData()
    //     this.interval = setInterval(this.fetchData, 5000);
    // }

    componentWillUnmount = () =>{
        clearInterval(this.interval);
    }

    makeJwt = (data) => {
        // /user/make_jwt?username=tle&video=asdsad
        axios.post(`/user/make_jwt?username=${this.state.iam}&video=${data}`)
            .then((response) => {
                console.log(response.data)
                localStorage.setItem('Jwt', response.data);

            })
            .catch((error) => {
                console.log(error)
            })
    }

    fetchData = () => {
        console.log("fetch")
        axios.get("/video_item")
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

    globalStateHandler = (data) => {
        // perhaps some processing...
        this.makeJwt(data);

        this.setState({
            globalState: data,
        })
        localStorage.setItem('ChooseWatch', data);
        this.props.history.push('/hls_page')
    }

    render(){
        const {data, showCheckboxes} = this.state
        return (
            <div >


                <Bar onClick={()=>this.props.history.push('/mainstudent')}/>

                <Table style ={{top: "100px"}}>
                    <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>

                        <TableRow>
                            <TableHeaderColumn>Topic</TableHeaderColumn>
                            <TableHeaderColumn>Description</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                            {/*<TableHeaderColumn>Status</TableHeaderColumn>*/}
                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={showCheckboxes}>

                        {data.map((each) => {



                            return(

                                <TableRow>
                                    <TableRowColumn>{each.topic}</TableRowColumn>
                                    <TableRowColumn>{each.description}</TableRowColumn>
                                    {/*<TableRowColumn>*/}
                                        {/*/!* {<DropDownMenuOpenImmediateExample />} *!/*/}
                                        {/*<MenuItem  primaryText="Waiting" onClick={() => this.updateItemStatus(each.key.id, "Waiting")}/>*/}
                                        {/*<MenuItem  primaryText="Cooking" onClick={() => this.updateItemStatus(each.key.id, "Cooking")}/>*/}
                                        {/*<MenuItem  primaryText="Done" onClick={() => this.updateItemStatus(each.key.id, "Done")}/>*/}
                                    {/*</TableRowColumn>*/}
                                    {/*<TableRowColumn>{each.id}</TableRowColumn>*/}

                                    <TableRowColumn>
                                        {/* {<DropDownMenuOpenImmediateExample />} */}
                                        {/*<a href={each.url+"?jwt=sadasd"}>  Watch This</a>*/}
                                        {/*<MenuItem  primaryText="Watch this" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.url)} />*/}
                                        <LoginButton onClick={() => this.globalStateHandler(each.url)}/>

                                        {/*<MenuItem  primaryText="Watch this" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.filepath)}*/}
                                        {/*/>*/}
                                        {/*<MenuItem  primaryText="Cooking" onClick={() => this.updateItemStatus(each.key.id, "Cooking")}/>*/}
                                        {/*<MenuItem  primaryText="Done" onClick={() => this.updateItemStatus(each.key.id, "Done")}/>*/}
                                    </TableRowColumn>
                                    {/* <TableRowColumn> <RaisedButton onClick={() => console.log(each)}/> </TableRowColumn> */}
                                </TableRow>
                            )


                        })
                        }

                    </TableBody>
                </Table>

            </div>
        )
    }
}

export default StudentChooseVideo;
