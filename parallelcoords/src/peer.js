import Peer from "peerjs";

const VRID = "vrxdPCVR3";
const DTID = "vrxdPCDT3";


export let desktopStream = null; 

export function desktopConnection(stream){

  let peer = new Peer(DTID);

  function connect() {
    const conn = peer.call(VRID, stream);

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

  const peer = new Peer(VRID);

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