import { RoutePlanner.WebClientPage } from './app.po';

describe('route-planner.web-client App', () => {
  let page: RoutePlanner.WebClientPage;

  beforeEach(() => {
    page = new RoutePlanner.WebClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
