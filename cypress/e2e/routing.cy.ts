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

  it("keeps the about route isolated from the user creation form", () => {
    cy.visit("/sobre");

    cy.contains("h2", "Sobre").should("be.visible");
    cy.contains("label", "Nome").should("not.exist");
    cy.contains("label", "Email").should("not.exist");
    cy.contains("label", "Password").should("not.exist");
    cy.contains("button", "Criar Usuário").should("not.exist");
  });

  it("redirects unknown routes to the user creation page", () => {
    cy.visit("/rota-inexistente/com/subrota");

    cy.location("pathname").should("eq", "/");
    cy.contains("h1", "CHSRC Construct").should("be.visible");
    cy.contains("h2", "Crie seu usuário").should("be.visible");
    cy.contains("h2", "Sobre").should("not.exist");
    cy.contains("p", "Exemplo simples de segunda rota com React Router.").should(
      "not.exist"
    );
  });

  it("replaces unknown routes in browser history", () => {
    cy.visit("/sobre");
    cy.visit("/rota-inexistente/com/subrota");

    cy.location("pathname").should("eq", "/");
    cy.go("back");
    cy.location("pathname").should("eq", "/sobre");
    cy.contains("h2", "Sobre").should("be.visible");
  });

  it("keeps the main route content after a browser reload", () => {
    cy.visit("/");
    cy.reload();

    cy.location("pathname").should("eq", "/");
    cy.contains("h2", "Crie seu usuário").should("be.visible");
    cy.contains("button", "Criar Usuário").should("be.visible");
  });

  it("keeps the about route content after a browser reload", () => {
    cy.visit("/sobre");
    cy.reload();

    cy.location("pathname").should("eq", "/sobre");
    cy.contains("h2", "Sobre").should("be.visible");
    cy.contains("button", "Criar Usuário").should("not.exist");
  });
});
