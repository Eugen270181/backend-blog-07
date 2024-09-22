import {ResultStatus} from "./enum/resultStatus";
import {OutputErrorsType} from "./outputErrors.type";

export type ResultModel<T={}> = {
    status:ResultStatus; // статусы ответов на запросы - для превращения в http статусы ответа1
    data?:T; //данные - структура дженерик для передачи в теле ответа
    errors?: OutputErrorsType;         // объект с ключом - Массив ошибок
}

