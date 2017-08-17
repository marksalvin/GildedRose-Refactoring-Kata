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
    this.items = R.map(item => {
      if (item.name === 'Aged Brie') {
        return R.evolve({
          quality: quality => {
            const newQuality = quality + 1 <= 50 ? quality + 1 : 50;
            return newQuality;
          },
          sellIn: R.dec,
        })(item);
      }

      if (item.name === 'Sulfuras, Hand of Ragnaros') {
        return R.identity(item);
      }

      if (
        item.name === 'Backstage passes to a TAFKAL80ETC concert'
        && item.sellIn > 10
      ) {
        return R.evolve({
          quality: quality => {
            const newQuality = quality + 1 <= 50 ? quality + 1 : 50;
            return newQuality;
          },
          sellIn: R.dec,
        })(item);
      }

      if (
        item.name === 'Backstage passes to a TAFKAL80ETC concert'
        && item.sellIn <= 10
        && item.sellIn >= 6
      ) {
        return R.evolve({
          quality: quality => {
            const newQuality = quality + 2 <= 50 ? quality + 2 : 50;
            return newQuality;
          },
          sellIn: R.dec,
        })(item);
      }

      if (
        item.name === 'Backstage passes to a TAFKAL80ETC concert'
        && item.sellIn <= 5
        && item.sellIn >= 1
      ) {
        return R.evolve({
          quality: quality => {
            const newQuality = quality + 3 <= 50 ? quality + 3 : 50;
            return newQuality;
          },
          sellIn: R.dec,
        })(item);
      }

      if (
        item.name === 'Backstage passes to a TAFKAL80ETC concert'
        && item.sellIn <= 0
      ) {
        return R.evolve({
          quality: quality => 0,
          sellIn: R.dec,
        })(item);
      }

      return R.evolve({
        quality: quality => {
          const newQuality = item.sellIn <= 0 ? quality - 2 : quality - 1;
          if (newQuality < 0) return 0;
          return newQuality;
        },
        sellIn: R.dec,
      })(item);
    })(this.items);
  }
}
