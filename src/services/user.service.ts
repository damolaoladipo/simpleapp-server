import Role from "../models/role.model";
import User from "../models/user.model";
import { UserType } from "../utils/enum.util";
import ErrorResponse from "../utils/error.util";
import { IRegister } from "../utils/interface.util";
import { IUserDoc } from "../utils/interface.util";

class UserService {
  constructor() {}

  /**
   * @name checkEmail
   * @param email
   * @description  
   * @returns {boolean}
   */
  public checkEmail(email: string): boolean {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }

  /**
   * @name checkPassword
   * @param password
   * @description checks password structure
   * @returns {boolean}
   */
  public checkPassword(password: string): boolean {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    return passwordRegex.test(password);
  }

  /**
   * @name createUser
   * @param data
   * @return
   */
  public async createUser(data: IRegister): Promise<IUserDoc> {
    const {
      email,
      displayName,
      password,
      userType,
      username,
    } = data;

    if (!this.checkEmail(email)) {
      throw new ErrorResponse("Invalid email format", 400, []);
    }
    if (!this.checkPassword(password)) {
      throw new ErrorResponse("Password does not meet criteria", 400, []);
    }

    const user = await User.create({
      email: email,
      password: password,
      displayName: displayName,
      username: username ?? "",
    });

    await this.attachRole(user, userType);

    return user;
  }

  /**
   * @name attachRole
   * @param user
   * @param type
   */
  public async attachRole(user: IUserDoc, type: string): Promise<void> {
    const userRole = await Role.findOne({ name: UserType.USER });
    const role = await Role.findOne({ name: type });

    if (type === UserType.ADMIN && userRole && role) {
        user.roles.push(userRole._id);
        user.roles.push(role._id);

        await user.save();
    }
  }
}

export default new UserService();
