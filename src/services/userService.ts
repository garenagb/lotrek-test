import {UserListDto} from "../entity/userListDto";

const jwt = require("jsonwebtoken");
import ApiResponseBuilder from "../utils/apiResponseBuilder";
import {UserListRepository} from "../repositories/userListRepository";
import StringCipher from "../utils/stringCipher";

export class UserService {
    private userListRepository: UserListRepository;

    constructor() {
        this.userListRepository = new UserListRepository();
    }

    public getUserById = async (id: number) => {
        return await this.userListRepository.getById(id);
    }

    public login = async (username: string, password: string) => {
        const dto = await this.userListRepository.getByUsernameAndPassword(username, StringCipher.hashPassword(password));

        if (!(dto instanceof UserListDto)) {
            return ApiResponseBuilder.rejectResponse('Cannot login with provided credentials', []);
        }

        return ApiResponseBuilder.approveResponse({token: this._createToken(dto.id)});
    }

    public register = async (username: string, password: string) => {
        let dto = await this.userListRepository.getByUsername(username);

        if (dto instanceof UserListDto) {
            return ApiResponseBuilder.rejectResponse('Error creating the user', ['Already exists a user with this username']);
        }

        dto = new UserListDto();
        dto.username = username;
        dto.password = StringCipher.hashPassword(password);

        try {
            await this.userListRepository.save(dto);
        } catch (e) {
            // Normally db errors aren't shown in api response,
            // we can return this System Error and log for ourselves as DB Error
            return ApiResponseBuilder.rejectResponse('DB Error', [e.message]);
        }

        return ApiResponseBuilder.approveResponse({result: 'User successfully created.'});
    }

    private _createToken = (id: number) => {
        return jwt.sign(
            { id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }
        );
    };
}
