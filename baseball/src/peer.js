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


export let desktopStream = null; 

export function desktopConnection(stream){


  let peer = new Peer('vrxd1');

  function connect() {
    const conn = peer.call('vrxd2', stream);
  
    conn.on('open', function() {
      console.log('connection open')
    });
  }

  peer.on('error', function(err){ 
    console.log('failed trying again ', err)
    connect();
  });


  peer.on('open', function(id) {
    console.log("trying to connect");
    connect();
  });

}

export function vrConnection(){

  const peer = new Peer('vrxd2');

  peer.on('call', function(call) { 
    call.answer();
    console.log("stream connected");

    call.on('stream', function(stream){
      console.log("streaming", stream);
      var video = document.getElementById("videovr");
      video.srcObject = stream;
      desktopStream = stream;
    });
  });

  

} 