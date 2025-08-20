interface User {
  username: string;
  password: string;
}

const mockUsers: User[] = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

export const mockAuthService = {
  login: (username: string, password: string) => {
    const foundUser = mockUsers.find(
      (user) => user.username === username && user.password === password
    );
    return foundUser ? { username: foundUser.username } : null;
  },
  logout: () => {
    // no-op for mock
  },
};
