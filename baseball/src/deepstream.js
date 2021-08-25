const { DeepstreamClient } = window.DeepstreamClient

export const client = new DeepstreamClient('wss://ugly-goose-83.loca.lt')

client.login()