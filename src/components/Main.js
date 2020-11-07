import React, { Component } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Identicon from 'identicon.js';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from 'react-bootstrap';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';


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
class Main extends Component {
  
  constructor(props){
    super(props)
    this.state={
      description:''
    }
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleSubmit=event=>{

    event.preventDefault()
    this.props.uploadImage(this.state.description)
    this.setState({description:''})
    this.props.clearImage()
    this.props.refreshPage()
  }

  handleChange=event=>{
    this.setState({description:event.target.value})
  }

  render() {
    return (
      <div>
        <form>
          <Container maxWidth="sm">
            <Typography component="div" align='center'>
              <Box fontSize="h5.fontSize" fontWeight="fontWeightBold" m={1}>
                  SHARE IMAGE
              </Box>
            </Typography>
            <br></br>
            <Button
                variant="contained"
                component="label"
                fullWidth={true}
              >
                SELECT FILE
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .gif, .bmp"
                onChange={this.props.handleImage}
                style={{ display: "none" }}
                required
              />
            </Button>
            <br></br>
            <br></br>
            <Box 
              fontSize="h7.fontSize" 
              fontWeight="fontWeightBold" 
              m={1}
              value={this.state.description}
              onChange={this.handleChange}
            >
                  DESCRIPTION
              </Box>
            <TextField 
              id="outlined-basic" 
              label="Description" 
              variant="outlined" 
              fullWidth={true}
              value={this.state.description}
              onChange={this.handleChange}
              required
            />
            <br></br>
            <br></br>
            <Button 
              variant="contained" 
              color="primary"
              fullWidth={true}
              size="large"
              onClick={this.handleSubmit}
            >
              Upload Image
            </Button>
          </Container>

        </form>
      </div>
    );
  }
}

export default Main;