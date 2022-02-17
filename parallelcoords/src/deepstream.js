const { DeepstreamClient } = window.DeepstreamClient


//local tunnel
//export const client = new DeepstreamClient('wss://great-crab-26.loca.lt')

//local host
export const client = new DeepstreamClient('localhost:6020')

//live server
//export const client = new DeepstreamClient('wss://great-crab-26.loca.lt')

client.login()