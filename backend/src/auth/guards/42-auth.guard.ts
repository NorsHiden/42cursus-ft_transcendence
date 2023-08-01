import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FourtyTwoOAuthGuard extends AuthGuard('42') {}
