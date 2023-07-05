const windowHeight = Cypress.config('viewportHeight');
const windowWidth = Cypress.config('viewportWidth');

describe('Parametrized tests', () => {

   beforeEach(()=>{
        cy.visit('/');
        cy.get('.theme-preview')
            .eq(1)
            .click()
    
        cy.get('[data-name="menu"]')
            .click()
        
        cy.get('[title="Modal & Overlays"]')
            .click()
            
        cy.get('[title="Toastr"]')
            .click()
        
        cy.contains('Random toast')
            .should('be.visible')
  
    })
    const tests = [
        {
            testData: {
                position: 'top-right',
                title: 'Top right position danger',
                content: 'Top right position - content',
                type: 4,
            },
            expected: {
                color: 'rgb(176, 0, 32)',
                icon:'[data-name=\"flash"\]',
                funcPosition: () => {
                    cy.get('nb-toast').then(($element) => {
                        const elementRect = $element[0].getBoundingClientRect();
                    
                        expect(elementRect.top).to.be.lessThan(10); 
                        expect(elementRect.left).to.be.greaterThan(windowWidth - 10 - elementRect.width); 
                    });
                } 
            }
        },
        {
            testData: {
                position: 'top-left',
                title: 'Top left position warning ',
                content: 'Top left position - content',
                type: 3,
            },
            expected: {
                color: 'rgb(255, 159, 5)',
                icon:'[data-name=\"alert-triangle\"]',
                funcPosition: () => {
                    cy.get('nb-toast').then(($element) => {
                        const elementRect = $element[0].getBoundingClientRect();
                        expect(elementRect.top && elementRect.left).to.be.lessThan(10); 
                      });
                  } 
            }
        },
        {
            testData: {
                position: 'bottom-left',
                title: 'Bottom left position info ',
                content: 'Bottom left position - content',
                type: 2,
            },
            expected: {
                color: 'rgb(4, 149, 238)',
                icon:'[data-name="question-mark"]',
                funcPosition: () => {
                     cy.get('nb-toast').then(($element) => {
                         const elementRect = $element[0].getBoundingClientRect();
                         expect(elementRect.top).to.be.greaterThan(windowHeight - 10 - elementRect.height); 
                         expect(elementRect.left).to.be.lessThan(10); 
                          });
                      } 
                }
        },
        {
            testData: {
                position: 'bottom-right',
                title: 'Bottom right position success',
                content: 'Bottom right position - content',
                type: 1,
            },
            expected: {
                color: 'rgb(96, 175, 32)',
                icon:'[data-name="checkmark"]',
                funcPosition: () => {
                     cy.get('nb-toast').then(($element) => {
                         const elementRect = $element[0].getBoundingClientRect();
                         expect(elementRect.top).to.be.greaterThan(windowHeight - 10 - elementRect.height); 
                         expect(elementRect.left).to.be.greaterThan(windowWidth - 10 - elementRect.width); 
                              });
                }
            }
        }
    ];
 
   tests.forEach(({testData, expected}) => {

       it(`Check toaster ${testData.title} `, () => {
           cy.contains('top-right')
                .click()
           cy.contains(testData.position)
                .click();

           cy.get('[name="timeout"]')
                .click()
                .clear()
                .type(5000)
                

           cy.get('input[ng-reflect-name="title"]')
                .clear()
                .type(testData.title);

            cy.get('input[name="content"]')
                .clear()
                .type(testData.content);
 
            cy.contains('primary')
                .click()
                .get('nb-option')
                .eq(testData.type)
                .click()
                
            cy.get('button')
                .contains('Show toast')
                .click()

            cy.get(expected.icon).should('be.visible');

            cy.get('nb-toast span').then(toast=>{
                expect(toast).to.include.text(testData.title);
            })
            cy.get('nb-toast .message').then(text=>{
                expect(text).to.include.text(testData.content);
            })

            cy.get('nb-toast').invoke('css', 'background-color').then (($el) => 
                expect($el).to.equal(expected.color))

            expected.funcPosition()   
           })
    })
})

