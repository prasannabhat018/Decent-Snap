import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import web3 from 'web3';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 400,
    height: 400,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

 var gridTileStyle={
   minWidth:'30%',
   maxWidth:'51%',
   minHeight:'400px',
   maxHeight:'600px',
   justifySelf:'center',
 }

 var imgStyle={
   maxWidth:'100%',
   maxHeight:'100%',
  // height:'100%',
  // width:'100%,'
 }

export default function TitlebarGridList(props) {
  const classes = useStyles();

  return (
    <div class="flex">
    <div className={classes.root}>
      {/* <GridList cellHeight={300} cellWidth={300} className={classes.gridList}> */}
        {props.images.map((image,key) => (
          <GridListTile key={key} cols={1} style={gridTileStyle}>
            <img style={ imgStyle } src={`https://ipfs.infura.io/ipfs/${image.hash}`} alt={"Can't load image"} />
            <GridListTileBar
              title={image.description}
              subtitle={<span>Author: {image.author} <br/>TipAmount: { parseInt(image.tipAmount)} Wei </span>}
              actionIcon={
                // <Button 
                //     variant="contained" 
                //     color="secondary"
                //     size="small"
                //     onClick={props.tipAuthor(image.id)}
                //     >
                //     {image.tipAmount} - Tip the author
                // </Button>
                <IconButton aria-label={`info about`} className={classes.icon}>
                  <MonetizationOnIcon
                    onClick={event=>{
                      let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(parseInt(image.id._hex), tipAmount)
                            props.tipAuthor(parseInt(image.id._hex), tipAmount)
                    }}
                  />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      {/* </GridList> */}
    </div>
    </div>
  );
}