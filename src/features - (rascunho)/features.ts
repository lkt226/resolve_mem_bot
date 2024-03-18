// Esse documento deve fazer a conexão entre as outras funcionalidades do projeto

import dotenv from 'dotenv'
dotenv.config()

import getRandomMessage from './getRandomMessage'
import sendMessage from './sendMessage'
import getChatIdWithUser from './getChatIdWithUser'


import deleteMessage from './deleteMessage'
import runAfter from './runAfter'

const chatIdTest = process.env.CHAT_ID_TEST || ''
let randomMessageSelected: string = ''
let createdMessageId: number|null = null

describe('Integrate all functions', () => {
  it ('get chatId with user --> chatId is valid', async () => {
    await getChatIdWithUser(chatIdTest)
  })

  it ('select random message in data -->  random text in data', () => {
    const data = ['message 1', 'message 2', 'message 3']
    randomMessageSelected = getRandomMessage(data)
    expect(data).toContain(randomMessageSelected)
  })

  it ('send message to user --> user receive one message', async () => {
    const receivedMessage =  await sendMessage(chatIdTest, randomMessageSelected)
    createdMessageId = receivedMessage.message_id
    expect(randomMessageSelected).toBe(receivedMessage.text)
  })
  
  it ('delete message after 1 second --> message deleted', () => {
    runAfter(async () => {
      if (!createdMessageId) throw new Error('Message not created')
      deleteMessage(chatIdTest ,createdMessageId)
    }, 1)
  })
  
  it ('send a message to user in 2 second --> user receive one message', () => {
    runAfter(async () => {
      const receivedMessage =  await sendMessage(chatIdTest, randomMessageSelected)
      createdMessageId = receivedMessage.message_id
      expect(randomMessageSelected).toBe(receivedMessage.text)
    }, 2)
  })
  
  it.todo ('alert to user if he not send a message in 1 second --> user receive one message')
  
  it.todo ('receive a voice message by user --> has one .OGG archive in storage')
  it.todo ('transcription of voice message --> has one transcription in database')
  it.todo ('delete .OGG archive --> archive delete')
  it.todo ('clear the storage --> storage is empty')
  it.todo ('validate the transcription --> transcription is correct')

  it.todo ('create a report --> has one report in database')
})