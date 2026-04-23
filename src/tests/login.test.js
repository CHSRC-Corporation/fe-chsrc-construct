import { test } from 'node:test';
import login from '../utils/login.js';
import assert from 'node:assert';

test('Fluxo de Login', async (t) => {
  await t.test('deve fazer login com sucesso com credenciais válidas', () => {
    const result = login('user@example.com', 'SecurePass123!');
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.message, 'Login successful');
    assert.strictEqual(result.user.email, 'user@example.com');
  });

  await t.test('deve fazer login com sucesso com credenciais de admin', () => {
    const result = login('admin@example.com', 'AdminPass456#');
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.message, 'Login successful');
  });

  await t.test('deve falhar ao fazer login com senha errada', () => {
    const result = login('user@example.com', 'WrongPassword123!');
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.message, 'Invalid email or password');
  });

  await t.test('deve falhar ao fazer login com email inexistente', () => {
    const result = login('nonexistent@example.com', 'SecurePass123!');
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.message, 'Invalid email or password');
  });

  await t.test('deve falhar ao fazer login com email vazio', () => {
    const result = login('', 'SecurePass123!');
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.message, 'Email and password are required');
  });

  await t.test('deve falhar ao fazer login com senha vazia', () => {
    const result = login('user@example.com', '');
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.message, 'Email and password are required');
  });

  await t.test('deve falhar ao fazer login com ambas as credenciais vazias', () => {
    const result = login('', '');
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.message, 'Email and password are required');
  });

  await t.test('não deve expor senha na resposta', () => {
    const result = login('user@example.com', 'SecurePass123!');
    assert.strictEqual(result.user.password, undefined);
  });
});
