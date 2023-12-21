import user from "../models/users.model";

class ServiceUsers {
    constructor() { }

    async getUsers() {
        try {
            const result = await user.getUsers();
            return result;
        } catch (error) {
            return error;
        };
    };

    async getUser(id: string) {
        try {
            const result = await user.getUser(id);
            return result;
        } catch (error) {
            return error;
        };
    };

    async createUser(data: any) {
        try {
            const result = await user.createUser(data);
            return result;
        } catch (error) {
            return error;
        };
    };

    async updateUser(id: string, data: any) {
        try {
            const result = await user.updateUser(id, data);
            return result;
        } catch (error) {
            return error;
        };
    };

    async deleteUser(id: string) {
        try {
            const result = await user.deleteUser(id);
            return result;
        } catch (error) {
            return error;
        };
    };
};

export default new ServiceUsers();