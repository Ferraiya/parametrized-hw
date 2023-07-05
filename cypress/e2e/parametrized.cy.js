describe('Parametrized tests', () => {
  beforeEach(()=>{
    cy.visit('/');

    cy.get('.theme-preview')
      .first()
      .click() 

   cy.get('[data-name="menu"]')
      .click()
   
   cy.get('[title="Forms"]')
      .click()
      
   cy.get('[title="Form Layouts"]')
      .click()

  })
  const tests = [{email: "cypress@gmail.com", password: "12gT\'A$$34.Qa6", check: 0} ,
   {email: "cypress@gmail.com", password: "true", check: 1}, 
   {email: "cypressgmail.com", password: "emailwithout@", check: 0}, 
   {email: "   ", password: "emptyemail", check: 1}, 
   {email: "cypress@gmail.com", password: "   ", check: 0}];

  tests.forEach(({email, password}) => {
      it(`Fill in form ${password} `, () => {
          cy.get('#inputEmail1')
             .clear()
             .type(email);

          cy.get('#inputPassword2')
             .clear()
             .type(password);

           cy.get('.inner-circle')
             .eq(check)
             .click()
          })
  })
})