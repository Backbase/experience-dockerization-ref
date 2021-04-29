import { browser, $ } from 'protractor';
import locators from '../locators/app.locators';

export class AppPage {
  
  async navigateTo(): Promise<void> {
    return browser.get('/');
  }

  async getContentText(): Promise<string> {
    const element = $(locators.content);
    return await element.getText();
  }
}
