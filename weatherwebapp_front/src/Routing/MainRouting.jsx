import '../assets/css/App.css';
// import Home from '../Components/Home';
import Layout from '../Components/Layout';
import Error_page from './Error_page';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function MainRouting() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={()=><Layout route={"home"}/>}/>
        <Route path="/forecast" render={()=><Layout route={"forecast"}/>}/>
        <Route path="/stats" render={()=><Layout route={"statistics"}/>}/>
        <Route path="/userinfo" render={()=><Layout route={"userinfo"}/>}/>
        <Route component={Error_page}/>
      </Switch>
  </Router >
  );
}

export default MainRouting;
