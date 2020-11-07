import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Identicon from 'react-identicons';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LinkedCameraIcon from '@material-ui/icons/LinkedCamera';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <LinkedCameraIcon/>
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            DECENT-SNAP
          </Typography>
          <IconButton className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography align="right" variant="subtitle2" className={classes.title}>
            {props.account}
          </Typography>
          <Box>
            {/* <Identicon string={props.account}/> */}
            
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}