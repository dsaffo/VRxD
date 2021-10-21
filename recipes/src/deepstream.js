const { DeepstreamClient } = window.DeepstreamClient



export const client = new DeepstreamClient('wss://rare-firefox-83.loca.lt')

//export const client = new DeepstreamClient('localhost:6020')

client.login()