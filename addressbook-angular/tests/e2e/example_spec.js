var protr;

describe('addressBook homepage', function() {

    var ptor;

    beforeEach(function() {
        ptor = protractor.getInstance();
    });

    it('should change page language', function() {
        // naviagating to main page
        browser.get('/addressbook-angular/index.html');

        var header = element(by.css('.page-header'));
        var lang = element(by.model('language'));

        // checking default language is English
        expect(header.getText()).toEqual('AddressBook:Angular');

        // setting `de`
        lang.sendKeys('de');
        expect(header.getText()).toEqual('Adressbuch:Angular');
    });

    it('should select data row', function() {
        // naviagating to main page
        browser.get('/addressbook-angular/index.html');
        var tr = element(by.css('.even'));

        tr.click()

        expect(element(by.model('item.name')).getAttribute('value')).toEqual('5');
        expect(element(by.model('item.surname')).getAttribute('value')).toEqual('7');
        expect(element(by.model('item.phone')).getAttribute('value')).toEqual('9');
        expect(element(by.model('item.group')).getAttribute('value')).toEqual('11');
    });


    it('should change edited value', function() {
        element(by.model('item.group')).clear();
        element(by.model('item.group')).sendKeys(150);

        element(by.xpath('//button[contains(@class, "btn-success")]')).click()
        // checking option in group to be changed to 150 value
        expect(element(by.css('option:nth-child(4)')).getText()).toEqual("150");
    });

    it('should add values after reset', function() {
        var tr = element.all(by.css('.odd')).get(1);
        tr.click()

        expect(element(by.model('item.name')).getAttribute('value')).toEqual('6');
        expect(element(by.model('item.surname')).getAttribute('value')).toEqual('8');
        expect(element(by.model('item.phone')).getAttribute('value')).toEqual('19');
        expect(element(by.model('item.group')).getAttribute('value')).toEqual('12');


        element(by.model('item.name')).clear();
        element(by.model('item.name')).sendKeys(10);


        expect(element(by.xpath('//button[contains(@class, "btn-success")]')).getText()).toEqual("Finish")
        // clicking on [Reset] button
        element(by.xpath('//button[contains(@class, "btn-info")]')).click()
        // checking button name changed
        expect(element(by.xpath('//button[contains(@class, "btn-success")]')).getText()).toEqual("Add")

        element(by.model('item.name')).sendKeys("0")
        element(by.model('item.surname')).sendKeys("00")
        element(by.model('item.phone')).sendKeys("000")
        element(by.model('item.group')).sendKeys("0000")

        ptor.findElements(protractor.By.repeater('item in items | filter:grouped')).then(function(arr){
            expect(arr.length).toEqual(3); // making sure row is not yet added
        })

        // Clicking on [Add] button
        element(by.xpath('//button[contains(@class, "btn-success")]')).click()

        ptor.findElements(protractor.By.repeater('item in items | filter:grouped')).then(function(arr){
            expect(arr.length).toEqual(4);
        })
    });

});
