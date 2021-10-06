const { DeepstreamClient } = window.DeepstreamClient



//export const client = new DeepstreamClient('wss://lazy-pug-47.loca.lt')

export const client = new DeepstreamClient('localhost:6020')

client.login()