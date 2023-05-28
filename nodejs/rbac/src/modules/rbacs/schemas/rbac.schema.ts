import { UserRole } from "../../../components/enums/user.role";

export class Rbac {
    _id: string;
    role: UserRole;
    endpoints: string[];
}
