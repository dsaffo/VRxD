const { DeepstreamClient } = window.DeepstreamClient

export const client = new DeepstreamClient('localhost:6020')

client.login()