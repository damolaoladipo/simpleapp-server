
import User from "../models/user.model";
import { IRegister } from "../utils/interface.util";
import { IResult } from "../utils/interface.util";

const user = new User();

class AuthService {
  constructor() {}

  /**
   * @name validateRegister
   * @param data
   * @returns { IResult } - see IResult
   */
  public async validateRegister(data: IRegister): Promise<IResult> {
    let result: IResult = { error: false, message: "", code: 200, data: {} };
    const { email, password } = data;
    this.validateEmailAndPassword(email, password, result);

    return result;
  }

  /**
   * @name validateLogin
   * @param data
   * @returns { IResult } - see IResult
   */
  public async validateLogin(data: IRegister): Promise<IResult> {
    const result: IResult = { error: false, message: "", code: 200, data: {} };
    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user) {
      return this.handleInvalidCredentials(result);
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return this.handleInvalidCredentials(result);
    }
    result.data = { userId: user._id}
    return result
  }

    
  /**
   * @name validateEmailAndPassword
   * @param email
   * @param password
   * @param result
   * @returns result
   */
  
  private validateEmailAndPassword(
    email: string,
    password: string,
    result: IResult
  ) {
    if (!email) {
      result.error = true;
      result.message = "email is required";
      result.code = 400;
    } else if (!password) {
      result.error = true;
      result.message = "password is required";
      result.code = 400;
    } else {
      result.error = false;
      result.message = "";
      result.code = 200;
    }

    return result;
  }

  
  private handleInvalidCredentials(result: IResult) {
    result.error = true;
    result.message = "Invalid Credentials";
    result.code = 401;

    return result;
  }
}
export default new AuthService();
