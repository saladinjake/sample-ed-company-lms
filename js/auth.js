

function signUp(name, email, password) {
  const users = getUsers();
  const exists = users.find(u => u.email === email);
  if (exists) return { error: "Email already exists." };

  const newUser = { name, email, password }; // In real world, hash it
  users.push(newUser);
  saveUsers(users);
  return { success: true };
}


function login(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return { error: "Invalid email or password." };

  const token = crypto.randomUUID();
  user.token = token;
  saveUsers(users);
  setCurrentUser({ email: user.email, token });
  return { success: true, user };
}


function requestPasswordReset(email) {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) return { error: "Email not found." };

  user.resetToken = crypto.randomUUID().slice(0, 6); 
  saveUsers(users);
  return { success: true, token: user.resetToken }; // display this to user for demo
}


function resetPassword(email, token, newPassword) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.resetToken === token);
  if (!user) return { error: "Invalid token or email." };

  user.password = newPassword;
  delete user.resetToken;
  saveUsers(users);
  return { success: true };
}



