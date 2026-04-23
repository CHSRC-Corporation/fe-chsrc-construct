// Banco de dados simples com credenciais mock
const validUsers = [
  { email: 'user@example.com', password: 'SecurePass123!' },
  { email: 'admin@example.com', password: 'AdminPass456#' }
];

function login(email, password) {
  if (!email || !password) {
    return { success: false, message: 'Email and password are required' };
  }

  const user = validUsers.find(u => u.email === email);
  
  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }

  if (user.password !== password) {
    return { success: false, message: 'Invalid email or password' };
  }

  return { success: true, message: 'Login successful', user: { email: user.email } };
}

export default login