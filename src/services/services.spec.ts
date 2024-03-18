describe ('Rotina de execução padrão a aplicação', () => {

  //Identifier
  // it.todo ('Verificar se o usuario está cadastrado no db e retorna o id do chat dele')

  //Questioner
  describe('Ciclo de vida do primeiro envio do dia', () => {
    // it.todo ('Escolher de forma aleatória uma mensagem do banco de frases')
    // it.todo ('Salvar a mensagem enviada no banco de dados')
    // it.todo ('Enviar a mensagem escolhida para o usuário')
    it.todo ('Esperar o usuário responder')
    it.todo ('Deletar a mensagem enviada')
  })

  describe('Ciclo de vida dos envios recorrentes', () => {
    // it.todo ('Enviar uma mensagem para o usuário')
    it.todo ('Esperar o usuário responder')
    it.todo ('Alertar o usuário caso ele não responda em alguns minutos')
  })
  
  //Colector
  it.todo ('Verificar se o usuário enviou um áudio')
  it.todo ('Baixar o áudio enviado pelo usuário')

  //Receiver
  it.todo ('Transcrever o audio para texto')
  it.todo ('Salvar o texto no banco de dados')
  it.todo ('Delete o áudio do servidor')

  //Examiner
  describe('Ciclo de vida da análise da resposta no dia', () => {
    it.todo ('Pegar todas as respostas do usuário no dia')
    it.todo ('Comparar individualmente com a mensagem enviada')
    it.todo ('Criar um relatório com os tempos e a média de acerto das respostas')	
    it.todo ('Salvar a média no banco de dados')
    it.todo ('Enviar a média para o usuário')
  })

  describe('Ciclo de vida da análise da resposta na semana', () => {
    it.todo ('Pegar os relatórios do usuário que foram feitos na semana')
    it.todo ('Criar um relatório semanal com as médias por tempo')
    it.todo ('Salvar o relatório semanal no banco de dados')
    it.todo ('Enviar o relatório semanal para o usuário')
  })
})