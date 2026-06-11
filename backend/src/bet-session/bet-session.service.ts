import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BetSession } from '../database/entities/bet-session.entity';
import { GameType } from '../common/enums/game-type.enum';

@Injectable()
export class BetSessionService {
  constructor(
    @InjectRepository(BetSession)
    private readonly betSessionRepository: Repository<BetSession>,
  ) {}

  async getRecentBets(userId: string, gameType: GameType, limit = 20): Promise<BetSession[]> {
    return this.betSessionRepository.find({
      where: { userId, gameType },
      order: { timestamp: 'DESC' },
      take: limit,
    });
  }
}
