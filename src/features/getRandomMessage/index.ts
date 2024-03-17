const getRandomMessage = (listMessages: string[]):string => {
  const randomIndex = Math.floor(Math.random() * listMessages.length)
  return listMessages[randomIndex]
}

export default getRandomMessage