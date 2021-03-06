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
       telephone: '',
       ville:'',
       region:'',
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
    const { nom, prenom, telephone,cin,sexe,ville,region, email,addresse,date, password } = this.state;
    if (!nom.length || !prenom.length || !telephone.length || !cin.length || !email.length || !password.length) {
        this.setState({ error: "please fill out all the details", loading: false })
        return false;
    } else if (password.length < 6) {
        this.setState({ error: "password should contain atleast 6 charecters", loading: false })
        return false;
    } else {
        const regesterData = {
            nom: nom,
            prenom: prenom,
            telephone : telephone ,
            cin: cin,
            sexe: sexe,
            ville:ville,
            region:region,
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
            nom: "",
            prenom: "",
            telephone: "",
            cin: '',
            sexe: '',
            email: "",
            ville:"",
            region:"",
            password: "",
            addresse:"",
            date:'',
           
            users: this.state.users.concat(regesterData)
        });
        setTimeout(() => {
          
                this.props.history.push("/login");
            
            this.setState({ loading: false })
        }, 2000)
    }
};

  render() {
    const { classes } = this.props;
    const { nom  , prenom, telephone,cin ,sexe, email,addresse,ville,region,date, password, error, loading } = this.state;

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
                name="nom"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nom"
                autoFocus
                onChange={this.handleOnchange}
                value={nom}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Pr??nom"
                name="prenom"
                autoComplete="lname"
                onChange={this.handleOnchange}
                value={prenom}
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
                label="T??l??phone"
                name="telephone"
                autoComplete="phone"
                onChange={this.handleOnchange}
               value={telephone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="addresse"
                label="ville"
                name="ville"
                autoComplete="addresse"
                onChange={this.handleOnchange}
               value={ville}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Region"
                label="R??gion"
                name="region"
                autoComplete="addresse"
                onChange={this.handleOnchange}
               value={region}
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
                label="Email "
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
              Vous avez d??j?? un compte? S'identifier
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