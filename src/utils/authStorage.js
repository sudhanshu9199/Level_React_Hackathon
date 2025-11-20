export const saveUser = (newUser) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const idx = users.findIndex((u) => u.email === newUser.email);
  if (idx === -1) {
    users.push(newUser);
  } else {
    // update existing record (keep email immutable)
    users[idx] = { ...users[idx], ...newUser, email: users[idx].email };
  }
  localStorage.setItem("users", JSON.stringify(users));
};

// Get all users
export const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

export const findUserByEmail = (email) => {
    if (!email) return undefined;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.find((u) => u.email === email);
};

export const updateUser = (email, updates = {}) => {
  if (!email) return false;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const idx = users.findIndex((u) => u.email === email);
  if (idx === -1) return false;

  const existing = users[idx] || {};

  const merged = {
    ...existing,
    ...updates,
    email: existing.email,
  };

  users[idx] = merged;
  localStorage.setItem("users", JSON.stringify(users));
  return true;
};
