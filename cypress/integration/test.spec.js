describe('Testes Basicos Cypress', () =>{

    beforeEach(() => {
        cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html')
        //dimensões da tela
        cy.viewport(1000, 800)
    })
    it('Preencher o formulario', () =>{
        const name = 'lucas'
        const lastname = 'Dias'

        //Mepeamento do elementos
        cy.get('#first-name').type(name)
        cy.get('#last-name').type(lastname)
        cy.get('#email').type('lucas@testes.com')
        cy.get('#ticket-quantity').select('2')
        cy.get('#vip').check()
        cy.get('#publication').check()
        cy.get('#requests').type('Testes com cypress básico')
        cy.get('#agree').check()
        cy.get('#signature').type('Teste Teste')
        cy.screenshot('antes-de-submeter-o-form-c1')

        //Botão de submeter o form
        cy.get('.active').click()

        //verificação da mensagem de sucesso
        cy.get('.success > p').should('be.visible').and('have.text', 'Ticket(s) successfully ordered.')
        cy.screenshot('depois-de-submeter-o-form-c1')
    });
    it('Resetar o formulario', () => {
        const name = 'lucas'
        const lastname = 'Dias'

        cy.get('#first-name').as('name').type(name)
        cy.get('#last-name').as('lastName').type(lastname)
        cy.screenshot('antes-de-submeter-o-form-c2')

        cy.get('.reset').click()

        //Verificação dos nomes não estão visiveis
        cy.get('@name').should('not.contain', name)
        cy.get('@lastName').should('not.contain', lastname)
        cy.screenshot('depois-de-submeter-o-form-c2')
    });
    it('Preencher o formulario com commands', () => {
        const customer ={
            name: 'Lucas',
            lastname: 'Dias',
            email: 'lucas@teste.com'
        }
        //Utilizando o comands/Metodos prontos para somente chamar
        cy.preencherformulario(customer)
        //verificação da mensagem de sucesso
        cy.get('.success > p').should('be.visible').and('have.text', 'Ticket(s) successfully ordered.')
    });
})