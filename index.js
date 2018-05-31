class Lightbox {
  constructor(data) {
    this.data = data;

    document.body.onscroll = this.handleScroll;
    getEl('.lightbox-close').addEventListener('click', this.handleToggle);
    getEl('.lightbox-open').addEventListener('click', this.handleToggle);
  }

  handleImgClick(index) {
    this.renderHero(index);
  }

  handleScroll() {
    const maxWidth = 80;
    const minWidth = 30;
    const { scrollHeight } = document.body;
    const { innerHeight, scrollY } = window;
    const percentPerPixelScrolled = (scrollHeight - innerHeight) / (maxWidth - minWidth);
    const newWidth = maxWidth - scrollY / percentPerPixelScrolled;

    getEl('.lightbox-body').style.width = `${newWidth}%`;
  }

  handleToggle(className) {
    getEl('.lightbox').classList.toggle('hide');
  }

  renderCopy() {
    getEl('.quote').innerHTML = this.data.quote;
    getEl('.author').innerHTML = this.data.author;
    getEl('.publication').innerHTML = this.data.publication;
  }

  renderHero(index=0) {
    getEl('.hero__img').src = this.data.images[index];
  }

  renderThumbnails(img, key) {
    const thumbnail = document.createElement('img');

    thumbnail.src = img;
    thumbnail.className = 'thumbnails__img';
    thumbnail.onclick = this.handleImgClick.bind(this, key);

    getEl('.thumbnails').appendChild(thumbnail);
  }

  render() {
    if (!this.data) return;

    this.data.images.map(this.renderThumbnails.bind(this));
    this.renderHero();
    this.renderCopy();
  }
}

const getEl = el => document.querySelector(el);

const request = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();

    return json;
  }

  catch (error) {
    console.error(error);
  }
};

(() => {
  const response = request('http://homework.warbyparker.com/');

  response.then(data => {
    const lightbox = new Lightbox(data);
    lightbox.render();
  });
})()
