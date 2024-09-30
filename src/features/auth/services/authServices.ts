import {LoginInputModel} from '../types/input/loginInput.model';
import {hashServices} from '../../../common/adapters/hashServices';
import {usersRepository} from '../../users/repositories/usersRepository';
import {ResultClass} from '../../../common/classes/result.class';
import {ResultStatus} from '../../../common/types/enum/resultStatus';
import {jwtServices} from "../../../common/adapters/jwtServices";
import {IdType} from "../../../common/types/id.type";

export const authServices = {
    async isLogin(login:LoginInputModel) {
        const result = new ResultClass<string>()
        const {loginOrEmail, password} = login
        const user=await usersRepository.getUserByCredentials(loginOrEmail)
        // Проверка на наличие пользователя
        if (!user) {
            result.status = ResultStatus.NotFound;
            return result; // Возвращаем результат с соответствующим статусом
        }
        // Проверка пароля
        const checkPass = await hashServices.checkHash(password, user.passwordHash);
        if (!checkPass) {
            result.status = ResultStatus.NotFound; // Если пароль неверный, также устанавливаем статус NotFound
            return result; // Возвращаем результат с соответствующим статусом
        }

        // Если аутентификация прошла успешно
        result.data = user._id.toString(); // Устанавливаем идентификатор пользователя в data
        result.status = ResultStatus.Success; // Устанавливаем статус успеха
        return result; // Возвращаем результат
    },
    async checkAccessToken(authHeader: string) {
        const [type, token] = authHeader.split(" ")
        const result = new ResultClass<IdType>()
        const userId = await jwtServices.verifyToken(token)

        if (userId) {
            const user = await usersRepository.getUserById(userId.id)
            if (user) { result.data = userId; result.status = ResultStatus.Success }
        }

        return result
    }
}