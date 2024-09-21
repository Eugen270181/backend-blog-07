import {ResultStatus} from "./enum/resultStatus";
import {errorsMessagesType,OutputErrorsType} from "./outputErrors.type";


export class Result<T> {
    public data?:T; //данные - структура дженерик для передачи в теле ответа
    public status:ResultStatus; // статусы ответов на запросы - для превращения в http статусы ответа1
    public errors: OutputErrorsType;         // объект с ключом - Массив ошибок
    constructor(status:ResultStatus=ResultStatus['Success'], data?: T) {
        this.status = status;
        this.data = data;
        this.errors = { errorsMessages: [] }; // Инициализируем массив ошибок
    }

    // Метод для добавления ошибки в массив errorsMessages
    addError(message: string, field: string) {
        this.errors.errorsMessages.push({ message, field });
    }
    // Метод для установки данных
    setData(data: T) {
        this.data = data;
    }

}
