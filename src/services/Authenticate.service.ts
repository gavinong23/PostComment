import { LoginUser, User } from '../models/LoginUser';

const user: User = {
    name: 'gavin ong',
    email: 'gavinong@hotmail.com',
    role: 'admin'
};

const login = async (
  loginUser: LoginUser
) => {
    if (loginUser.userName === "admin" || loginUser.password === "admin") {
        localStorage.setItem('user', JSON.stringify(user));
        return {user, isAuthenticate: true};
    } else {
        return {isAuthenticate: false};
    }
};

const logout = (): void => {
  localStorage.removeItem('user');
};


const authService = {
  login,
  logout,
};

export default authService;