import React from "react";
import Grid from "@material-ui/core/Grid";
import FadeIn from "react-fade-in";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import GrayText from "./StyleUtils";
import {withStyles} from "@material-ui/core/styles";

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
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    }
});

class AssetGridCard extends React.Component {
    render() {
        const classes = this.props.classes;
        let {index, asset} = this.props;

        return (
            <Grid item key={index} xs={12} sm={6} md={4}>
                <FadeIn>
                    <Card className={classes.card} onClick={() => this.openCardDetails(asset.id)}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={asset.image}
                            title={asset.name}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="subtitle1" component="h2">
                                {asset.name}
                            </Typography>
                            <GrayText gutterBottom variant="subtitle2">
                                {asset.category}
                            </GrayText>
                            <Typography variant={"body2"}>
                                {asset.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </FadeIn>
            </Grid>
        );
    }

    openCardDetails(id) {
        //without refreshing
        // navigate(`/asset/${id}`).then(value => {
        //     console.log("visited")
        // })
        window.open(`/asset/${id}`);
    }
}

export default withStyles(useStyles)(AssetGridCard)