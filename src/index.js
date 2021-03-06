import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';


import App from "./App";
// import App2 from "./App2"
import Signup from "./Signup";
import MainMenuAdmin from "./MainMenuAdmin";
import AdminManageExercise from "./AdminManageExercise"
import MainStudent from "./MainStudent"
import MainStudentUnpaid from "./MainStudentUnpaid"
import AdminManageVideo from "./AdminManageVideo"
import StudentChooseVideo from "./StudentChooseVideo"
import StudentChooseExercise from "./StudentChooseExercise"
import PopoverExampleConfigurable from "./PopoverExampleConfigurable"
import StudentDoExercise from "./StudentDoExercise"
import AdminListOfStudent from "./AdminListOfStudent"
import AdminListOfExercise from "./AdminListOfExercise"
import AdminListOfVideo from "./AdminListOfVideo"
import EditExercise from "./EditExercise"
import VideoStudent from "./VideoStudent"
import HLSPage from "./HLSPage"
import Mother from "./Mother"
import StudentDone from "./StudentDoneExercise"
import AdminEachStudent from "./AdminEachStudent"

// import checkout from "./checkout.php";


function Path(){
    return (
        <div>
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <Router>
                    <div>
                        <Route path="/" exact component={App} />
                        <Route path="/signup" exact component={Signup} />
                        <Route path="/mainmenuadmin" exact component={MainMenuAdmin} />
                        <Route path="/admin_manage_exercise" exact component={AdminManageExercise} />
                        <Route path="/mainstudent" exact component={MainStudent} />
                        <Route path="/admin_manage_video" exact component={AdminManageVideo} />
                        <Route path="/student_choose_video" exact component={StudentChooseVideo} />
                        <Route path="/student_choose_exercise" exact component={StudentChooseExercise} />
                        <Route path="/PopoverExampleConfigurable" exact component={PopoverExampleConfigurable} />
                        <Route path="/StudentDoExercise" exact component={StudentDoExercise} />
                        <Route path="/admin_list_of_students" exact component={AdminListOfStudent} />
                        <Route path="/admin_list_of_exercise" exact component={AdminListOfExercise} />
                        <Route path="/admin_edit_exercise" exact component={EditExercise} />
                        <Route path="/video_student" exact component={VideoStudent} />
                        <Route path="/hls_page" exact component={HLSPage} />
                        <Route path="/mother" component={Mother}/>
                        <Route path="/mainstudentunpaid" component={MainStudentUnpaid}/>
                        <Route path="/admin_list_of_video" component={AdminListOfVideo}/>
                        <Route path="/student_done" component={StudentDone}/>
                        <Route path="/admin_view_each_student" component={AdminEachStudent}/>




                    </div>
                </Router>
            </MuiThemeProvider>
        </div>
    );
}


ReactDOM.render(
    <Path />,
    document.getElementById('root'));
registerServiceWorker();
