import { test } from 'node:test';
import isValidEmail from '../utils/isValidEmail.js';
import assert from 'node:assert';

// Validação de email
test('Validação de Email', async (t) => {
  await t.test('deve aceitar formato válido de email', () => {
    assert.strictEqual(isValidEmail('user@example.com'), true);
  });

  await t.test('deve aceitar email com múltiplos subdomínios', () => {
    assert.strictEqual(isValidEmail('user@mail.example.co.uk'), true);
  });

  await t.test('deve rejeitar emails sem o @', () => {
    assert.strictEqual(isValidEmail('userexample.com'), false);
  });

  await t.test('deve rejeitar emails sem dominio', () => {
    assert.strictEqual(isValidEmail('user@'), false);
  });

  await t.test('deve rejeitar sem local', () => {
    assert.strictEqual(isValidEmail('@example.com'), false);
  });

  await t.test('deve rejeitar emails com espaços', () => {
    assert.strictEqual(isValidEmail('user @example.com'), false);
  });

  await t.test('deve rejeitar emails vazios', () => {
    assert.strictEqual(isValidEmail(''), false);
  });

  await t.test('deve rejeitar emails sem extensão final de domínio', () => {
    assert.strictEqual(isValidEmail('user@example'), false);
  });
});