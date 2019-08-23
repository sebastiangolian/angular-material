import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('---------- app test -----------------', () => {
  let page: AppPage = new AppPage();

  beforeAll(() => {
    page.navigateTo();
  });

  it('check title', () => {
    expect(page.getPageTitle()).toEqual('angular-material');
  });
  
  it('check header', () => {
    expect(page.getHeaderText()).toEqual('home');
  });

  it('test menu', () => {
    page.clickHome()
    expect(page.getHeaderText()).toEqual('home');
    page.back()
    page.clickMovie()
    expect(page.getHeaderText()).toEqual('movies');
    page.back()
    page.clickTest()
    expect(page.getHeaderText()).toEqual('test');
    page.back()
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({level: logging.Level.SEVERE} as logging.Entry));
  });
});
