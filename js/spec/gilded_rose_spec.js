describe("Gilded Rose", function() {

  it('Item class constructor sets correct properties', () => {
    const target = Item;

    const result = new target('fake name', 'fake sell in', 'fake quality');

    expect(result.name).toEqual('fake name');
    expect(result.sellIn).toEqual('fake sell in');
    expect(result.quality).toEqual('fake quality');
  });

  it('Shop class constructor sets correct properties', () => {
    const target = Shop;

    const result = new target('fake items');

    expect(result.items).toEqual('fake items');
  });

  it('Shop class constructor sets items to empty array when none provided', () => {
    const target = Shop;

    const result = new target();

    expect(result.items).toEqual([]);
  });

  it('"Items degrade in Quality each day"', () => {
    const target = Shop;

    const targetInstance = new target([
      new Item('fake item', 1, 5),
    ]);

    targetInstance.updateQuality();

    const result = targetInstance.items[0].quality;

    expect(result).toEqual(4);
  });

  it('"Once the sell by date has passed, Quality degrades twice as fast"', () => {
    const target = Shop;

    const targetInstance = new target([
      new Item('fake item', 0, 5),
    ]);

    targetInstance.updateQuality();

    const result = targetInstance.items[0].quality;

    expect(result).toEqual(3);
  });

  it('"The Quality of an item is never negative"', () => {
    const target = Shop;

    const targetInstance = new target([
      new Item('fake item', 10, 0),
    ]);

    targetInstance.updateQuality();

    const result = targetInstance.items[0].quality;

    expect(result).toEqual(0);
  });

  it('""Aged Brie" actually increases in Quality the older it gets"', () => {
    const target = Shop;

    const targetInstance = new target([
      new Item('Aged Brie', 10, 5),
    ]);

    targetInstance.updateQuality();

    const result = targetInstance.items[0].quality;

    expect(result).toEqual(6);
  });

  it('"The Quality of an item is never more than 50"', () => {
    const target = Shop;

    const targetInstance = new target([
      new Item('Aged Brie', 10, 50),
    ]);

    targetInstance.updateQuality();

    const result = targetInstance.items[0].quality;

    expect(result).toEqual(50);
  });

  it('""Sulfuras", being a legendary item, never has to be sold or decreases in Quality"', () => {
    const target = Shop;

    const targetInstance = new target([
      new Item('Sulfuras, Hand of Ragnaros', undefined, 40),
    ]);

    targetInstance.updateQuality();

    const result = targetInstance.items[0].quality;

    expect(result).toEqual(40);
  });

  it('"Backstage passes" increases in Quality when there are more than 10 days of sellIn', () => {
    const target = Shop;

    const targetInstance = new target([
      new Item('Backstage passes to a TAFKAL80ETC concert', 11, 40),
    ]);

    targetInstance.updateQuality();

    const result = targetInstance.items[0].quality;

    expect(result).toEqual(41);
  });

  it('"Backstage passes" increases in Quality by 2 when there are 6 <= sellIn days <= 10', () => {
    const target = Shop;

    const testCases = [10, 6];

    testCases.forEach(testCase => {
      const targetInstance = new target([
        new Item('Backstage passes to a TAFKAL80ETC concert', testCase, 40),
      ]);

      targetInstance.updateQuality();

      const result = targetInstance.items[0].quality;

      expect(result).toEqual(42);
    });
  });

  it('"Backstage passes" increases in Quality by 3 when there are 0 <  sellIn days <= 5', () => {
    const target = Shop;

    const testCases = [5, 1];

    testCases.forEach(testCase => {
      const targetInstance = new target([
        new Item('Backstage passes to a TAFKAL80ETC concert', testCase, 40),
      ]);

      targetInstance.updateQuality();

      const result = targetInstance.items[0].quality;

      expect(result).toEqual(43);
    });
  });

  it('"Backstage passes" quality drops to 0 after the concert', () => {
    const target = Shop;

    const targetInstance = new target([
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 40),
    ]);

    targetInstance.updateQuality();

    const result = targetInstance.items[0].quality;

    expect(result).toEqual(0);
  });

  /*it('"Conjured" items degrade in quality twice as fast as normal items', () => {
    const target = Shop;

    const targetInstance = new target([
      new Item('Conjured', 1, 5),
    ]);

    targetInstance.updateQuality();

    const result = targetInstance.items[0].quality;

    expect(result).toEqual(3);
  });*/

});
