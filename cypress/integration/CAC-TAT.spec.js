/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  // it('preenche os campos obrigatórios e envia o formulário', function() {
  //   const longText = 'Teste, teste ,teste, teste, teste ,teste, teste, teste ,teste, teste, teste, teste ,teste, teste, teste, teste ,teste, teste, teste, teste ,teste, teste'
  //   cy.get('#firstName').type('Alexandre');
  //   cy.get('#lastName').type('Costa');
  //   cy.get('#email').type('alexandre.costa22@outlook.com');
  //   cy.get('#open-text-area').type(longText, { delay: 0});

  //   cy.get('button[type="submit"]').click();
  // });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#email').type('Isso não é um email')
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
    cy.get('#phone')
      .type('testestestest')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Alexandre');
    cy.get('#lastName').type('Costa');
    cy.get('#phone-checkbox').check()
    cy.get('#email').type('alexandre.costa22@outlook.com');
    cy.get('#open-text-area').type('testestesteteset', { delay: 0});
    cy.get('button[type="submit"]').click();

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName').type('Alexandre').clear().should('have.value', '');
    cy.get('#lastName').type('Costa').clear().should('have.value', '');
    cy.get('#phone').type('2345678').clear().should('have.value', '');
    cy.get('#email').type('alexandre.costa22@outlook.com').clear().should('have.value', '');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado ', function(){
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture('example').as('sampleFile')
      cy.get('input[type="file"]').selectFile('@sampleFile')
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  // it('acessa a página de política de privacidade removendo o target e então abre', function(){
  //   cy.get('#privacy a').invoke('removeAttr', 'target').click()
  //   cy.contains('Talking About Testing').should('be.visible')
  // })
});
