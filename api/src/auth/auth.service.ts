import {Injectable, UnauthorizedException} from "@nestjs/common";

type AuthUser = {
  id: string;
};

const MOCK_USER = {
  id: 'test',
  password: '1234',
};

@Injectable()
export class AuthService {
  login(id: string, password: string): AuthUser {
    if (id !== MOCK_USER.id || password !== MOCK_USER.password) {
      throw new UnauthorizedException("Invalid Credentials");
    }

    return {id: MOCK_USER.id};
  }
}
