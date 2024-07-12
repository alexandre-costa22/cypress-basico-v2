// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Alexandre').should('have.attr', 'type', 'text');
    cy.get('#lastName').type('Costa');
    cy.get('#email').type('alexandre.costa22@outlook.com');
    cy.get('#product').select(1).should('have.value', 'blog');
    ///cy.get('input[type="radio"][value="feedback"]').check().should('be.checked');///
    cy.get('input[type="radio"]').each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
    })
    cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
    cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}).should(function($input) {
    expect($input[0].files[0].name).to.equal('example.json')
    })
    cy.get('#open-text-area').type('testestesteteset', { delay: 0});
    cy.contains('button', 'Enviar').click();
})
