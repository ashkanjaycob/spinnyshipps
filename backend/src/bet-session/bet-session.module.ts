import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetSession } from '../database/entities/bet-session.entity';
import { BetSessionListener } from './bet-session.listener';
import { BetSessionService } from './bet-session.service';

@Module({
  imports: [TypeOrmModule.forFeature([BetSession])],
  providers: [BetSessionListener, BetSessionService],
  exports: [BetSessionService],
})
export class BetSessionModule {}
