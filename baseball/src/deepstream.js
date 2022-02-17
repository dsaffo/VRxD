const { DeepstreamClient } = window.DeepstreamClient



//export const client = new DeepstreamClient('wss://great-crab-26.loca.lt')

export const client = new DeepstreamClient('localhost:6020')

client.login()