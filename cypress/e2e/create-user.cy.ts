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

  it("connects each label to the expected input", () => {
    cy.contains("label", "Nome")
      .should("have.attr", "for", "input-nome")
      .click();
    cy.focused().should("have.attr", "id", "input-nome");

    cy.contains("label", "Email")
      .should("have.attr", "for", "input-email")
      .click();
    cy.focused().should("have.attr", "id", "input-email");

    cy.contains("label", "Password")
      .should("have.attr", "for", "input-password")
      .click();
    cy.focused().should("have.attr", "id", "input-password");
  });

  it("allows editing and clearing typed values", () => {
    cy.get("#input-nome")
      .type("Mateus")
      .clear()
      .type("Ana")
      .should("have.value", "Ana");

    cy.get("#input-email")
      .type("old@example.com")
      .clear()
      .type("new@example.com")
      .should("have.value", "new@example.com");
  });

  it("keeps the current route and typed values after clicking the button", () => {
    cy.get("#input-nome").type("Mateus Souza");
    cy.get("#input-email").type("mateus@example.com");
    cy.get("#input-password").type("SecurePass123!");

    cy.contains("button", "Criar Usuário")
      .should("have.attr", "type", "button")
      .click();

    cy.location("pathname").should("eq", "/");
    cy.get("#input-nome").should("have.value", "Mateus Souza");
    cy.get("#input-email").should("have.value", "mateus@example.com");
    cy.get("#input-password").should("have.value", "SecurePass123!");
  });

  it("keeps the form usable on a mobile viewport", () => {
    cy.viewport("iphone-6");
    cy.visit("/");

    cy.contains("h2", "Crie seu usuário").should("be.visible");
    cy.get("#input-nome").should("be.visible").type("Mobile User");
    cy.get("#input-email").should("be.visible").type("mobile@example.com");
    cy.get("#input-password").should("be.visible").type("SecurePass123!");
    cy.contains("button", "Criar Usuário").should("be.visible");
  });
});
