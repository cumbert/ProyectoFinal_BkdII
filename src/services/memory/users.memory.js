class UsersMemory {
    constructor() {
        this.users = [];
    }

    async get() {
        return this.users;
    }

    async create(user) {
        this.users.push(user);
        return users;
    }
}

export default UsersMemory;