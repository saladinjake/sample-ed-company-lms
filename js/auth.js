// auth utils
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

(async () => {
  console.log(await hashPassword("user123"))
  console.log(await hashPassword("instructor123"))
  console.log(await hashPassword("admin123"))
  console.log(await hashPassword("company123"))
})()


function getUsers() {

  return JSON.parse(localStorage.getItem("üsers"))
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

// saas based mock up rediection for authentication
function redirectAfterLogin() {
  const user = JSON.parse(localStorage.getItem("current_user"));
  if (!user) return window.location.href = "/login.html";
  // simple FE RBAC
  if (user.role === "employee") window.location.href = "/teams/dashboard.html"; // EMPLOYEE BASED SAAS APP SECTION
  else if (user.role === "admin") window.location.href = "/admin/dashboard.html"; // ADMIN
  else if (user.role === "student") window.location.href = "/dashboard.html";  // STUDENT WITH OUT COMPANIES ASSIGNING TASK
  else if (user.role === "instructor") window.location.href = "/instructor/dashboard.html"; // COURSE CREATOR
}

async function signUp(name, email, password, role = "student") {

  const users = getUsers();
  // ORDINARY STUDENTS 
  if (users.find(u => u.email === email)) return { error: "Email already exists." };


  const hashed = await hashPassword(password);
  const newUser = {
    name, email,
    password: hashed, role,
    preference: {
      cardPreference: { paymentMethod: "Master Card" },
      onboardingCategories: [],
      displayName: "***",
      displayEmail: email,
      screenReaderEnabled: true
    },
    //progress
    // users not assigneed by companies are called students
    companyId: 'Free Individual',
    role: 'student',
    enrolledCourses: [],
    progress: {}

  };
  users.push(newUser);
  saveUsers(users);
  return { success: true };
}

async function login(email, password) {
  const users = getUsers();
  const hashed = await hashPassword(password);
  console.log(hashed, email,password)
  const user = users.find(u => u.email == email && u.password === hashed);

  if (!user) return { error: "Invalid email or password" };

  const token = crypto.randomUUID();
  user.token = token;
  saveUsers(users);
  setCurrentUser({
    email: user.email, token, role: user.role,
    // TODO LOAD PREVIOUS SESSIONS DATA
    preference: {
      cardPreference: user.preference.cardPreference,
      onboardingCategories: user.preference.onboardingCategories || ["React", "Frontend Development", "Data Structures"],
      displayName:  user.preference.displayName || "***",
      displayEmail: email,
      screenReaderEnabled: user.preference.screenReaderEnabled || true
    },
    //progress
    // users not assigneed by companies are called students
    companyId: user.companyId || 'Free Individual',
    role: user.role || 'student',
    enrolledCourses: Array.isArray(user.enrolledCourses)? [...user.enrolledCourses] : [],
    progress: {
      ...user.progress
    }

  });
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

// prompt auth modal



function enrollCourse(courseId) {
  const current = getCurrentUser();
  if (!current) {

    return { error: "Login required" };
  }

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

function hasEnrolled(courseId) {
  const current = getCurrentUser();
  if (!current) return false;

  const users = getUsers();
  const user = users.find(u => u.email === current.email);
  if (!user) return false;

  return (user.enrolledCourses || []).includes(courseId);
}