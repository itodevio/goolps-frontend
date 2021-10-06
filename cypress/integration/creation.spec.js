/// <reference types="cypress" />


describe("Creation Test", () => {
  it("should create a new ingredient", () => {
    const randomNumber = Math.floor(Math.random() * 101);
    cy.visit("http://localhost:3000/ingredients");
    cy.get("button").contains("Novo Ingrediente").click();
    cy.get("input[id='name']").type(`Test Ingredient ${randomNumber}`);
    cy.get("input[id='qtt']").type(randomNumber);
    cy.get("textarea[id='description']").type("Ingredient creation test");
    cy.get("button[type='submit']").click();
  });
  it("should create a new Product", () => {
    const randomNumber = Math.floor(Math.random() * 101);
    cy.visit("http://localhost:3000/products");
    cy.get("button").contains("Novo Produto").click();
    cy.get("input[id='name']").type(`Test Product ${randomNumber}`);
    cy.get("input[id='price']").type(randomNumber);
    cy.get("input[id='category']").type("Test Item");
    cy.get("textarea[id='description']").type("Ingredient creation test");
    cy.get("button[type='submit']").click();
  });
  it("should create a new Order", () => {
    const randomNumber = Math.floor(Math.random() * 11);
    cy.visit("http://localhost:3000/");
    cy.get("button").contains("Novo Pedido").click();
    cy.get("input[id='tableNumber']").type(randomNumber);
    cy.get("input[id='changeFor']").type(randomNumber);
    cy.get("textarea[id='note']").type("Interfone quebrado");
    cy.get("button").contains("Adicionar produto").click();
    cy.get("button").contains("Adicionar ao carrinho").first().click();
    cy.get("button[type='submit']").click();
  });
});
