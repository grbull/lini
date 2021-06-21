import { createMock } from '@golevelup/ts-jest';

import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';

const episodeEntity = {
  id: 14308,
  name: 'Pilot',
  season: 1,
  number: 1,
  type: 'regular',
  airdate: '2013-12-02',
  airtime: '22:30:00',
  airstamp: '2013-12-03T03:30:00.000Z',
  runtime: 30,
  imageMedium: '/uploads/images/medium_landscape/292/730352.jpg',
  imageOriginal: '/uploads/images/original_untouched/292/730352.jpg',
  summary:
    "Rick takes Morty to another dimension to get some seeds for him but Morty's parents are considering to put Rick in a retirement home for keeping Morty away from school to help him in his lab.",
  show: 216,
};

describe('Episode Controller', () => {
  const episodeService = createMock<EpisodeService>({
    getOne: jest.fn().mockReturnValue(episodeEntity),
    // getByShow: jest.fn().mockReturnValue([episodeEntity]),
  });
  const episodeController = new EpisodeController(episodeService);

  describe('getOne', () => {
    it('should return one episode', async () => {
      const result = await episodeController.getOne(episodeEntity.id);

      expect(result).toMatchObject(episodeEntity);
      expect(jest.spyOn(episodeService, 'getOne')).toHaveBeenCalledTimes(1);
    });
  });

  // describe('getBySeries', () => {
  //   it('should return all episode for a series', async () => {
  //     const result = await episodeController.getByShow(episodeEntity.show);

  //     expect(result).toMatchObject([episodeEntity]);
  //     expect(jest.spyOn(episodeService, 'getByShow')).toHaveBeenCalledTimes(1);
  //   });
  // });
});
