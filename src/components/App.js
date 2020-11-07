import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import DecentSnap from '../abis/DecentSnap.json'
import Navbar from './Navbar'
import Main from './Main'
import DisplayGrid from './DisplayGrid'

// import ipfs from 'ipfs-http-client'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })


class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockChainData()
  }

  
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  refreshPage(){
    // window.location.reload(false);
  }

  async loadBlockChainData(){
    this.setState({loading:true})
    //this is for to get the network to which the blockchain browser is connected to
    const web3=window.web3
    //returns all the accounts but all the main account is at the 0th position
    const accounts = await web3.eth.getAccounts()
    this.setState({account:accounts[0]})
    //get the network id
    const networkId = await web3.eth.net.getId()
    //get data from that specific network
    const networkData = DecentSnap.networks[networkId]
    // console.log(networkData)
    if(networkData){
      
      //get the contract properly - here we actually already have the javascript version but to see if the abi is present at the given address
      const decentsnap = new web3.eth.Contract(DecentSnap.abi,networkData.address)
      // console.log(decentsnap)
      this.setState({decentsnap})
      //get the images count each time the page refreshes
      const imagesCount = await this.state.decentsnap.methods.imageCount().call()
      this.setState({ imagesCount })

      for(var i=1;i<=imagesCount;i++){
        const image = await this.state.decentsnap.methods.images(i).call()
        this.setState({
          images:[...this.state.images,image]
        })
      }
      this.setState({
        images:this.state.images.sort((a,b)=>b.tipAmount - a.tipAmount)
      })

      this.setState({loading:false})
    }
    else{
      window.alert("Error the required smart contract is not deployed on this network")
    }
  }

  //this actually preprocesses the file but file can be readed as that mentioned but here for ipfs we need to have data in someform
  handleNewImage=event=>{
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      // console.log('buffer', this.state.buffer)
    }
  }

tipAuthor(id,tipAmount){
    // this.setState({loading:true})
    this.state.decentsnap.methods.tipImageOwner(id).send({from:this.state.account,value: tipAmount}).on('transanctionHash',(hash)=>{
      // this.setState({loading:false})
      this.refreshPage()
    })
}

  uploadImage=description=>{
    console.log("Submitting file to ipfs...")
    ipfs.add(this.state.buffer,(error,result)=>{
      console.log('IPFS result',result)
      if(error){
        console.log(error)
        return 
      }
      this.setState({loading:true})
      this.state.decentsnap.methods.uploadImage(result[0].hash,description).send({from:this.state.account}).on('transactionHash',(hash)=>{
        console.log('Im on the blockchain now');
        this.setState({loading:false})
        this.refreshPage()
      })
    })
  }

  clearImage=()=>{
    this.setState({buffer:null})
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      decentsnap:null,
      images:[],
      imagesCount:0,
      loading:false,
      picture:null,
    }
    this.handleNewImage = this.handleNewImage.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.clearImage = this.clearImage.bind(this)
    this.tipAuthor = this.tipAuthor.bind(this)
    this.refreshPage = this.refreshPage.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <br></br>
        {
          this.state.loading ?
            <Typography component="div" align='center'>
              <Box fontSize="subtitle2" m={1}>
                  Loading...
              </Box>
            </Typography>:
            <div>

              <Main
                handleImage={this.handleNewImage}
                uploadImage={this.uploadImage}
                clearImage={this.clearImage}
                refreshPage={this.refreshPage}
              />
              <br></br>
              <DisplayGrid
                images={this.state.images}
                tipAuthor={this.tipAuthor}

              />

            </div>
        }
        
      </div>
    );
  }
}

export default App;