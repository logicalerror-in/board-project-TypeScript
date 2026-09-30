import {AuthService} from "../auth/auth.service";

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string;
    };
  }
}

export {};