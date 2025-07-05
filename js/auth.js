// auth utils
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

const defaultUsers = {
  "users": [
    {
      "email": "john@example.com",
      "password": "hashedpassword", // We'll just store raw for now
      "name": "John Doe",
      "resetToken": "abc123", // optional
      "token": "uuid-session-token"
    }
  ],
  "currentUser": {
    "email": "john@example.com",
    "token": "uuid-session-token"
  }
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

async function signUp(name, email, password, role = "student") {
    const users = getUsers();
    if (users.find(u => u.email === email)) return { error: "Email already exists." };

    const hashed = await hashPassword(password);
    const newUser = { name, email, password: hashed, role };
    users.push(newUser);
    saveUsers(users);
    return { success: true };
}

async function login(email, password) {
    const users = getUsers();
    const hashed = await hashPassword(password);
    const user = users.find(u => u.email === email && u.password === hashed);

    if (!user) return { error: "Invalid email or password" };

    const token = crypto.randomUUID();
    user.token = token;
    saveUsers(users);
    setCurrentUser({ email: user.email, token, role: user.role });
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



//auth guard
// requireAuth("admin"); // for admin-only
// requireAuth("student"); // for students
// requireAuth(); // any logged-in user
function requireAuth(role = null) {
  const user = getCurrentUser();
  if (!user) {
    alert("You must be logged in.");
    window.location.href = "login.html";
    return;
  }

  if (role && user.role !== role) {
    alert("Access denied. You don't have permission.");
    window.location.href = "unauthorized.html";
    return;
  }

//   document.getElementById("user-name")?.textContent = user.email;
}



function enrollCourse(courseId) {
  const current = getCurrentUser();
  if (!current) return { error: "Login required" };

  const users = getUsers();
  const user = users.find(u => u.email === current.email);
  if (!user) return { error: "User not found" };

  user.enrolledCourses = user.enrolledCourses || [];
  if (!user.enrolledCourses.includes(courseId)) {
    user.enrolledCourses.push(courseId);
    saveUsers(users);
  }

  return { success: true };
}

function isEnrolled(courseId) {
  const current = getCurrentUser();
  if (!current) return false;

  const users = getUsers();
  const user = users.find(u => u.email === current.email);
  if (!user) return false;

  return (user.enrolledCourses || []).includes(courseId);
}