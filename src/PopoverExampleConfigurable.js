import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import RadioButton from 'material-ui/RadioButton';
import Popover from 'material-ui/Popover/Popover';
import {Menu, MenuItem} from 'material-ui/Menu';
import axios from "./AxiosConfiguration";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    h3: {
        marginTop: 20,
        fontWeight: 400,
    },
    block: {
        display: 'flex',
    },
    block2: {
        margin: 10,
    },
    pre: {
        overflow: 'hidden', // Fix a scrolling issue on iOS.
    },
};

export default class PopoverExampleConfigurable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            anchorOrigin: {
                horizontal: 'left',
                vertical: 'bottom',
            },
            targetOrigin: {
                horizontal: 'left',
                vertical: 'top',
            },
        };
    }

    componentDidMount() {
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
        console.log("kuy tle");
        //     });
        this.fetchData()
        // this.interval = setInterval(this.fetchData, 5000);
    }


    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    fetchData = () => {
        console.log("fetch")
        axios.get("/each_topic?topic=sdsd")
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

    setAnchor = (positionElement, position) => {
        const {anchorOrigin} = this.state;
        anchorOrigin[positionElement] = position;

        this.setState({
            anchorOrigin: anchorOrigin,
        });
    };

    setTarget = (positionElement, position) => {
        const {targetOrigin} = this.state;
        targetOrigin[positionElement] = position;

        this.setState({
            targetOrigin: targetOrigin,
        });
    };

    click = () =>{
        console.log(this.state.data[0].id);
        // this.state.data.map((each) => {
        //         console.log(each.id);
        //     }
        // )
    };

    render() {
        const {data} = this.state;
        return (
            <div>
                {/*<RaisedButton*/}
                    {/*onClick={this.handleClick}*/}
                    {/*label="Click me"*/}
                {/*/>*/}
                {/*<h3 style={styles.h3}>Current Settings</h3>*/}
                {/*<pre style={styles.pre}>*/}
          {/*anchorOrigin: {JSON.stringify(this.state.anchorOrigin)}*/}
                    {/*<br />*/}
          {/*targetOrigin: {JSON.stringify(this.state.targetOrigin)}*/}
        {/*</pre>*/}
                {/*<h3 style={styles.h3}>Position Options</h3>*/}
                {/*<p>Use the settings below to toggle the positioning of the popovers above</p>*/}

                {/*{data.map((each) => {*/}
                    {/*return(*/}
                        {/*<h3 style={styles.h3}>each.question</h3>*/}
                    {/*)*/}

                {/*})*/}
                {/*}*/}


                {/*{data.map((each) => {*/}

                    {/*return(*/}
                        {/*<RadioButton*/}
                            {/*onClick={this.setAnchor.bind(this, 'vertical', 'top')}*/}
                            {/*label={each.choiceA}*/}
                            {/*checked={this.state.anchorOrigin.vertical === 'top'}*/}
                        {/*/>*/}
                    {/*)*/}


                {/*})*/}
                {/*}*/}

                {/*<Table style ={{top: "100px"}}>*/}
                    {/*<TableHeader>*/}
                        {/*<TableRow>*/}
                            {/*<TableHeaderColumn>Name</TableHeaderColumn>*/}
                            {/*<TableHeaderColumn>Button</TableHeaderColumn>*/}
                        {/*</TableRow>*/}
                    {/*</TableHeader>*/}
                    {/*<TableBody>*/}

                        {/*{data.map((each) => {*/}

                            {/*return(*/}

                                {/*<TableRow>*/}
                                    {/*<TableRowColumn>{each.id}</TableRowColumn>*/}
                                    {/*<TableRowColumn>*/}
                                        {/*/!*<MenuItem  primaryText="Do this" onClick={() => this.updateItemStatus(each.key.id, "Waiting")}/>*!/*/}
                                    {/*</TableRowColumn>*/}
                                {/*</TableRow>*/}
                            {/*)*/}

                        {/*})*/}
                        {/*}*/}

                    {/*</TableBody>*/}
                {/*</Table>*/}


                <h3 style={styles.h3}>Anchor Origin</h3>
                <div style={styles.block}>
                    <div style={styles.block2}>
                        {/*<span>Vertical</span>*/}
                        <RadioButton
                            onClick={this.setAnchor.bind(this, 'vertical', 'top')}
                            label="Top"
                            checked={this.state.anchorOrigin.vertical === 'top'}
                        />
                        <RadioButton
                            onClick={this.setAnchor.bind(this, 'vertical', 'center')}
                            label="Center" checked={this.state.anchorOrigin.vertical === 'center'}
                        />
                        <RadioButton
                            onClick={this.setAnchor.bind(this, 'vertical', 'bottom')}
                            label="Bottom" checked={this.state.anchorOrigin.vertical === 'bottom'}
                        />
                        <FlatButton label="Default" onClick={this.click}/>
                    </div>

                </div>
                {/*<h3 style={styles.h3}>Target Origin</h3>*/}
                {/*<div style={styles.block}>*/}
                    {/*<div style={styles.block2}>*/}
                        {/*<span>Vertical</span>*/}
                        {/*<RadioButton*/}
                            {/*onClick={this.setTarget.bind(this, 'vertical', 'top')}*/}
                            {/*label="Top" checked={this.state.targetOrigin.vertical === 'top'}*/}
                        {/*/>*/}
                        {/*<RadioButton*/}
                            {/*onClick={this.setTarget.bind(this, 'vertical', 'center')}*/}
                            {/*label="Center" checked={this.state.targetOrigin.vertical === 'center'}*/}
                        {/*/>*/}
                        {/*<RadioButton*/}
                            {/*onClick={this.setTarget.bind(this, 'vertical', 'bottom')}*/}
                            {/*label="Bottom" checked={this.state.targetOrigin.vertical === 'bottom'}*/}
                        {/*/>*/}
                    {/*</div>*/}
                    {/*<div style={styles.block2}>*/}
                        {/*<span>Horizontal</span>*/}
                        {/*<RadioButton*/}
                            {/*onClick={this.setTarget.bind(this, 'horizontal', 'left')}*/}
                            {/*label="Left" checked={this.state.targetOrigin.horizontal === 'left'}*/}
                        {/*/>*/}
                        {/*<RadioButton*/}
                            {/*onClick={this.setTarget.bind(this, 'horizontal', 'middle')}*/}
                            {/*label="Middle" checked={this.state.targetOrigin.horizontal === 'middle'}*/}
                        {/*/>*/}
                        {/*<RadioButton*/}
                            {/*onClick={this.setTarget.bind(this, 'horizontal', 'right')}*/}
                            {/*label="Right" checked={this.state.targetOrigin.horizontal === 'right'}*/}
                        {/*/>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={this.state.anchorOrigin}
                    targetOrigin={this.state.targetOrigin}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu>
                        <MenuItem primaryText="Refresh" />
                        <MenuItem primaryText="Help &amp; feedback" />
                        <MenuItem primaryText="Settings" />
                        <MenuItem primaryText="Sign out" />
                    </Menu>
                </Popover>
            </div>
        );
    }
}