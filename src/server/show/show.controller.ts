import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthGuard } from '../common/guards/auth.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { ShowEntity } from './show.entity';
import { ShowService } from './show.service';

@Controller('show')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get('autocomplete')
  public autoComplete(@Query('q') query: string): Promise<ShowEntity[]> {
    return this.showService.autocomplete(query);
  }

  // TODO: Implement pagination
  @Get('search/:searchQuery')
  public search(
    @Param('searchQuery') searchQuery: string
  ): Promise<ShowEntity[]> {
    return this.showService.search(searchQuery);
  }

  @Get(':id')
  public getOne(@Param('id') id: number): Promise<ShowEntity> {
    return this.showService.getOne(id);
  }

  // public getShowsByLanguage() {}

  // public getShowsByNetwork() {}

  // public getShowsByWebChannel() {}
}
