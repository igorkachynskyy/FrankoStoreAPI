import { JwtPayload } from 'jsonwebtoken';
import { UserPayload } from './user.payload.model';

export interface AppJwtPayload extends JwtPayload, UserPayload {}
