import React  ,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';






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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
 
class Signup extends Component {
  
  constructor() {
    super()
    this.state = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        cin:'',
        email: '',
        password: '',
        addresse:'',
        date:'',
        error: null,
        users: [],
        loading: false
    };
}


    // Simple POST request with a JSON body using fetch

   


componentDidUpdate(prevState, preProps) {
    if (preProps.users.length !== this.state.users.length) {
        const json = JSON.stringify(this.state.users);
        localStorage.setItem("users", json);
    }
}

handleOnchange = e => this.setState({ [e.target.name]: e.target.value });

handleOnCheck = e => this.setState({ [e.target.name]: e.target.value });



handleSignUp = event => {
    event.preventDefault()
    this.setState({ loading: true });
    const { firstName, lastName, phoneNumber,cin,sexe, email,addresse,date, password } = this.state;
    if (!firstName.length || !lastName.length || !phoneNumber.length || !cin.length || !email.length || !password.length) {
        this.setState({ error: "please fill out all the details", loading: false })
        return false;
    } else if (password.length < 6) {
        this.setState({ error: "password should contain atleast 6 charecters", loading: false })
        return false;
    } else {
        const regesterData = {
            nom: firstName,
            prenom: lastName,
            telephone : phoneNumber ,
            cin: cin,
            sexe: sexe,
            addresse: addresse,
            datenaissance:date,
            email:email,
            password:password
          
            
        };
        fetch ('http://localhost:8089/v1/add/user', {
            method  : 'POST',
            headers : {'Content-Type': 'application/json' } , 
            body : JSON.stringify(regesterData),
        }).then(()=>{console.log('good')})
        console.log({regesterData})

        this.setState({
            error: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            cin: '',
            sexe: '',
            email: "",
            password: "",
            addresse:"",
            date:'',
           
            users: this.state.users.concat(regesterData)
        });
        setTimeout(() => {
          
                this.props.history.push("/account");
            
            this.setState({ loading: false })
        }, 2000)
    }
};

  render() {
    const { classes } = this.props;
    const { firstName , lastName, phoneNumber,cin ,sexe, email,addresse,date, password, error, loading } = this.state;

  return (
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          S'inscrie
        </Typography>
        <form className={classes.form} onSubmit={this.handleSignUp} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={this.handleOnchange}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={this.handleOnchange}
                value={lastName}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox  checked={ sexe!=="femme"&&sexe!==''? false : true } value="femme" color="primary" />}
                label="Femme"
                name="sexe"
                onChange={this.handleOnCheck}
                
                value={sexe}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox checked={ sexe!=="homme"&&sexe!=='' ?false   :true  }  value="homme" color="primary"/>} 
                label="Homme"
                name="sexe"
                onChange={this.handleOnchange}
                
                value={sexe}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="phoneNumber"
                name="phoneNumber"
                autoComplete="phone"
                onChange={this.handleOnchange}
               value={phoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="addresse"
                label="Addresse"
                name="addresse"
                autoComplete="addresse"
                onChange={this.handleOnchange}
               value={addresse}
              />
            </Grid>
            
            <Grid item xs={12}>
               <TextField  
               type='date'
               fullWidth
               required
               variant="outlined"
               id="date"
               name="date"
               onChange={this.handleOnchange}
               value={date}
               
               >
                 
               </TextField>
            </Grid>
          
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cin"
                label="CIN"
                name="cin"
                autoComplete="cin"
                onChange={this.handleOnchange}
               value={cin}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.handleOnchange}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive  promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
            

            
          >
            S'inscrie
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Typography color="primary" component={Link}  to="/login" >
              Vous avez déjà un compte? S'identifier
              </Typography>
            </Grid>
          </Grid>
        </form>
        {error && <p className="text-danger mt-3 mb-2 text-center">{error}</p>}
      </div>
      
    </Container>
  );
}
}
export default withStyles(useStyles) (Signup);