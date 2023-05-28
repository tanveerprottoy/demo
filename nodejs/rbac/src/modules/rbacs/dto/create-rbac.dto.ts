import { UserRole } from "../../../components/enums/user.role";

export class CreateRbacDto {
    role: UserRole;
    endpoints: string[];
}
