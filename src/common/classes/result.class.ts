import { ResultStatus } from '../types/enum/resultCode';
import { OutputErrorsType } from '../types/outputErrors.type';


export class ResultClass<T> {
    public status:ResultStatus; // статусы ответов на запросы - для превращения в http статусы ответа
    public data?:T; //данные - структура дженерик для передачи в теле ответа
    public errors?: OutputErrorsType;         // объект с ключом - Массив ошибок
    constructor(status?:ResultStatus, data?:T) {
        this.status = status?status:ResultStatus.NotFound;
        this.data = data?data:undefined;
        this.errors = { errorsMessages: [] }; // Инициализируем массив ошибок
    }

    // Метод для добавления ошибки в массив errorsMessages
    addError(message: string, field: string) {
        this.errors?this.errors.errorsMessages.push({ message, field }):null;
    }
    // Метод для установки данных
    setData(data: T) {
        this.data = data;
    }
}

