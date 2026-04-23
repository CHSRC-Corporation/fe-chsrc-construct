import { test } from 'node:test';
import isValidPassword from '../utils/isValidPassword.js';
import assert from 'node:assert';

test('Validação de Senha', async (t) => {
  await t.test('deve aceitar senha válida com todos os requisitos', () => {
    assert.strictEqual(isValidPassword('MyPassword123!'), true);
  });

  await t.test('deve aceitar senha com caractere especial diferente', () => {
    assert.strictEqual(isValidPassword('SecurePass1@'), true);
  });

  await t.test('deve rejeitar senha com menos de 8 caracteres', () => {
    assert.strictEqual(isValidPassword('Pass1!'), false);
  });

  await t.test('deve rejeitar senha sem letra maiúscula', () => {
    assert.strictEqual(isValidPassword('mypassword123!'), false);
  });

  await t.test('deve rejeitar senha sem letra minúscula', () => {
    assert.strictEqual(isValidPassword('MYPASSWORD123!'), false);
  });

  await t.test('deve rejeitar senha sem número', () => {
    assert.strictEqual(isValidPassword('MyPassword!'), false);
  });

  await t.test('deve rejeitar senha sem caractere especial', () => {
    assert.strictEqual(isValidPassword('MyPassword123'), false);
  });

  await t.test('deve rejeitar string vazia', () => {
    assert.strictEqual(isValidPassword(''), false);
  });

  await t.test('deve rejeitar senha com apenas espaços em branco', () => {
    assert.strictEqual(isValidPassword('        '), false);
  });
});