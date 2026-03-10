import { ApiProperty } from "@nestjs/swagger";
import { UserDataDto } from "src/modules/user/dto/user-data.dto";
import { TokenDto } from "./token.dto";

export class LoggedInUserDto {
  @ApiProperty({ type: UserDataDto })
  user: UserDataDto;

  @ApiProperty({ type: TokenDto })
  tokens: TokenDto;

  constructor(user: UserDataDto, tokens: TokenDto) {
    this.user = user;
    this.tokens = tokens
  }
}