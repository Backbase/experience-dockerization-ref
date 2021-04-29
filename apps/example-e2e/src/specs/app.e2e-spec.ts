import { AppPage } from '../page-objects/app.po';

describe('workspace-project App', (): void => {
  let page: AppPage;

  beforeEach(async (): Promise<void> => {
    page = new AppPage();
    await page.navigateTo();
  });

  it('should display content text', async (): Promise<void> => {
    const expectedContentText = 'example-widget works!'

    expect(await page.getContentText()).toContain(expectedContentText);
  });
});
