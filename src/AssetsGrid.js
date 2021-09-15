import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import InfiniteScroll from "react-infinite-scroll-component";
import AssetsGridCard from "./AssetGridCard";
import {LinearProgress} from "@mui/material";
import getRandomInt from "./MathUtils";


//avoid restoring scroll position on refresh
global.history.scrollRestoration = "manual"

const useStyles = (theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    infiniteScroll: {
        overflowY: "hidden !important",
        overflowX: "hidden !important",
    }
});

class AssetsGrid extends React.Component {
    page = 0;
    state = {
        items: []
    };

    fetchMoreData = () => {

        fetch(`${process.env.REACT_APP_BACKEND}/api/assets/${this.page}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    items: this.state.items.concat(responseJson)
                });
            })
            .catch((error) => {
                console.error(error);
            });
        this.page++;
    };


    render() {
        const classes = this.props.classes;

        if(this.page === 0)
            this.fetchMoreData(); //TODO: errors catching and stuff

        return (
            <React.Fragment>
                <main>
                    <Container className={classes.cardGrid} maxWidth="md">
                        <InfiniteScroll
                            dataLength={this.state.items.length}
                            next={this.fetchMoreData}
                            hasMore={true}
                            // loader={<LinearProgress/>}
                            className={classes.infiniteScroll}
                        >
                            <Grid container spacing={4}>
                                {this.state.items.map((asset, index) => (
                                    <AssetsGridCard
                                        asset={asset}
                                        index={index}
                                    />
                                ))}
                            </Grid>
                        </InfiniteScroll>
                    </Container>
                </main>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(AssetsGrid)