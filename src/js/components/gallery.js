import SimpleLightbox from 'simplelightbox';

class GalleryControl {
  constructor() {
    this.getControlElements();

    this.lightbox = new SimpleLightbox(`.gallery a`, {
      sourceAttr: 'data-large',
    });
  }

  getControlElements() {
    this.galleryElements = {
      container: document.getElementById('gallery'),
    };
  }

  render(data) {
    const { hits } = data;
    const fragment = document.createDocumentFragment();

    hits.forEach(el => {
      const item = document.createElement('a');
      item.setAttribute('data-large', el.largeImageURL);
      item.href = '#';
      item.className = `photo-card`;
      item.innerHTML = `
          <img
          src="${el.webformatURL}"
          alt="${el.tags}"
          loading="lazy"
          />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span>${el.likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span>${el.views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <span>${el.comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span>${el.downloads}</span>
            </p>
          </div>
        `;

      fragment.appendChild(item);
    });

    this.galleryElements.container.appendChild(fragment);
    this.lightbox.refresh();
  }
}

const galleryControl = new GalleryControl();

export default galleryControl;
