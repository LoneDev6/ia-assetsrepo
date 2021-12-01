import React from "react";

import './App.css';
import '@fontsource/roboto';
import AssetsGrid from "./AssetsGrid";

import {alpha, createTheme, ThemeProvider, withStyles} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import {navigate, Router} from "@reach/router";
import AssetDetails from "./AssetDetails";
import {HashRouter} from "react-router-dom";

const useStyles = (theme) => ({
    icon: {
        marginRight: theme.spacing(2),
        "&:hover": {
            cursor: "pointer"
        }
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    appbarTitle: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        "&:hover": {
            cursor: "pointer"
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    }
});

function App(props)
{
    const theme = createTheme({
        palette: {
            type: 'dark',
            primary: {
                main: "#381757"
            },
            secondary: {
                main: "#b16af4"
            },
            background: {
                default: "#140B25",
                paper: "#28164B"
            }
        }
    });

    const classes = props.classes;

    const returnToHome = () => {
        navigate("/").then(r => {
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="relative">
                <Toolbar>
                    <img src="/img/icon.png" alt="logo" className={classes.icon} onClick={() => {
                        returnToHome()
                    }}/>
                    <Typography variant="h6" color="inherit" noWrap className={classes.appbarTitle} onClick={() => {
                        returnToHome()
                    }}>
                        Assets Repository
                        <Typography color="inherit" noWrap onClick={() => {
                            returnToHome()
                        }}>
                            (alpha)
                        </Typography>
                    </Typography>

                    {/*<div className={classes.search}>*/}
                    {/*    <div className={classes.searchIcon}>*/}
                    {/*        <SearchIcon/>*/}
                    {/*    </div>*/}
                    {/*    <InputBase*/}
                    {/*        placeholder="Search…"*/}
                    {/*        classes={{*/}
                    {/*            root: classes.inputRoot,*/}
                    {/*            input: classes.inputInput,*/}
                    {/*        }}*/}
                    {/*        inputProps={{'aria-label': 'search'}}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </Toolbar>
            </AppBar>

            <HashRouter>
                <AssetsGrid path="/"/>
                <AssetDetails path="/asset/:asset_id"/>
            </HashRouter>

        </ThemeProvider>
    )
}

export default withStyles(useStyles)(App)