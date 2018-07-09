import React from 'react';
import axios from './AxiosConfiguration'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import LinearProgress from 'material-ui/LinearProgress';



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
            title="Exercise Lists Available"
            iconElementLeft={
                <IconButton onClick={onClick}>
                    <BackIcon/>
                </IconButton>}
            style={{backgroundColor: "#D50000"}}
        />
    );
}

function LoginButton({onClick}){
    return (<RaisedButton label="Do this"
                          fullWidth={false}
                          primary={true}
                          onClick={onClick}
    />)
}


class StudentChooseExercise extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCheckboxes: false,
            data: [],
            secondsElapsed: 0,
            globalState : "",
            iam: "",
            role: "",
        }
        // this.tick  = this.tick.bind(this)
    }

    // tick = () => {
    //     this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    //     this.fetchData();
    // }

    componentDidMount() {
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

                console.log("this is for student")
                this.setState({role: response.data})
                this.setState({iam: response.data})
                console.log(this.state.role)
                console.log(this.state.iam)
                this.fetchData()
                // this.fetchData_2()

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
        // console.log("tle");
        //     });

        // this.interval = setInterval(this.fetchData, 5000);
    }

    componentWillUnmount = () =>{
        clearInterval(this.interval);
    }

    updateItemStatus = (id, status) => {
        axios.put(`/update_by_kitchen?id=${id}&currentStatus=${status}`)
            .then((response) => {
                this.fetchData()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    globalStateHandler = (data, id) => {
        // perhaps some processing...
        this.setState({
            globalState: data,
        })
        localStorage.setItem('Choose', data);
        localStorage.setItem('ChooseId', id);
        this.props.history.push('/StudentDoExercise')
    }

    // fetchData_2 = () => {
    //     console.log("fetch")
    //     axios.get(`/each_done?username=${this.state.iam}`)
    //         .then((response) => {
    //             this.setState({data_2: response.data})
    //             console.log(this.state.data_2)
    //             // if (response.data.length == 0){
    //             //     this.handleOpen_3()
    //             // }
    //             // this.state.data.map((each) => {
    //             //         console.log(each.id);
    //             //     }
    //             // )
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // };

    fetchData = () => {
        console.log("fetch")
        axios.get("/topic_item")
            .then((response) => {
                // console.log(response)
                this.setState({data: response.data})
                console.log(this.state.data)
                this.setState({dataLength: response.data.length})
                axios.get(`/each_done?username=${this.state.iam}`)
                    .then((response) => {
                        this.setState({data_2: response.data})
                        console.log(this.state.data_2)
                        this.setState({dataLength_2: response.data.length})

                        for (var i = 0; i < this.state.dataLength; i++) {
                            // console.log(this.state.data[i].id)
                            for (var j = 0; j < this.state.dataLength_2; j++) {
                                if (this.state.data[i].id == this.state.data_2[j].exerciseid){
                                    console.log("yess")
                                    this.state.data[i].score = this.state.data_2[j].score
                                    this.state.data[i].outof = this.state.data_2[j].outof

                                }
                                // else {
                                //     console.log("nooo")
                                //     this.state.data[i].score = "-"
                                //     this.state.data[i].outof = "-"
                                // }
                            }
                        }
                        console.log(this.state.data)
                        this.setState({finaldata: this.state.data})
                        // window.location.reload();
                    })

                // this.state.data.map((each) => {
                //         console.log(each.id);
                //     }
                // )
            })
            .catch((error) => {
                console.log(error)
            })
    };

    // var arrayLength = this.state.data.length;

    iWillLoopForU = (each) => {
        console.log(each)
        each.map((elt) => {
            console.log(elt)
        })
    };

    render(){
        const {data, showCheckboxes} = this.state
        return (
            <div >

                <Bar onClick={()=>this.props.history.push('/mainstudent')}/>

                <Table style ={{top: "100px"}}>
                    <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>

                        <TableRow>
                            {/*<TableHeaderColumn>Table Number</TableHeaderColumn>*/}
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Best Score</TableHeaderColumn>
                            <TableHeaderColumn>OutOf</TableHeaderColumn>
                            {/*<TableHeaderColumn>Bar</TableHeaderColumn>*/}
                            <TableHeaderColumn>Button</TableHeaderColumn>
                            {/*<TableHeaderColumn>Status</TableHeaderColumn>*/}
                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={showCheckboxes}>

                        {data.map((each) => {

                            return(

                                <TableRow>
                                    {/*<TableRowColumn>{each.value}</TableRowColumn>*/}
                                    <TableRowColumn>{each.topic}</TableRowColumn>
                                    <TableRowColumn>{each.score}</TableRowColumn>
                                    <TableRowColumn>{each.outof}</TableRowColumn>
                                    {/*<LinearProgress  mode="determinate" value={each.score/each.outof*100} style={{paddingTop:25}}  />*/}
                                    <TableRowColumn>
                                        {/* {<DropDownMenuOpenImmediateExample />} */}
                                        {/*<MenuItem  primaryText="Do this" bugs={this.state.globalState} onClick={() => this.globalStateHandler(each.topic)} />*/}
                                        <LoginButton onClick={() => this.globalStateHandler(each.topic, each.id)}/>
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

            </div>
        )
    }
}

export default StudentChooseExercise;
