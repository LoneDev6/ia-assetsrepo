import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import InfiniteScroll from "react-infinite-scroll-component";
import AssetsGridCard from "./AssetGridCard";

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

class AssetsGrid extends React.Component
{
    page = 0;
    state = {
        items: []
    };

    componentDidMount()
    {
        this.fetchMoreData(false); //TODO: errors catching and stuff
    }

    fetchMoreData = (incrementPage = true) => {

        fetch(`${process.env.DATA_REPO_URL}assets.json`)
            .then((response) => response.json())
            .then(async (json) => {
                let assetsNames = json.list;
                assetsNames = assetsNames.slice(this.page * 21, (this.page + 1) * 21);

                let assetsArray = [];

                console.log("Loading assets...")

                await this.asyncForEach(assetsNames, async (assetName) => {
                    try
                    {
                        await fetch(`${process.env.DATA_REPO_URL}${assetName}/info.json`)
                            .then((response) => response.json())
                            .then((assetData) => {
                                assetData.img = `${process.env.DATA_REPO_URL}${assetData.id}/preview/img.png`;
                                assetsArray.push(assetData)

                                console.log("fetch")
                            })
                    } catch (err) //not only 404... TODO: handle other type of errors
                    {
                        console.error(`Error loading resource info.json for: ${assetName}`);
                    }
                })

                this.setState({
                    items: this.state.items.concat(assetsArray)
                });

                if (incrementPage)
                    this.page++;

            })
            .catch((error) => {
                console.error(error);
            });
    };

    render = () => {
        const classes = this.props.classes;

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

    async asyncForEach(array, callback)
    {
        for (let index = 0; index < array.length; index++)
        {
            await callback(array[index], index, array);
        }
    }
}

export default withStyles(useStyles)(AssetsGrid)