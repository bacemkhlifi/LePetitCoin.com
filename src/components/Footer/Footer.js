import React from 'react'
import {Box ,Container,Grid ,Link}  from '@material-ui/core'
import useStyles from './Styles.js'
const Footer = () => {
    const classes = useStyles()
    return (
        <>
            <Box 
            px={{xs:3 , sm :10}}  py={{xs:5 , sm :10}}
            
            marginTop={4} bgcolor="text.secondary" color="white">
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item  xs={12} sm={6}>
                            <Box borderBottom={1}>Help </Box>
                            <Box marginTop={1}  > <Link color="inherit" href="/"> Contact </Link> </Box>
                            <Box marginTop={1}> <Link  color="inherit" href="/"> Support</Link> </Box>
                            <Box marginTop={1}> <Link   color="inherit" href="/"> Privarcy</Link> </Box>

                            
                        </Grid>
                        <Grid item  xs={12} sm={4}> 
                        <Box borderBottom={1}>Messages </Box>
                            <Box marginTop={1}  > <Link color="inherit" href="/"> Backup </Link> </Box>
                            <Box marginTop={1}> <Link  color="inherit" href="/"> History</Link> </Box>
                            

                        </Grid>
                   
                    </Grid>   
                    <Box textAlign="center"   pt={{xs:5 , sm :10}}  pb={{xs:5 , sm :0}}>
                    © 2021 Copyright:
                      <Link color="inherit" href="">  www.IlefInfoService.com</Link>        </Box> 
                </Container>


            </Box>
        </>
    )
}

export default Footer
