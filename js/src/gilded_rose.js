/**
 * Helpers
 */
const setMinimumTo0 = value => value >= 0 ? value : 0;

/**
 * Guards
 */
const isAgedBrie = R.propEq('name', 'Aged Brie');
const isSulfuras = R.propEq('name', 'Sulfuras, Hand of Ragnaros');

const isBackstagePassGT10 = ({ name, sellIn}) => (
  name === 'Backstage passes to a TAFKAL80ETC concert' && sellIn > 10
);

const isBackstagePass6To10 = ({ name, sellIn }) => (
  name === 'Backstage passes to a TAFKAL80ETC concert' && sellIn <= 10 && sellIn >= 6
);

const isBackstagePass1To5 = ({ name, sellIn }) => (
  name === 'Backstage passes to a TAFKAL80ETC concert' && sellIn <= 5 && sellIn >= 1
);

const isExpiredBackstagePass = ({ name, sellIn }) => (
  name === 'Backstage passes to a TAFKAL80ETC concert' && sellIn <= 0
);

const isConjuredManaCake = R.propEq('name', 'Conjured Mana Cake');

/**
 * Updater functions
 */
const updateAgedBrieQuality = R.evolve({
  quality: quality => (quality + 1 <= 50 ? quality + 1 : 50),
  sellIn: R.dec,
});

const updateBackstagePassGT10Quality = R.evolve({
  quality: quality => (quality + 1 <= 50 ? quality + 1 : 50),
  sellIn: R.dec,
});

const updateBackstagePass6To10Quality = R.evolve({
  quality: quality => (quality + 2 <= 50 ? quality + 2 : 50),
  sellIn: R.dec,
});

const updateBackstagePass1To5Quality = R.evolve({
  quality: quality => (quality + 3 <= 50 ? quality + 3 : 50),
  sellIn: R.dec,
});

const updateExpiredBackstagePassQuality = R.evolve({ quality: quality => 0, sellIn: R.dec });

const updateOtherItemQuality = item => R.evolve({
  quality: quality => setMinimumTo0(item.sellIn <= 0 ? quality - 2 : quality - 1),
  sellIn: R.dec,
})(item);

const updateConjuredManaCakeQuality = item => R.evolve({
  quality: quality => setMinimumTo0(item.sellIn <= 0 ? quality - 4 : quality - 2),
  sellIn: R.dec,
})(item);

/**
 * Classes
 */
class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items = R.map(
      R.cond([
        [ isAgedBrie, updateAgedBrieQuality ],
        [ isSulfuras, R.identity],
        [ isBackstagePassGT10, updateBackstagePassGT10Quality ],
        [ isBackstagePass6To10, updateBackstagePass6To10Quality ],
        [ isBackstagePass1To5, updateBackstagePass1To5Quality ],
        [ isExpiredBackstagePass, updateExpiredBackstagePassQuality ],
        [ isConjuredManaCake, item => updateConjuredManaCakeQuality(item) ],
        [ R.T, item => updateOtherItemQuality(item) ],
      ])
    )(this.items);
  }
}
