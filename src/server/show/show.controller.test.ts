import { createMock } from '@golevelup/ts-jest';

import { ShowController } from './show.controller';
import { ShowService } from './show.service';

describe('Show Controller', () => {
  const showService = createMock<ShowService>();
  const showController = new ShowController(showService);

  describe('autoComplete', () => {
    it('should call showService.autoComplete', async () => {
      await showController.autoComplete('query');

      expect(jest.spyOn(showService, 'autoComplete')).toBeCalled();
    });
  });

  describe('search', () => {
    it('should call showService.search', async () => {
      await showController.search('query');

      expect(jest.spyOn(showService, 'search')).toBeCalled();
    });
  });

  describe('getOne', () => {
    it('should call showService.getOne', async () => {
      await showController.getOne(1);

      expect(jest.spyOn(showService, 'getOne')).toBeCalled();
    });
  });
});
