import { ZavrsniPage } from './app.po';

describe('zavrsni App', () => {
  let page: ZavrsniPage;

  beforeEach(() => {
    page = new ZavrsniPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
