describe('Testes Basicos Cypress', () =>{
    beforeEach(() => {
        cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html')
        cy.viewport(1000, 800)
    })
    it('Preencher o formulario', () =>{
        const name = 'lucas'
        const lastname = 'Dias'

        cy.get('#first-name').type(name)
        cy.get('#last-name').type(lastname)
        cy.get('#email').type('lucas@testes.com')
        cy.get('#ticket-quantity').select('2')
        cy.get('#vip').check()
        cy.get('#publication').check()
        cy.get('#requests').type('Testes com cypress básico')
        cy.get('#agree').check()
        cy.get('#signature').type('Teste Teste')
        cy.get('.active').click()

        cy.get('.success > p').should('be.visible').and('have.text', 'Ticket(s) successfully ordered.')

    });
    it('Resetar o formulario', () => {
        const name = 'lucas'
        const lastname = 'Dias'

        cy.get('#first-name').as('name').type(name)
        cy.get('#last-name').as('lastName').type(lastname)

        cy.get('.reset').click()

        cy.get('@name').should('not.contain', name)
        cy.get('@lastName').should('not.contain', lastname)
    });
    it('Preencher o formulario com commands', () => {
        const customer ={
            name: 'Lucas',
            lastname: 'Dias',
            email: 'lucas@teste.com'
        }
        cy.preencherformulario(customer)

        cy.get('.success > p').should('be.visible').and('have.text', 'Ticket(s) successfully ordered.')
    });
})