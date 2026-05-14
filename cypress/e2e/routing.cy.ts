describe("Routing", () => {
  it("renders the about route when visited directly", () => {
    cy.visit("/sobre");

    cy.location("pathname").should("eq", "/sobre");
    cy.contains("h2", "Sobre").should("be.visible");
    cy.contains("p", "Exemplo simples de segunda rota com React Router.").should(
      "be.visible"
    );
  });

  it("redirects unknown routes to the user creation page", () => {
    cy.visit("/rota-inexistente");

    cy.location("pathname").should("eq", "/");
    cy.contains("h2", "Crie seu usuário").should("be.visible");
  });
});
