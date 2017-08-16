import { TemplateModPage } from './app.po';

describe('template-mod App', () => {
  let page: TemplateModPage;

  beforeEach(() => {
    page = new TemplateModPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
