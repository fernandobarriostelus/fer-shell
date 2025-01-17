export declare global {
  namespace Cypress {
    interface Chainable {
      visitWithLocale: (url: string, options: Partial<Cypress.VisitOptions>) => Chainable<Element>
    }
  }
}
