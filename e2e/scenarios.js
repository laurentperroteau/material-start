
describe('my app', function() {

  browser.get("http://127.0.0.1:8080/app/");

  it('is running and has a correct meta title', function() {
    expect(browser.getTitle()).toEqual("Angular Material - Starter App");
  });
  
  describe('panel list of user ', function() {

    it('is close', function() {
      // http://www.protractortest.org/#/locators
      expect(
        element(by.tagName('md-sidenav[md-component-id=left]'))
        .getAttribute('class')
      )
      .toMatch('md-closed');
    });
    

    it('on click on menu button, is open', function() {
      element(by.css('.menu.md-button')).click();

      expect(
        element(by.css('md-sidenav[md-component-id=left]'))
        .getAttribute('class')
      )
      .not.toMatch('md-closed');
    });

    it('on click on second item, George Duck is displayed in primary content', function() {
      element.all(by.css('md-sidenav[md-component-id=left] md-list-item')).get(1)
      .click();

      expect(
        element(by.css('md-content h2')).getText()
      )
      .toMatch('George Duke');
    });

    it('on click on share button, contact panel is open', function() {
      element(by.css('.share.md-button')).click();

      expect(
        element(by.css('md-bottom-sheet'))
        .isPresent()
      )
      .toBe(true);
    });
  });
});