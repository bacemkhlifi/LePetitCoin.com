import React,{useState,useEffect} from 'react'

import axios from 'axios'
import { Link,useHistory} from 'react-router-dom'

import { AppBar, Toolbar, IconButton, Tabs,Tab, Badge, Typography,Button } from '@material-ui/core'
import { Search,AccountCircle,ContactSupport,AddBox,Room,Chat,ExitToApp } from '@material-ui/icons'
import NotificationsIcon from '@material-ui/icons/Notifications';


import useStyles from './Styles.js'

import logo from '../../assests/NextAdLOGO.png'
const Navbar = ( ) => {
    const classes = useStyles()

    const [btn , setBtn] = useState(false)
    const history = useHistory()
    function handleLogout(){
        localStorage.clear()
        history.push('/')
        window.location.reload(); 
        
      }
      const [reclamation, setreclamation] = useState([])
  
              
        
      useEffect(async() => {
         if(localStorage.getItem("currentUser")!=null){
        await  axios.get("http://localhost:8089/v1/message/"+JSON.parse(localStorage.getItem("currentUser")).email).then((res)=>setreclamation(res.data))
       }
      
        }, [reclamation])  
    return (
        < >
        <div >
            <AppBar position='fixed' color='transparent' >
                <Toolbar variant='dense' className={classes.appBar}>
             
                <Typography  variant='h6'  component={Link} to={"/"} className={classes.title} >
                        <img src={logo} className={classes.image}  component={Link} to={"/"}/>
                       <div style={{ cursor: "pointer"}}   component={Link} to={"/"}> LePetitCoin</div>    
                    
                    <Button component={Link} to={localStorage.getItem("currentUser") === null? "/login" : "/ad" } className={classes.btn} variant="contained" color="secondary">
                        <AddBox style={{"marginRight":"5px"}}></AddBox>
                         Déposer une annonce </Button>
                    </Typography>
                    <div className={classes.tabs}>
                 <Tabs  indicatorColor="primary">
                   
                     <Tab className={classes.tab} icon={<Search />} component={Link} to={"/home" }  label="Rechercher"></Tab>
                     <Tab   className={classes.tab} icon={  <Badge badgeContent={reclamation.length} color="secondary">
              <Chat />
            </Badge>
                         } component={Link} to={localStorage.getItem("currentUser") === null? "/login" : "/chat" }  label="Messages"></Tab>
                     <Tab className={classes.tab} icon={<AccountCircle />}  component={Link} to={localStorage.getItem("currentUser") === null? "/login" : "/account" }    label={(localStorage.getItem("currentUser") !=null)  ? `Profil` :`Se connecter`}></Tab>
                     <Tab  className={classes.tab} icon={<ContactSupport />} href="#aide" label="Aide"></Tab>
                     <Tab  className={classes.tab} icon={<ExitToApp/>} className={(localStorage.getItem("currentUser") === null || btn==true)  ? `${classes.btnLogout}` :`${classes.bb}`} variant="outlined" onClick={handleLogout} label="Déconnexion"></Tab>
                     
                     
                    
                 { /*   <Search className={classes.search}></Search>
                    <InputBase placeholder='search'>
                        
                     </InputBase>*/}
               
                     
               
                   </Tabs> </div>
                </Toolbar>

            </AppBar>
   </div>

        </>
    )
}

export default Navbar
