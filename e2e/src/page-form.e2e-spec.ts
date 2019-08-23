
import { browser, logging } from 'protractor';
import { PageForm } from './page-form';

describe('---------- page-form test -----------------', () => {
  let page: PageForm = new PageForm();

  beforeAll(() => {
    page.navigateTo();
  });
  
  it('check header', () => {
    expect(page.getHeaderText()).toEqual('form');
  });

  it('form in-valid', () => {
    page.getLoginInput().sendKeys('sebastiangolian')
    let form = page.getForm().getAttribute('class')
    expect(form).toContain('ng-invalid');
  });

  it('form valid', () => {
    page.getLoginInput().sendKeys('login')
    page.getEmailInput().sendKeys('example@gmail.com')
    page.getCityInput().sendKeys('London')
    page.getZipCodeInput().sendKeys('00-000')
    let form = page.getForm().getAttribute('class')
    expect(form).toContain('ng-valid');
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({level: logging.Level.SEVERE} as logging.Entry));
  });
});
