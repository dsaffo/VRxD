import Peer from "peerjs";


export function peerConenction(clientID, peerID){
  
  const peer = new Peer(clientID)

  peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);

    peer.on('connection', function(conn) { 
      console.log("connection made", conn.peer);
    });

    console.log("connecting to" + peerID);
    const conn = peer.connect(peerID);

    conn.on('open', function() {
      // Receive messages
      conn.on('data', function(data) {
        console.log('Received', data);
      });
    
      // Send messages
      conn.send('Hello!');
    });

    
  })

  


}