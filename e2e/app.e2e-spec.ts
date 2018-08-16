import { DetectiveAgentPage } from './app.po';

describe('Detective Agent App', () => {
  let page: DetectiveAgentPage;

  beforeEach(() => {
    page = new DetectiveAgentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
