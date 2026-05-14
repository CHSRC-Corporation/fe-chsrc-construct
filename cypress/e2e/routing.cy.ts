describe("Routing", () => {
  it("keeps the app header visible on the main route", () => {
    cy.visit("/");

    cy.location("pathname").should("eq", "/");
    cy.contains("h1", "CHSRC Construct").should("be.visible");
    cy.get("main").within(() => {
      cy.contains("h2", "Crie seu usuário").should("be.visible");
    });
  });

  it("renders the about route when visited directly", () => {
    cy.visit("/sobre");

    cy.location("pathname").should("eq", "/sobre");
    cy.contains("h1", "CHSRC Construct").should("be.visible");
    cy.contains("h2", "Sobre").should("be.visible");
    cy.contains("p", "Exemplo simples de segunda rota com React Router.").should(
      "be.visible"
    );
  });

  it("redirects unknown routes to the user creation page", () => {
    cy.visit("/rota-inexistente/com/subrota");

    cy.location("pathname").should("eq", "/");
    cy.contains("h1", "CHSRC Construct").should("be.visible");
    cy.contains("h2", "Crie seu usuário").should("be.visible");
  });
});
