import React,{useEffect , useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {TextField,MenuItem,Button} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios'
const currencies = [
  {
    value: 'Non',
    label: 'Non',
  },
  {
    value: 'Oui',
    label: 'Oui',
  },
 
];
export default function PaymentForm() {
  const [currency, setCurrency] = React.useState('');
  const [data, setData] = useState([])
  useEffect(async() => {
        
          
    axios.get("http://localhost:8089/v1/subcategories/"+JSON.parse(localStorage.getItem("annonce")).subcat).then((response)=>( setData(response.data.critere)))
    
 


},[data]);

const [state, setstate] = useState(
{livraison:""}
)
const [price, setprice] = useState(
  {price:""}
  )

const handleChangeLivraison = (e) => {
 
 
  setstate((Object.assign({}, state, {livraison: e.target.value})))
 
 const annoncePerfectS = JSON.parse(localStorage.getItem("annonce"))
  
 annoncePerfectS.livraison=e.target.value
 console.log(annoncePerfectS)
 const json = JSON.stringify(annoncePerfectS);
 console.log(localStorage.setItem("annonce", json));

  
  };
  const handleChangePrice = (e) => {
 
 
    setprice((Object.assign({}, price, {price: e.target.value})))
   
   const annoncePerfect = JSON.parse(localStorage.getItem("annonce"))
    
   annoncePerfect.price=e.target.value
   console.log(annoncePerfect)
   const json = JSON.stringify(annoncePerfect);
   console.log(localStorage.setItem("annonce", json));
  
    
    };
  

  //console.log(data)

  return (
    <>
      <Typography variant="h6" gutterBottom>
      Paramétres
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={12}>
        <TextField
          id="outlined-select-currency"
          select
          label="laivraison"
          value={state.livraison}
          onChange={handleChangeLivraison}
          helperText=""
          variant="outlined"
          fullWidth
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12} md={6} lg={12}>
        <TextField
          id="outlined-select-currency"
         label="Prix (DT)"
          value={state.price}
          onChange={handleChangePrice}
          helperText=""
          variant="outlined"
          fullWidth
        >
         
        </TextField>
      </Grid>
     

   
      </Grid>
    </>
  );
}