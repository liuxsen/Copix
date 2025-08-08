async function init() {
  const data = await window.electron.invoke('event:invoke', {event: 'event:invoke'})
  console.log(data);

  window.electron.send('event:send', {event: 'send'})

  window.electron.on('event:on', (e: any, data: any) => {
    console.log(data);
  })
}
init()