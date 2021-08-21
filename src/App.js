
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Account from './components/Account/Account'
import Signup from './components/Signup/Signup'
import Annonce from './components/Annonce/Annonce'
import Product from './components/Home/Product'
function App() {
  return (
    <>
    <Router>
      <Navbar></Navbar> 
            <Switch>
                <Route exact path="/"component={Home} />
                <Route exact path="/login"component={Login} />
                <Route exact path='/account' component={Account} />
                <Route exact path="/signup"component={Signup} />
                <Route exact path="/ad"component={Annonce} />
                <Route exact path="/anonnce" component={Product} />
            </Switch>
      <Footer />
   </Router>
    </>
  );
}

export default App;
