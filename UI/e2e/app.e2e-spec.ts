import { CompleterPage } from './app.po';

describe('completer App', function() {
  let page: CompleterPage;

  beforeEach(() => {
    page = new CompleterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
