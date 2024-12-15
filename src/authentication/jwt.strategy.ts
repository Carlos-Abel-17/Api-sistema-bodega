import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";



/**
 * configuro el jwt 
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Corregido
    });
  }

  async validate(payload: { name: string }) {
    const users = await this.prismaService.users.findMany({
      where: {
        name: payload.name,
      },
    });
    return users;
  }
}
