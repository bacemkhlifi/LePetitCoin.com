import React,{useState} from 'react'
import {Container,FormLabel,FormControlLabel,RadioGroup,FormControl,Radio ,Grid,TextField,Button,Typography} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import axios from 'axios';


const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);


function Reclamation() {

    const [state, setstate] = useState({
        email:"",
        message:"",
        type:"Service",
        phone:""
    })
    const handleChange=  (e)=> { setstate((Object.assign({}, state, {[e.target.name]: e.target.value})))}
    const sendReclamation = ()=>{
       axios.post("http://localhost:8089/v1/new/reclamation",
       {
           "email":state.email,
           "message":state.message,
           "type":state.type,
           "phone":state.phone
       })
       alert('Reclamation envoyée')
     setstate({
        email:"",
        message:"",
        type:"Service",
        phone:""
    })  

    }
    return (
        <>
            <Container>
                <Grid Container>
                    <Grid item style={{"textAlign":"center",
                "padding":"70px 350px"}}>

                    <Typography variant="h6" gutterBottom>
      Réclamation
      </Typography>    
                <TextField
           required
           id="email"
         margin="normal"
         type="email"
          label="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />  
        <TextField
           required
           id="phone"
         margin="normal"
        
          label="Téléphone"
          name="phone"
          value={state.phone}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        /> 
          <TextField
           required
          id="outlined-select-currency"
          margin="normal"
          multiline
          rows={4}
          label="Message"
          name="message"
          value={state.message}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
       <FormControl component="fieldset">
     
      <RadioGroup row aria-label="position" name="type" value={state.type} defaultValue="Service">
      <FormLabel component="legend">Type de reclamation : 
        <FormControlLabel
        margin="normal"

        value="Service"
        onChange={handleChange}
          control={<Radio color="primary" />}
          label="Service"
         
        />
        <FormControlLabel
        margin="normal"
        value="Annonce"
        onChange={handleChange}
          control={<Radio color="primary" />}
          label="Annonce"
         
        />
        </FormLabel>
       </RadioGroup>
       
    </FormControl>
      <br />
        <Button color="secondary" variant="outlined"
        style={{"paddingInline":"70px",
           
    }}
    onClick={sendReclamation}
    
    disabled={(state.email) && (state.message)? false :true}
        >Envoyer</Button>
        </Grid>
                </Grid>  
            </Container>  
        </>
    )
}

export default Reclamation
