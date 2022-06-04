import Api from '../api/api';
import Helpers from '../helpers';
import ScrollPager from './scrollPager';
import galleryControl from './gallery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class SearchForm {
  constructor(formId) {
    this.formId = formId;
    this.pageIndex = 1;

    if (!this.formId) {
      return new Error('formId is not defined');
    }

    this.getControlElements();
  }

  getControlElements() {
    this.searchElements = {
      form: document.getElementById(this.formId),
      searchInput: document.querySelector(`#${this.formId} .search-input`),
      btnSubmit: document.querySelector(`#${this.formId} button[type="submit"]`),
    };

    this.triggers();
  }

  triggers() {
    this.pager = new ScrollPager(
      galleryControl.galleryElements.container,
      {
        pageIndex: this.pageIndex,
        pageSize: 20,
        totalItems: 0,
        range: 1,
      },
      index => {
        this.pageIndex = index;
        this.getData();
      },
    );

    this.searchElements.form.addEventListener('submit', e => {
      e.preventDefault();

      if (this.isValidForm()) {
        this.pageIndex = 1;
        galleryControl.galleryElements.container.innerHTML = ``;
        galleryControl.galleryElements.container.classList.add('disabled');

        this.getData({
          isNotify: true,
        });
      }
    });

    this.getData();
  }

  isValidForm() {
    if (this.searchElements.searchInput.value.trim() === '') {
      Notify.failure('Enter what you want to find');
      this.searchElements.searchInput.value = '';
      return false;
    }

    return true;
  }

  /**
   * @param { Object } options
   * @param { Boolean } options.isNotify
   */
  getData(options = {}) {
    const { isNotify = false } = options;

    Api.getGalleryData({
      pageIndex: this.pageIndex,
      sQuery: this.searchElements.searchInput.value.trim(),
      onSuccess: data => {
        const { hits, totalHits } = data;

        if (hits.length) {
          Helpers.removeLoader(galleryControl.galleryElements.container);

          this.pager.refresh(this.pageIndex, totalHits, 20);
          galleryControl.render(data);
          galleryControl.galleryElements.container.classList.remove('disabled');

          isNotify && Notify.success(`Hooray! We found ${totalHits} images.`);
        } else {
          Helpers.setLoader(galleryControl.galleryElements.container);
          galleryControl.galleryElements.container.classList.remove('disabled');

          isNotify &&
            Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.',
            );
        }
      },
      onError: error => {
        console.log(error);
      },
    });
  }
}

const searchForm = new SearchForm('search-form');
