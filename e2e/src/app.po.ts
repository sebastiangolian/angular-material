import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/')
  }

  getPageTitle() {
    return browser.getTitle()
  }

  getHeaderText() {
    return element(by.css('app-root h1')).getText();
  }

  getHomeLink() {
    return element(by.linkText("home")).getText();
  }

  getLinksWithMovie() {
    return element(by.partialLinkText("movie")).getText();
  }

  clickHome() {
    element(by.linkText("home")).click()
  }

  clickMovie() {
    element(by.linkText("movie")).click()
  }

  clickTest() {
    element(by.linkText("test")).click()
  }

  back() {
    browser.navigate().back();
  }
}
