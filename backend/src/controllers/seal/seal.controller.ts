import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestContext } from '../../http/middlewares/request/request-context';
import { SearchSealsQueryDto } from './dto/search-seals-query.dto';
import { UpdateSealDto } from './dto/update-seal.dto';
import { SealDetail, SealSearchItem } from '../../entities/seal';
import { GetSealDetailUseCase } from '../../usecases/seal/get-seal-detail.usecase';
import { SearchSealsByNumberUseCase } from '../../usecases/seal/search-seals-by-number.usecase';
import { UpdateSealUseCase } from '../../usecases/seal/update-seal.usecase';

type AuthenticatedRequest = {
  user?: RequestContext;
};

@Controller('seals')
export class SealController {
  constructor(
    private readonly searchSealsByNumberUseCase: SearchSealsByNumberUseCase,
    private readonly getSealDetailUseCase: GetSealDetailUseCase,
    private readonly updateSealUseCase: UpdateSealUseCase,
  ) {}

  @Get('search')
  search(@Query() query: SearchSealsQueryDto): Promise<SealSearchItem[]> {
    return this.searchSealsByNumberUseCase.execute(query.number);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<SealDetail> {
    return this.getSealDetailUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSealDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<SealDetail> {
    const userId = request.user?.user.id;
    if (!userId) {
      throw new UnauthorizedException('Usuário não autenticado.');
    }

    return this.updateSealUseCase.execute(id, dto, userId);
  }
}
