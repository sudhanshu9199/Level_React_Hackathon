export const saveUser = (newUser) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
};

// Get all users
export const getUsers = () => {
    return JSON.parse(localStorage.getItem('users')) || [];
};

export const findUserByEmail = (email) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(u => u.email === email);
};