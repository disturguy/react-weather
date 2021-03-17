import '../assets/css/App.css';
import Home from '../Components/Home';
import Forecast from '../Components/Forecast' ;
import Statistics from '../Components/Statistics' ;
import UserInfo from '../Components/UserInfo' ;
import Error_page from './Error_page'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function MainRouting() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/forecast" component={Forecast}/>
        <Route path="/stats" component={Statistics}/>
        <Route path="/userinfo" component={UserInfo}/>
        <Route component={Error_page}/>
      </Switch>
  </Router >
  );
}

export default MainRouting;
