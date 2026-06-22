describe("Create user page", () => {
  const fields = [
    { id: "input-nome", label: "Nome" },
    { id: "input-email", label: "Email" },
    { id: "input-password", label: "Password" }
  ];

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

  it("starts with empty fields and an enabled action button", () => {
    fields.forEach(({ id }) => {
      cy.get(`#${id}`).should("have.value", "").and("be.enabled");
    });

    cy.contains("button", /^Criar Usuário$/)
      .should("be.enabled")
      .and("have.attr", "type", "button");
  });

  it("exposes unique ids, associated labels and accessible action text", () => {
    fields.forEach(({ id, label }) => {
      cy.contains("label", label).should("have.attr", "for", id);
      cy.get(`#${id}`).should("have.length", 1);
    });

    cy.get("input[id]").then((inputs) => {
      const ids = [...inputs].map((input) => input.id);
      expect(new Set(ids).size).to.equal(ids.length);
    });

    cy.contains("button", /^Criar Usuário$/)
      .should("be.visible")
      .and("not.have.text", "");
  });

  it("uses field types that match the expected user data", () => {
    cy.get("#input-nome").should("have.prop", "type", "text");
    cy.get("#input-email").should("have.prop", "type", "email");
    cy.get("#input-password").should("have.prop", "type", "password");
  });

  it("uses the browser email constraint for invalid email formats", () => {
    cy.get("#input-email")
      .type("email-invalido")
      .then((input) => {
        expect(input[0].validity.valid).to.equal(false);
      })
      .clear()
      .type("usuario@example.com")
      .then((input) => {
        expect(input[0].validity.valid).to.equal(true);
      });
  });

  it("renders the fields in the expected order before the action button", () => {
    cy.get(".input-control__label").then((labels) => {
      expect([...labels].map((label) => label.textContent)).to.deep.equal([
        "Nome",
        "Email",
        "Password"
      ]);
    });

    cy.get(".input-control")
      .last()
      .next()
      .should("match", "button")
      .and("contain.text", "Criar Usuário");
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

  it("moves focus through the form controls with Tab", () => {
    cy.get("#input-nome").focus();
    cy.focused().should("have.attr", "id", "input-nome");

    cy.press(Cypress.Keyboard.Keys.TAB);
    cy.focused().should("have.attr", "id", "input-email");

    cy.press(Cypress.Keyboard.Keys.TAB);
    cy.focused().should("have.attr", "id", "input-password");

    cy.press(Cypress.Keyboard.Keys.TAB);
    cy.focused()
      .should("match", "button")
      .and("contain.text", "Criar Usuário");
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

  it("keeps the main form visible on common desktop, tablet and mobile sizes", () => {
    [
      { label: "desktop", width: 1280, height: 720 },
      { label: "tablet", width: 768, height: 1024 },
      { label: "mobile", width: 375, height: 667 }
    ].forEach(({ width, height }) => {
      cy.viewport(width, height);
      cy.visit("/");

      cy.contains("h1", "CHSRC Construct").should("be.visible");
      cy.contains("h2", "Crie seu usuário").should("be.visible");
      fields.forEach(({ id }) => {
        cy.get(`#${id}`).should("be.visible");
      });
      cy.contains("button", "Criar Usuário").should("be.visible");
    });
  });

  it("keeps typed values when the viewport changes", () => {
    cy.get("#input-nome").type("Responsive User");
    cy.get("#input-email").type("responsive@example.com");
    cy.get("#input-password").type("SecurePass123!");

    cy.viewport("iphone-6");

    cy.get("#input-nome").should("have.value", "Responsive User");
    cy.get("#input-email").should("have.value", "responsive@example.com");
    cy.get("#input-password").should("have.value", "SecurePass123!");
    cy.contains("button", "Criar Usuário").should("be.visible");
  });

  it("keeps the form inside the viewport on narrow screens", () => {
    cy.viewport(320, 640);
    cy.visit("/");

    cy.get(".app__content").then(($content) => {
      const contentBox = $content[0].getBoundingClientRect();

      expect(contentBox.left).to.be.at.least(0);
      expect(contentBox.right).to.be.at.most(320);
    });

    cy.get(".input-wrap").each(($field) => {
      const fieldBox = $field[0].getBoundingClientRect();

      expect(fieldBox.left).to.be.at.least(0);
      expect(fieldBox.right).to.be.at.most(320);
    });
  });

  it("highlights the active input wrapper while typing", () => {
    cy.get("#input-email").click().type("focus@example.com");

    cy.get("#input-email")
      .parent(".input-wrap")
      .should("have.css", "border-color", "rgb(37, 99, 235)")
      .invoke("css", "box-shadow")
      .should("not.equal", "none");
  });

  it("clears the transient form values after a page reload", () => {
    cy.get("#input-nome").type("Reload User");
    cy.get("#input-email").type("reload@example.com");
    cy.get("#input-password").type("SecurePass123!");

    cy.reload();

    fields.forEach(({ id }) => {
      cy.get(`#${id}`).should("have.value", "");
    });
  });
});
