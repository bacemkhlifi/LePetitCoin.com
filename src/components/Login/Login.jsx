import React , {Component} from 'react';
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';





const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    
  },
}));
 class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null,
    users: null
};


async componentDidMount() {
 try { const response  = await  fetch ('http://localhost:8089/v1/users')
const  data = await  response.json() ;
console.log(data)
this.setState({ users: data })}
catch (error) {
    console.log(error);
}
}

handleOnchange = e => this.setState({ [e.target.name]: e.target.value });

handleSignUp = event => {
    event.preventDefault()

    const { email, password, users } = this.state;
    if (!email.length || !password.length) {
        this.setState({ error: "please fill out all the details" })
        return false;
    } else {
            users ? users.filter(user => {
           
            

            
            if (user.email !== email || user.password !== password) {
                this.setState({ error: "Invalid creadetials" })
                
            } else {
                const json = JSON.stringify(user);
                localStorage.setItem("currentUser", json);
                
                this.props.history.push("/account");
                window.sessionStorage.setItem("currentUser", json);
                console.log(json)
                window.location.reload();
            }
        }) : this.setState({ error: "no user found" })
    }
};
  

  render(){
  const { classes } = this.props;
  const { email, password, error } = this.state;
  return (
    <>
    
  
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        S'identifier
        </Typography>
        <form className={classes.form}  onSubmit={this.handleSignUp}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.handleOnchange}
            value={email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.handleOnchange}
            value={password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Souviens-toi de moi"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            
          >
            Se connecter
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography variant="body2">
              Mot de passe oublié?
              </Typography>
            </Grid>
            <Grid item>
              <Typography  color="primary" component={Link} to="/signup" >
              Vous n'avez pas de compte? S'inscrire
              </Typography>
               
             
              
            </Grid>
            {error && <Typography color="secondary">{error} </Typography>}
          </Grid>
        </form>
       
       
                              
      </div>
    
    </Container>
  
    </>
  );
}
}
export default withStyles(useStyles) (Login) ; 