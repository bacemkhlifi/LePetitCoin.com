import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {TextField,MenuItem} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
export default function AddressForm() {
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event) => {
      setCurrency(event.target.value);
    };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      Information générale
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={12}>
          <TextField
            required
            id="titre"
            name="titre"
            label="Titre de votre annonce"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
       
        <Grid item xs={12}>
        <TextField
          id="Description"
          label="Description"
          name="Description"
          multiline
          rows={4}
          defaultValue=" "
          variant="outlined"
          fullWidth
        />  
       
        </Grid>
        
        <Grid item xs={12} sm={6}>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
          variant="outlined"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </Grid>
       
        <Grid item xs={12} sm={6}>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
          variant="outlined"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}