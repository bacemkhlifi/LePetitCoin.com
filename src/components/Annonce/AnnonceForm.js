import React ,{useState,useEffect} from 'react';
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {TextField,MenuItem,Button} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

 
export default function AnnonceForm() {
  const [category, setCategory] =useState('Multimédia');
  const [subcategory, setSubcategory] =useState('Informatique');
   const [categories, setCategories] = useState([])
   const [data, setData] = useState(
    {
      name: '',
  
     ville: 'Sfax',
     region:'',
      subcat:'Informatique',
      cat: 'Multimédia',
      

    
  }
   )
   
     

     useEffect(async() => {
        
          
              await axios.get("http://localhost:8089/v1/categories").then(
                  ((response)=>setCategories(response.data))
              )
            
           // console.log("categories =", categories);
        
        
      },[categories]);

     
    const handleChange = (e) => {
      setCategory(e.target.value)
      setData((Object.assign({}, data, {cat: e.target.value})))
      
    };
    const handleChange1 = (e) => {
      setSubcategory(e.target.value)
      setData((Object.assign({}, data, {subcat: e.target.value})))
        }
    
    //console.log(data.id_subcat) 

    ///////pour localisation
    const [ville, setVille] =useState('Sfax');
    const [region, setRegion] =useState('');
     const [villes, setVilles] = useState([])

     useEffect(async() => {
        
          
      await axios.get("http://localhost:8089/v1/villes").then(
          ((response)=>setVilles(response.data))
      )
      
   // console.log("villes =", villes);


},[villes]);
const handleOnchangeAd = (e)=> { setData((Object.assign({}, data, {[e.target.name]: e.target.value})))}

const handleChange0 = (e) => {
setVille(e.target.value)
setData((Object.assign({}, data, {ville: e.target.value})))

};
const handleChange01 = (e) => {
setRegion(e.target.value)
setData((Object.assign({}, data, {region: e.target.value})))

};

const handleAds  = event => {
  event.preventDefault()
 
  const { name, ville, cat,subcat ,region, } = data;
   {
      const regesterData = {
        name: name,
     
       ville: ville,
       region:region,
       subcat: subcat,
        cat: cat,
       
     
        
          
      };
      const json = JSON.stringify(data);
      console.log(localStorage.setItem("annonce", json));

      
  }
};

     return (
    <>
      <Typography variant="h6" gutterBottom>
      Information générale
      </Typography> 
      <form  onSubmit={handleAds} >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={12}>
        <Typography variant="subtitle2" gutterBottom>
      Titre
      </Typography>
     
          <TextField
            required
            id="titre"
            name="name"
            label="Titre de votre annonce"
            fullWidth
            autoComplete="given-name"
            onChange={handleOnchangeAd}
          />
        </Grid>
       
        <Grid item xs={12}>
        
        <TextField
         required
          id="Description"
          label="Description"
          name="description"
          multiline
          rows={4}
          defaultValue=" "
          onChange={handleOnchangeAd}
          variant="outlined"
          fullWidth
        />  
       
        </Grid>
     
        
          <Grid item xs={12} sm={6} >
       <TextField
        required
           id="outlined-select-currency"
          select
          label="Catégories"
          name="category"
          value={category}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        >
          { categories.map((option) => (
        <MenuItem key={option.id_cat}  value={option.name}>
              {option.name}
            </MenuItem>
         ))}
        </TextField> 
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
           required
          id="outlined-select-currency"
          select
          label="Sous-Catégories"
          name="subcategory"
          value={subcategory}
          onChange={handleChange1}
          variant="outlined"
          fullWidth
        >
         
       {categories.map((subOption)=> {
         if(subOption.name===category) {
         return( 
            subOption.subCategory.map((op)=>(
            <MenuItem key={op.id_subcat}  value={op.name}>
              {op.name}
            </MenuItem>)
     ))}
        
        })  }
        </TextField> 
        </Grid>
       
        <br></br>
      
      <Grid item xs={12} sm={6} lg={12} >  
      <Typography variant="subtitle2" gutterBottom>
      Localisation
      </Typography>
       <TextField
        required
           id="outlined-select-currency"
          select
          label="Gouvernorat"
          name="ville"
          value={ville}
          onChange={handleChange0}
          variant="outlined"
          fullWidth
        >
          { villes.map((option) => (
        <MenuItem key={option.id_ville}  value={option.name}>
              {option.name}
            </MenuItem>
         ))}
        </TextField> 
        </Grid>
        <Grid item xs={12} sm={6} lg={12}>
          <TextField
           required
          id="outlined-select-currency"
          select
          label="Délégation"
          name="region"
          value={region}
          onChange={handleChange01}
          variant="outlined"
          fullWidth
        >
         
       {villes.map((subOption)=> {
         if(subOption.name===ville) {
         return( 
            subOption.region.map((op)=>(
            <MenuItem key={op.id_region}  value={op.name}>
              {op.name}
            </MenuItem>)
     ))}
        
        })  }
        </TextField>  
        
        </Grid>
     <Button type="submit" color="secondary" variant="contained"> Je confirme que les infos sont correctes</Button>
      </Grid>
     </form>
    </>
  );
}