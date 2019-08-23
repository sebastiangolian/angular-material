import { browser, by, element, ElementFinder } from 'protractor';

export class PageForm {
  navigateTo() {
    return browser.get('/#/form')
  }

  getHeaderText() {
    return element(by.css('app-root h1')).getText();
  }

  getForm(): ElementFinder {
    return element(by.tagName('form'));
  }

  getLoginInput(): ElementFinder {
    return element(by.name('login'));
  }

  getEmailInput(): ElementFinder {
    return element(by.name('email'));
  }

  getCityInput(): ElementFinder {
    return element(by.name('city'));
  }

  getZipCodeInput(): ElementFinder {
    return element(by.name('zipcode'));
  }
}