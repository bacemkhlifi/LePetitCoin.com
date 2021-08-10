import React from 'react'
import { AppBar, Toolbar, IconButton, Tabs,Tab, Badge, Typography,Button } from '@material-ui/core'
import { Search,AccountCircle,ContactSupport,AddBox,Room,Chat } from '@material-ui/icons'



import useStyles from './Styles.js'

import logo from '../../assests/NextAdLOGO.png'
const Navbar = ( { totalItems }) => {
    const classes = useStyles()
    return (
        < >
        <div >
            <AppBar position='fixed' color='transparent' >
                <Toolbar variant='dense' className={classes.appBar}>
             
                <Typography  variant='h6' className={classes.title} >
                        <img src={logo} className={classes.image} />
                       <div style={{ cursor: "pointer"}} > LePetitCoin</div>    
                    
                    <Button className={classes.btn} variant="contained" color="secondary">
                        <AddBox style={{"marginRight":"5px"}}></AddBox>
                         Déposer une annonce </Button>
                    </Typography>
                    <div className={classes.tabs}>
                 <Tabs  indicatorColor="primary">
                   
                     <Tab className={classes.tab} icon={<Search />} label="Rechercher"></Tab>
                     <Tab  className={classes.tab} icon={<Chat />} label="Messages"></Tab>
                     <Tab className={classes.tab} icon={<AccountCircle />} label="Se connecter"></Tab>
                     <Tab  className={classes.tab} icon={<ContactSupport />} label="Aide"></Tab>
                     
                     
                    
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
