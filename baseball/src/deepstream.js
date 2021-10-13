const { DeepstreamClient } = window.DeepstreamClient



export const client = new DeepstreamClient('wss://tasty-frog-73.loca.lt')

//export const client = new DeepstreamClient('localhost:6020')

client.login()