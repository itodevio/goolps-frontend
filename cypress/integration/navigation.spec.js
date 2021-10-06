/// <reference types="cypress" />

describe("Navigation Test", () => {
  it("should navigate to the Ingredients page", () => {
    cy.visit("http://localhost:3000/");
    cy.get('a[href*="ingredients"]').click();
    cy.url().should("include", "/ingredients");
    cy.get("h1").contains("Ingredientes");
  });
  it("should navigate to the Products page", () => {
    cy.get('a[href*="products"]').click();
    cy.url().should("include", "/products");
    cy.get("h1").contains("Produtos");
  });
  it("should navigate to the Orders page", () => {
    cy.get('a[href="/"]').first().click();
    cy.url().should("include", "/");
    cy.get("h1").contains("Pedidos");
  });
});
