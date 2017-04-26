import { ExecutivePage } from './app.po';

describe('executive App', function() {
  let page: ExecutivePage;

  beforeEach(() => {
    page = new ExecutivePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
