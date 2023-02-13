import { sign, verify } from 'jsonwebtoken';
import { User } from '../../../modules/users/entities/user.entity';
import { IToken, TokenUser } from './token';
import { createHmac } from 'crypto'

export class JWTToken implements IToken {

    private TOKEN_SECRET = process.env.SECRET_KEY_TOKEN || '';
    private TOKEN_SECRET_CRYPTO = createHmac('sha256', this.TOKEN_SECRET).digest('base64');

    create({ id, username, isAdmin }: User): string {

        const token = sign({ user: { id, username, isAdmin } }, this.TOKEN_SECRET_CRYPTO, { subject: id, expiresIn: '1d' });

        return token;
    }


    validate(token: string): TokenUser | null {
        try {
            return verify(token, this.TOKEN_SECRET_CRYPTO) as TokenUser
        } catch (error) {
            return null;
        }
    }

}