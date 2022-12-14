
import Contactus from '../../models/contactUs.model/contactUs.model';
import ApiResponse from "../../helpers/ApiResponse";
import { checkExistThenGet } from "../../helpers/CheckMethods";
import { body } from 'express-validator/check';
import { checkValidations } from "../shared.controller/shared.controller";
import i18n from 'i18n';
import notifyController from '../notif.controller/notif.controller';
import socketEvents from '../../socketEvents'
import { sendEmail } from '../../services/emailMessage.service'
// import config from '../../config'
const populateQuery = [
    { path: 'user', model: 'user' }
];


export default {

}
