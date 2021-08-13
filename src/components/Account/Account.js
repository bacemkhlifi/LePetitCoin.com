import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Typography, Container, Grid, Button, CardContent, Card, CardActions, Paper, Table, TableCell, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { ThumbUp, Notifications, Drafts, AccountBox, LocationOn, DateRange, Phone, LocalHospital, PictureAsPdf } from '@material-ui/icons'

const styles = theme => ({
    Rtitle: {
        fontSize: "32px",
        textAlign: "center",
        textTransform: " uppercase",
        fontStyle: "normal",
        fontWeight: "bold",
        position: "relative",
        borderBottom: "none",
        color: " #00927b",
        marginBottom: "15px",


    },
    icons: {

        margin: "0px 20%",
        color: "#00927b"
    },
    card: {
        backgroundColor: "#00927b2e"
    }

})
class Account extends Component {


    state = {
        user: "",
        annonces: [],
        error: ""
    }

    componentDidMount() {

        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (user) {

            this.setState({ annonces: user.annonces })
            this.setState({ user: user })
        }
        else {
            this.setState({ error: "You don't have permission to be in this page" })
        }
        console.log(user)
    }
    render() {

        const { classes } = this.props;
        const { user, annonces, error } = this.state
        return (
            <>

                <Container maxWidth="md" >

                    <div style={{ marginTop: "105px" }}>

                    </div>



                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"

                    >

                        <Grid item lg={4}  >
                            <Drafts className={classes.icons} />
                            <Typography variant="subtitle2">  <br /> Transmettez votre adresse email<br />
                                au LePetitCoin puis activez votre <br />
                                compte en quelques clics.</Typography> </Grid>
                        <Grid item lg={4}>
                            <Notifications className={classes.icons} />
                            <Typography variant="subtitle2"> <br /> Soyez alerté par
                                email lorsque <br />
                                vos résultats sont disponibles.</Typography> </Grid>


                        <Grid item lg={4}  >
                            <ThumbUp className={classes.icons} />
                            <Typography variant="subtitle2">  <br /> C’est simple, sécurisé
                                et écologique.</Typography> </Grid>

                    </Grid>

                    <Grid container >
                        <Grid item lg={12}>
                            <Card className={classes.card}>

                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" variant="h4" >

                                    </Typography>
                                    <Typography variant="h6" component="h2">
                                        <AccountBox />  (Mr/Mme): {user.fullName}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        <DateRange />   Date de naissance:  {user.datenaissance}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <LocationOn /> Adresse: {user.addresse}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        <Phone />   téléphone:  {user.telephone}
                                    </Typography>

                                    <Typography className={classes.pos} color="textSecondary">
                                        <LocalHospital />   Numbre des annonces publiées: {annonces.length}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="primary">Modifier mes informations</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item lg={6}>
                            <TableContainer component={Paper}>

                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Typography variant="h6" className={classes.Rtitle}>Annonces({annonces.length})</Typography>

                </Container>
            </>

        )
    }
}
export default withStyles(styles)(Account);