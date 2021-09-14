import * as React from 'react';
import Typography from '@mui/material/Typography';
import Copyright from "./Copyright";
import {withStyles} from "@material-ui/core/styles";
import GrayText from "./StyleUtils";
import MonacoEditor from 'react-monaco-editor';
import {Card} from "@mui/material";
import {Button, CardContent, Paper} from "@material-ui/core";
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
    },

    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6)
    }
});

class AssetDetails extends React.Component {
    render() {
        const {classes, asset_id} = this.props;

        //TODO: query to get asset info from DB by asset_id
        const asset = {
            id: {asset_id},
            name: `Test Asset ${asset_id}`,
            category: "Food",
            description: "This is a test asset",
            author: "DiscordTag#7777",
            image: "https://source.unsplash.com/random/",
            votes: 999,
            publish_date: "date",
            mc_version: "Minecraft 1.13+",
            has_custom_texture: "no",
            json: "{ test: \"testing\"}",
            yml: `test:
  test2: "test3"`
        };


        const code = `
        {
            test: ""
        }`;
        const options = {
            selectOnLineNumbers: false,
            minimap: {
                enabled: false
            },
            glyphMargin: false,
            folding: false,
            lineNumbers: "on",
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            readOnly: true,
            automaticLayout: true
        };

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography component="h5" variant="h5" align="center" gutterBottom>
                                    {asset.name}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.monacoContainer}>
                                <Typography component="h5" variant="h5" align="center" gutterBottom>
                                    Json Model
                                </Typography>
                                <MonacoEditor
                                    height="350"
                                    language="javascript"
                                    theme="vs-dark"
                                    value={asset.json}
                                    options={options}
                                    onChange={() => this.onChange}
                                    editorDidMount={this.editorDidMount}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.monacoContainer}>
                                <Typography component="h5" variant="h5" align="center" gutterBottom>
                                    IA YAML
                                </Typography>
                                <MonacoEditor
                                    height="350"
                                    language="yaml"
                                    theme="vs-dark"
                                    value={asset.yml}
                                    options={options}
                                    onChange={() => this.onChange}
                                    editorDidMount={this.editorDidMount}
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" align="center" paragraph>
                                    {asset.description}
                                </Typography>
                                <Container maxWidth="sm">
                                    <div className={classes.heroButtons}>
                                        <Grid container spacing={2} justifyContent="center">
                                            <Grid item>
                                                <Button variant="contained" color="primary">
                                                    Download
                                                </Button>
                                            </Grid>
                                            {/*<Grid item>*/}
                                            {/*    <Button variant="outlined" color="secondary">*/}
                                            {/*        Vote*/}
                                            {/*    </Button>*/}
                                            {/*</Grid>*/}
                                        </Grid>
                                        <br/>
                                        <CardMedia
                                            className={classes.image}
                                            image={asset.image}
                                            title=""
                                        />
                                    </div>
                                </Container>
                            </Paper>
                            <Paper className={classes.paper}>
                                <Typography align="left" paragraph>
                                    Author: {asset.author}
                                </Typography>
                                <Typography align="left" paragraph>
                                    Publish Date: {asset.publish_date}
                                </Typography>
                                <Typography align="left" paragraph>
                                    Minecraft Version: {asset.mc_version}
                                </Typography>
                                <Typography align="left" paragraph>
                                    Custom Textures: {asset.has_custom_texture}
                                </Typography>
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