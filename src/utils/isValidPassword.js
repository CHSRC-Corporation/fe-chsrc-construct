// Função de validação de senha
function isValidPassword(password) {
  // Pelo menos 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 caractere especial
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export default isValidPassword