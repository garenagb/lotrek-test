import {UserListDto} from "../entity/userListDto";
import {AbstractRepository} from "./abstractRepository";

export class UserListRepository extends AbstractRepository {
    constructor() {
        super(UserListDto, 'user_list');
    }

    async getByUsernameAndPassword(username: string, password: string): Promise<UserListDto> {
        return await this.findOne({
            where: { username, password }
        });
    }

    async getByUsername(username: string): Promise<UserListDto> {
        return await this.findOne({ where: { username } });
    }
}
