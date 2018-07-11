import React from 'react';
import axios from './AxiosConfiguration'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import _ from "lodash"
import Dialog from 'material-ui/Dialog';

// import React from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';



import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';

import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import FlatButton from 'material-ui/FlatButton';

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
            title= "Choose the Correct Answer and Submit Below."
            iconElementLeft={
                <IconButton onClick={onClick}>
                    <BackIcon/>
                </IconButton>}
            style={{backgroundColor: "#D50000"}}
        />
    );
}


class StudentChooseExercise extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCheckboxes: false,
            data: [],
            secondsElapsed: 0,
            open: false,
            anchorOrigin: {
                horizontal: 'left',
                vertical: 'bottom',
            },
            targetOrigin: {
                horizontal: 'left',
                vertical: 'top',
            },
            ans: {},
            ans2: [],
            eiei: String(localStorage.getItem("Choose")),
            eiei_2: String(localStorage.getItem("ChooseId")),
            score:"",
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
        // const newBugs = this.props.bugs;
        // console.log(this.state.eiei);
        //     });
        // this.fetchData()
        // this.interval = setInterval(this.fetchData, 5000);
    }




    handleAddAns = (id, anschoose) =>{
        this.setState((prev) => {
            const {ans2} = prev;
            const i = _.findIndex(ans2, (o) => o.id === id)
            _.pullAt(ans2, i);
            ans2.push({id, anschoose})
            return ans2
        }, () => console.log(this.state.ans2))
    }

    handleClose = () => {
        // this.setState({wantdelete: ""})
        console.log(this.state.score)
        this.setState({open: false});
        // console.log(this.state.wantdelete)
        this.props.history.push('/student_choose_exercise')
    };

    fetchData = () => {
        // console.log("fetch")
        console.log(this.state.eiei)
        axios.get(`/each_topic?topic=${this.state.eiei}`)
            .then((response) => {
                this.setState({data: response.data})
                console.log(this.state.data)
                this.setState({fullscore: response.data.length})
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

    setAnchor = (positionElement, position) => {
        const {anchorOrigin} = this.state;
        anchorOrigin[positionElement] = position;

        this.setState({
            anchorOrigin: anchorOrigin,
        });
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

    click = () =>{
        this.setState({open: true});
        axios.post(`/check_score`, this.state.ans2)
            .then((response) => {
                console.log(response)
                this.setState({score: response.data})
                console.log(this.state.score)
                axios.post(`/upload_done?username=${this.state.iam}&exerciseid=${this.state.eiei_2}&exercise=${this.state.eiei}&score=${this.state.score}&outof=${this.state.fullscore}`)
                console.log(this.state.iam)
                console.log(this.state.eiei)
                console.log(this.state.score)
                console.log(this.state.fullscore)
                    .then((response) => {
                        console.log(response)
                    })
                    .catch((error) => {
                        console.log(error)
                    })


            })
            .catch((error) => {
                console.log(error)
            })

        // this.state.data.map((each) => {
        //         console.log(each.id);
        //     }
        // )
    };

    render(){
        const {data, showCheckboxes} = this.state
        const actions = [
            <FlatButton
                label="Close"
                secondary={true}
                onClick={this.handleClose}
            />,

        ];

        return (
            <div >

                {/*<Bar onClick={()=>this.props.history.push('/student_choose_exercise')}/>*/}

                <AppBar
                    title="Choose the Correct Answer and Submit Below"
                    iconElementLeft={
                        <IconButton onClick={()=>this.props.history.push('/student_choose_exercise')}>
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

                {/*<Table style ={{top: "100px"}}>*/}
                    {/*<TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>*/}

                        {/*<TableRow>*/}
                            {/*/!*<TableHeaderColumn>Table Number</TableHeaderColumn>*!/*/}
                            {/*<TableHeaderColumn>Name</TableHeaderColumn>*/}
                            {/*<TableHeaderColumn>Button</TableHeaderColumn>*/}
                            {/*/!*<TableHeaderColumn>Status</TableHeaderColumn>*!/*/}
                        {/*</TableRow>*/}
                    {/*</TableHeader>*/}

                    {/*<TableBody displayRowCheckbox={showCheckboxes}>*/}

                        {data.map((each) => {

                            return(
                                <Card className="recipe-menu">
                                    <br/>
                                    <CardText style={{wordWrap: "break-word"}}>
                                        {each.question}
                                    </CardText>
                                    {/*<h3 style={{wordWrap: "break-word"}}>{each.question} </h3>*/}
                                    <RadioButtonGroup
                                        name="shipSpeed"
                                    >
                                        <RadioButton
                                            value="light"
                                            label={each.choiceA}
                                            onClick={() => this.handleAddAns(each.id, "Choice A")}
                                            style={{marginLeft:"40px", wordWrap: "break-word", display: "flex", width: "95%"}}
                                        />
                                        <RadioButton
                                            value="not_light"
                                            label={each.choiceB}
                                            onClick={() => this.handleAddAns(each.id, "Choice B")}
                                            style={{marginLeft:"40px", wordWrap: "break-word", display: "flex", width: "95%"}}
                                        />
                                        <RadioButton
                                            value="ludicrous"
                                            label={each.choiceC}
                                            onClick={() => this.handleAddAns(each.id, "Choice C")}
                                            style={{marginLeft:"40px", wordWrap: "break-word", display: "flex", width: "95%"}}
                                        />
                                        <RadioButton
                                            value="ludicroussss"
                                            label={each.choiceD}
                                            onClick={() => this.handleAddAns(each.id, "Choice D")}
                                            style={{marginLeft:"40px", wordWrap: "break-word", display: "flex", width: "95%"}}
                                        />
                                    </RadioButtonGroup>
                                    <br/>
                                </Card>
                            )

                        })
                        }

                    {/*</TableBody>*/}
                {/*</Table>*/}


                {/*<h3 >Anchor Origin</h3>*/}

                <Card>

                    <CardActions>
                        <RaisedButton
                            fullWidth={true}
                            label="Submit"
                            secondary={true}
                            onClick={this.click}
                            style={{marginTop:"40px", marginButtom:"40px"}}
                        />
                    </CardActions>

                </Card>




                <Dialog
                    title={`You have scored ${this.state.score}/${this.state.fullscore}.`}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {/*Are you sure to delete all the questions that belong to this topic?*/}
                </Dialog>



            </div>
        )
    }
}

export default StudentChooseExercise;
