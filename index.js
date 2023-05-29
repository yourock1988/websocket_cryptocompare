const WebSocket = require('websocket').w3cwebsocket
const WSS_URL = 'wss://streamer.cryptocompare.com/v2'
const API_KEY = '026748fd6d416e23e30db2f2109e50eb476e1bbed2dc27dc70d568f08c8dd66c'
const socket = new WebSocket(`${WSS_URL}?api_key=${API_KEY}`)

socket.onmessage = (e) => {
  const {FROMSYMBOL: tickerName, PRICE: tickerPrice} = JSON.parse(e.data)
  if (tickerName) {
    console.log(tickerName, tickerPrice)
  }
  else {
    console.log(e.data)
  }
}

setTimeout(subscribeToBTC, 3000)
setTimeout(unsubscribeFromBTC, 15000)

function subscribeToBTC() {
  console.log('SUBSCRIBE')
  const message = JSON.stringify({
    "action": "SubAdd",
    "subs": ["5~CCCAGG~BTC~USD"]
  })
  sendToWebsocket(message)
}

function unsubscribeFromBTC() {
  console.log('!!!UNSUBSCRIBE!!! ???')
  const message = JSON.stringify({
    "action": "SubRemove",
    "subs": ["5~CCCAGG~BTC~USD"]
  })
  sendToWebsocket(message)
}

function sendToWebsocket(message) {
  if (socket.readyState === socket.OPEN) {
    socket.send(message)
    return
  }
  socket.addEventListener('open', () => socket.send(message), {once: true})
}
