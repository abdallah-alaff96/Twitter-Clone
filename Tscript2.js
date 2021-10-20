'use strict';
const tweetButton = document.querySelector('.tweetBox__tweetButton');
const postParent = document.querySelector('.post_parent');
const textInput = document.getElementById('text_input');
const postParagraph = document.querySelector('.post-paragraph');
let retweetBtns = document.querySelectorAll('.repeat-icon');
let idNameCounter = 1;
// footer-DOM
const loveIcon = document.querySelectorAll('.love-icon');
const shareIcon = document.querySelectorAll('.share-icon');
const repeatIcon = document.querySelectorAll('.repeat-icon');

class App {
  #tweets = []; // private class field
  #authorName = 'Abdallah Alaff';
  #idNameCounter = 1;
  constructor() {
    this._getLocalStorage();
    this._footerToggle(loveIcon);
    this._footerToggle(shareIcon);
    this._footerToggle(repeatIcon);
    tweetButton.addEventListener('click', this._createTweet.bind(this));
  }

  _createTweet(e) {
    const tweet = textInput.value;
    console.log(tweet);
    const newPost = document.createElement('div');
    newPost.classList.add('post');
    newPost.style.backgroundColor = '#e6ecf0';
    newPost.innerHTML = `
          <div class="post__avatar_and_body">
            <div class="post__header">
              <div class="post__avatar">
                <a href="#"><img src="me.jpeg" alt="avatar-img"></a>
              </div>
              <div class="post__body">
                <div class="upper__part">
                    <a href="#"><h3 class="my_account">${
                      this.#authorName
                    }</h3></a>                
                    <span class="material-icons post__badge">verified</span>
                    <span class="hash__name">
                      @abdallah96
                    </span>
                </div>
                  <p class="post-paragraph">${tweet}</p>
              </div>
            </div>
          </div>
          <div class="post__footer">
                <span class="material-icons repeat-icon" data-id-name="${this
                  .#idNameCounter++}">repeat</span>
                <span class="material-icons love-icon">favorite_border</span>
                <span class="material-icons share-icon">publish</span>
          </div>
  `;
    postParent.prepend(newPost);
    textInput.value = '';
    textInput.blur();
    newPost.style.backgroundColor = 'white';
    newPost.style.transition = '2s';

    let tweetObject = {
      tweetText: tweet,
      tweetAuthor: this.#authorName,
      datasetName: this.#idNameCounter,
    };
    this.#tweets.push(tweetObject);
    _setLocalStorage();

    retweetBtns = document.querySelectorAll('.repeat-icon');
    console.log('createTweet is done');
    // retweetUpdate();
  }

  // footer toggle function
  _footerToggle(nameIcon) {
    nameIcon.forEach(icon => {
      icon.addEventListener('click', function () {
        icon.classList.toggle('active');
      });
    });
  }

  // local storage
  _setLocalStorage() {
    localStorage.setItem('tweets', JSON.stringify(this.#tweets));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('tweets'));
    this.#tweets = data;
    console.log(this.#tweets);
    this.#tweets.forEach(tweet => {
      console.log(tweet);
      //   createTweet(this.#tweets);
    });
  }
}

const retweetUpdate = function () {
  retweetBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (Number(e.target.dataset.idName) === Number(btn.dataset.idName)) {
        // using Event Delegation "closest"
        const closestParent = btn.closest('.post');
        const tweetParagraph = closestParent.querySelector('.post-paragraph');
        const tweetAuthor = closestParent.querySelector('.my_account');
        createTweet(tweetParagraph.textContent, tweetAuthor.textContent);
      }
    });
  });
};
retweetUpdate();
