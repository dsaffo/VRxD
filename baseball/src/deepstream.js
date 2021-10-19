const { DeepstreamClient } = window.DeepstreamClient



//export const client = new DeepstreamClient('wss://nervous-snake-30.loca.lt')

export const client = new DeepstreamClient('localhost:6020')

client.login()