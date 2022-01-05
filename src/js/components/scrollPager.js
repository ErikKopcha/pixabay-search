class ScrollPager {
  constructor(container, { pageIndex, pageSize, totalItems, range }, onLoad) {
    this.fields = {
      container,
    };
    this.options = {
      pageIndex,
      pageSize,
      totalItems,
      range,
    };

    this.onLoad = onLoad;
    this.container = container;

    this._setScrollEvent();
  }

  _setScrollEvent() {
    if (this.options.pageIndex >= this.totalPages) {
      this.container.onscroll = null;
      return;
    }

    this.container.onscroll = () => {
      if (this.container.scrollHeight - (this.container.scrollTop + this.container.clientHeight) < 250) {
        if (typeof this.onLoad == 'function') {
          this.onLoad(this.options.pageIndex + 1);
        }

        this.container.onscroll = () => {};
        return;
      }
    };
  }

  get totalPages() {
    return Math.ceil(this.options.totalItems / this.options.pageSize);
  }

  refresh(pageIndex, totalItems, pageSize = this.options.pageSize) {
    this.options.pageIndex = pageIndex;
    this.options.totalItems = totalItems;
    this.options.pageSize = pageSize;

    this._setScrollEvent();
  }
}

export default ScrollPager;
