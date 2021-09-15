import * as React from 'react';
import {Suspense} from 'react';
import Typography from '@mui/material/Typography';
import Copyright from "./Copyright";
import {withStyles} from "@material-ui/core/styles";
import GrayText from "./StyleUtils";
import MonacoEditor from 'react-monaco-editor';
import {Card} from "@mui/material";
import {Button, CardContent, CircularProgress, Paper, TextField} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardMedia from '@material-ui/core/CardMedia';

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

class AssetDetails extends React.Component {
    state = {
        loadedData: false
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_BACKEND}/api/asset/info/${this.props.asset_id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ asset: responseJson, loadedData: true})
            })
            .catch((error) => {
                console.error("componentDidMount error:");
                console.error(error);
            });
    }

    render() {
        if(!this.state.loadedData)
            return (
                <CircularProgress />
            );

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
                                                <Button variant="contained" color="primary" onClick={() => { window.open(`${process.env.REACT_APP_BACKEND}/api/asset/download/${this.state.asset.id}`) }}>
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
                                            image={this.state.asset.img}
                                            title=""
                                        />
                                    </div>
                                </Container>
                            </Paper>
                        </Grid>
                        <Grid xs={5}>
                            <Paper className={classes.monacoContainer}>
                                <Typography component="h5" variant="h5" align="center" gutterBottom>
                                    Json Model
                                </Typography>
                                <MonacoEditor
                                    height="350"
                                    language="javascript"
                                    theme="vs-dark"
                                    value={this.state.asset.json}
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
                                    IA YAML
                                </Typography>
                                <MonacoEditor
                                    height="512"
                                    language="yaml"
                                    theme="vs-dark"
                                    value={this.state.asset.yml}
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

    editorDidMount() {
        // global.monaco.editor.remeasureFonts()
    }
}

export default withStyles(useStyles)(AssetDetails)