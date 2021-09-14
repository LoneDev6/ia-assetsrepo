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

const genPlaceholderAsset = () => {
    let votes = getRandomInt(0, 50)
    let id = getRandomInt(10, 99999)
    return {
        id: id,
        name: `Test Asset ${id}`,
        category: "Food",
        description: "This is a test asset",
        author: "DiscordTag#7777",
        image: "https://source.unsplash.com/random/",
        votes: votes
    }
};

const genPlaceholderAssets = (count) => {
    let arr = [];
    for(let i=0; i < count ; i++)
    {
        arr.push(
            genPlaceholderAsset()
        )
    }
    return arr
}

class AssetsGrid extends React.Component {
    state = {
        items: genPlaceholderAssets(21)
    };

    fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            this.setState({
                items: this.state.items.concat(genPlaceholderAssets(21))
            });
        }, 1500);
    };

    render() {
        const classes = this.props.classes;

        return (
            <React.Fragment>
                <main>
                    <Container className={classes.cardGrid} maxWidth="md">
                        <InfiniteScroll
                            dataLength={this.state.items.length}
                            next={this.fetchMoreData}
                            hasMore={true}
                            loader={<LinearProgress/>}
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