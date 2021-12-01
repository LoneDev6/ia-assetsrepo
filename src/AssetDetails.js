import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';

import {Button, CircularProgress, Paper} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@mui/material/Typography';

import Copyright from "./Copyright";
import GrayText from "./StyleUtils";

const useStyles = (theme) => ({

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
    },

    root: {
        flexGrow: 1,
        overflowX: "clip !important" //total shit
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    monacoContainer: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },

    image: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        "background-size": "auto !important"
    },

    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6)
    }
});

class AssetDetails extends React.Component
{
    state = {
        loadedData: false
    }

    constructor(props)
    {
        super(props);

        this.monacoYamlRef = React.createRef();
        this.monacoJsonRef = React.createRef();
    }

    componentDidMount()
    {
        fetch(`/uploads/${this.props.asset_id}/info.json`)
            .then(res => res.json())
            .then((json) => {
                this.setState(
                    {
                        asset: json,
                        assetImageUrl: "/uploads/" + this.props.asset_id + "/preview/img.png",
                        loadedData: true
                    }
                )
            })
            .catch((error) => {
                console.error("componentDidMount error:");
                console.error(error);
            });

        fetch(`/uploads/${this.props.asset_id}/preview/model.json`)
            .then(res => res.text())
            .then((body) => {
                console.log(body)
                //TODO: check if the model exists or if the item has no model.
                this.monacoJsonRef.current.editor.setValue(body)

            })
            .catch((error) => {
                console.error("Error loading JSON data.");
                console.error(error);
            });

        fetch(`/uploads/${this.props.asset_id}/preview/ia.yml`)
            .then(res => res.text())
            .then((body) => {
                //TODO: check if the model exists or if the item has no model.
                this.monacoYamlRef.current.editor.setValue(body)

            })
            .catch((error) => {
                console.error("Error loading yml data.");
                console.error(error);
            });
    }

    render()
    {
        if (!this.state.loadedData)
        {
            return (
                <CircularProgress/>
            );
        }

        const {classes} = this.props;

        const options = {
            selectOnLineNumbers: false,
            minimap: {
                enabled: false
            },
            glyphMargin: true,
            folding: true,
            lineNumbers: "on",
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            readOnly: true,
            automaticLayout: true
        };

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Grid direction='row' container spacing={1}>
                        <Grid xs={6}>
                            <Paper className={classes.paper}>
                                <Typography component="h5" variant="h5" align="center" gutterBottom>
                                    {this.state.asset.name}
                                </Typography>
                                <Typography variant="h5" align="center" paragraph>
                                    {this.state.asset.description}
                                </Typography>
                                <Container maxWidth="sm">
                                    <div className={classes.heroButtons}>
                                        <Grid container spacing={2} justifyContent="center">
                                            <Grid>
                                                <Button variant="contained" color="primary" onClick={() => {
                                                    window.open(`/uploads/${this.state.asset.id}/data.zip`) //TODO: change the downloaded file name
                                                }}>
                                                    Download
                                                </Button>
                                            </Grid>
                                            {/*<Grid>*/}
                                            {/*    <TextField id="namespace" label="Namespace" defaultValue="example" />*/}
                                            {/*</Grid>*/}

                                            {/*<Grid>*/}
                                            {/*    <Button variant="outlined" color="secondary">*/}
                                            {/*        Vote*/}
                                            {/*    </Button>*/}
                                            {/*</Grid>*/}
                                        </Grid>
                                        <br/>
                                        <CardMedia
                                            className={classes.image}
                                            image={this.state.assetImageUrl}
                                            title=""
                                        />
                                    </div>
                                </Container>
                            </Paper>
                        </Grid>
                        <Grid xs={5}>
                            <Paper className={classes.monacoContainer}>
                                <Typography component="h5" variant="h5" align="center" gutterBottom>
                                    MC Json Model
                                </Typography>
                                <MonacoEditor
                                    ref={this.monacoJsonRef}
                                    height="350"
                                    language="javascript"
                                    theme="vs-dark"
                                    value={this.state.asset.json} //TODO: update this json with another ajax call
                                    options={options}
                                    onChange={() => this.onChange}
                                    editorDidMount={this.editorDidMount}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid direction='row' container spacing={1}>
                        <Grid xs={6}>
                            <Paper className={classes.paper}>
                                <Typography align="left" paragraph>
                                    Author: {this.state.asset.author}
                                </Typography>
                                <Typography align="left" paragraph>
                                    Publish Date: {this.state.asset.publish_date}
                                </Typography>
                                <Typography align="left" paragraph>
                                    Minecraft Version: {this.state.asset.mc_version}
                                </Typography>
                                <Typography align="left" paragraph>
                                    Custom Textures: {this.state.asset.has_custom_texture}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid xs={5}>
                            <Paper className={classes.monacoContainer}>
                                <Typography component="h5" variant="h5" align="center" gutterBottom>
                                    ItemsAdder config file
                                </Typography>
                                <MonacoEditor
                                    ref={this.monacoYamlRef}
                                    height="512"
                                    language="yaml"
                                    theme="vs-dark"
                                    value={this.state.asset.yml} //TODO: update this yml with another ajax call
                                    options={options}
                                    onChange={() => this.onChange}
                                    editorDidMount={this.editorDidMount}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <footer className={classes.footer}>
                    <GrayText variant="subtitle1" align="center" color="textSecondary" component="p">
                        Website by <a href="https://devs.beer/">devs🍺</a>
                    </GrayText>
                    <Copyright/>
                </footer>
            </React.Fragment>
        );
    }

    editorDidMount()
    {
        // global.monaco.editor.remeasureFonts()
    }
}

export default withStyles(useStyles)(AssetDetails)