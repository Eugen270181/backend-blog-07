import { LoginInputModel } from '../types/input/login-input.model';
import { hashServices } from '../../../common/adapters/hashServices';
import { usersRepository } from '../../users/repositories/usersRepository';
import { ResultClass } from '../../../common/classes/result.class';
import { ResultStatus } from '../../../common/types/enum/resultCode';

export const authServices = {
    async isLogin(login:LoginInputModel) {
        const result = new ResultClass<string>();
        const {loginOrEmail, password} = login
        const user=await usersRepository.getUserByCredentials(loginOrEmail)
        // Проверка на наличие пользователя
        if (!user) {
            result.status = ResultStatus.NotFound;
            return result; // Возвращаем результат с соответствующим статусом
        }

        // Проверка пароля
        const checkPas = await hashServices.checkHash(password, user.passwordHash);
        if (!checkPas) {
            result.status = ResultStatus.NotFound; // Если пароль неверный, также устанавливаем статус NotFound
            return result; // Возвращаем результат с соответствующим статусом
        }

        // Если аутентификация прошла успешно
        result.data = user._id.toString(); // Устанавливаем идентификатор пользователя в data
        result.status = ResultStatus.Success; // Устанавливаем статус успеха
        return result; // Возвращаем результат
    }
}