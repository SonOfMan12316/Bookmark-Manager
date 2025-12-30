import { UserDataDto } from "src/modules/user/dto/user-data.dto";
import { TokenDto } from "./token.dto";

export class LoggedInUserDto {
  user: UserDataDto;
  tokens: TokenDto;

  constructor(user: UserDataDto, tokens: TokenDto) {
    this.user = user;
    this.tokens = tokens
  }
}