pragma solidity ^0.5.0;

contract DecentSnap{
    
    uint public imageCount;

    string public name = "Prasanna";
    
    struct Image{
        uint id;
        string hash;
        string description;
        uint tipAmount;
        address payable author;
    }
    
    event ImageCreated(
        uint id,
        string hash,
        string description,
        uint tipAmount,
        address payable author
    );
    
    event ImageTipped(
        uint id,
        string hash,
        string description,
        uint tipAmount,
        address payable author
    );
    
    mapping(uint => Image) public images;

    function uploadImage(string memory _hash, string memory _description) public{
        
        //hash should be non null
        require(bytes(_hash).length>0);
        //description is mandatory
        require(bytes(_description).length>0);
        //image creator should be well defined
        require(msg.sender != address(0x0));
        
        imageCount++;
        images[imageCount] = Image(imageCount,_hash,_description,0,address(msg.sender));
        emit ImageCreated(imageCount,_hash,_description,0,address(msg.sender));
    }
    
    function tipImageOwner(uint _id) public payable{
        //check if id is valid
        require(_id>0 && _id<=imageCount);
        
           Image memory image = images[_id];
           address payable author = image.author;
           address(author).transfer(msg.value);
           image.tipAmount+=msg.value;
           images[_id]=image;
           emit ImageTipped(_id,image.hash,image.description,image.tipAmount,image.author);
    }
}