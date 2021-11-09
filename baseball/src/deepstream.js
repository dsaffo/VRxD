const { DeepstreamClient } = window.DeepstreamClient



export const client = new DeepstreamClient('wss://silent-ape-67.loca.lt')

//export const client = new DeepstreamClient('localhost:6020')

client.login()