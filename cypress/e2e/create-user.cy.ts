describe("Create user page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the current user creation form", () => {
    cy.contains("h1", "CHSRC Construct").should("be.visible");
    cy.contains("h2", "Crie seu usuário").should("be.visible");
    cy.contains(
      "p",
      "Por favor, preencha os campos abaixo para criar seu usuário."
    ).should("be.visible");

    cy.get("#input-nome")
      .should("be.visible")
      .and("have.attr", "placeholder", "Digite seu nome");

    cy.get("#input-email")
      .should("be.visible")
      .and("have.attr", "placeholder", "Digite seu email");

    cy.get("#input-password")
      .should("be.visible")
      .and("have.attr", "placeholder", "Digite sua senha");

    cy.contains("button", "Criar Usuário")
      .should("be.visible")
      .and("be.enabled");
  });

  it("allows filling the visible fields without submitting data", () => {
    cy.get("#input-nome")
      .type("Mateus Souza")
      .should("have.value", "Mateus Souza");
    cy.get("#input-email")
      .type("mateus@example.com")
      .should("have.value", "mateus@example.com");
    cy.get("#input-password")
      .type("SecurePass123!")
      .should("have.value", "SecurePass123!");

    cy.contains("button", "Criar Usuário").click();
    cy.contains("h2", "Crie seu usuário").should("be.visible");
  });
});
