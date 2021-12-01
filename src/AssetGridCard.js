import React from "react";
import FadeIn from "react-fade-in";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

import {navigate, Router} from "@reach/router";

import GrayText from "./StyleUtils";

const useStyles = () => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: "transform .2s",
        "&:hover": {
            cursor: "pointer",
            transform: "scale(1.05)"
        }
    },
    cardMedia: {
        // paddingTop: '56.25%', // 16:9
        paddingTop: '100%',
        "background-size": "auto !important"
    },
    cardContent: {
        flexGrow: 1,
    }
});

class AssetGridCard extends React.Component
{
    render()
    {
        const classes = this.props.classes;
        let {asset} = this.props;

        return (
            <Grid item key={asset.id} xs={12} sm={6} md={4}>
                <FadeIn>
                    <Card className={classes.card} onClick={() => this.openCardDetails(asset.id)}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={asset.img}
                            title={asset.name}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="subtitle1" component="h2">
                                {asset.name}
                            </Typography>
                            <GrayText gutterBottom variant="subtitle2">
                                {asset.category}
                            </GrayText>
                            {/*<Typography variant={"body2"}>*/}
                            {/*    {asset.description}*/}
                            {/*</Typography>*/}
                        </CardContent>
                    </Card>
                </FadeIn>
            </Grid>
        );
    }

    openCardDetails(id)
    {
        // Without refreshing
        navigate(`/asset/${id}`).then(value => {
            console.log("visited")
        })
    }
}

export default withStyles(useStyles)(AssetGridCard)