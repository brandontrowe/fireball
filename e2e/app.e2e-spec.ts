import { NgCartPage } from './app.po';

describe('ng-cart App', function() {
  let page: NgCartPage;

  beforeEach(() => {
    page = new NgCartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
