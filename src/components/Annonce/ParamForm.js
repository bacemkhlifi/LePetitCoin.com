import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {TextField,MenuItem} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  console.log(localStorage.getItem("annonce"))

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
          value={currency}
          onChange={handleChange}
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
      </Grid>
    </>
  );
}