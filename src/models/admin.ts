import { getModelForClass } from '@typegoose/typegoose';
import PersonClass from './person';

class AdminClass extends PersonClass {}

const AdminModel = getModelForClass(AdminClass);

export default AdminModel;
