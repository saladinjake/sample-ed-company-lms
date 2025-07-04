// auth utils
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function logout() {
  localStorage.removeItem("currentUser");
}

async function signUp(name, email, password) {
  const users = getUsers();
  if (users.find(u => u.email === email)) return { error: "Email exists" };
  const hashed = await hashPassword(password);
  users.push({ name, email, password: hashed });
    saveUsers(users);
  return { success: true };
}

async function login(email, password) {
  const users = getUsers();
    const hashed = await hashPassword(password);
  const user = users.find(u => u.email === email && u.password === hashed);
  if (!user) return { error: "Invalid credentials" };
  const token = crypto.randomUUID();
   user.token = token;
  saveUsers(users);
    setCurrentUser({ email, token });
  return { success: true, user };
}

function requestReset(email) {
  const users = getUsers();
    const user = users.find(u => u.email === email);
  if (!user) return { error: "User not found" };
  const code = Math.random().toString().slice(2, 8);
    user.resetToken = code;
  saveUsers(users);
  return { success: true, token: code }; // return code for demo
}

async function resetPassword(email, token, newPassword) {
  const users = getUsers();
    const user = users.find(u => u.email === email && u.resetToken === token);
  if (!user) return { error: "Invalid token" };
  user.password = await hashPassword(newPassword);
  delete user.resetToken;
    saveUsers(users);
  return { success: true };
}
