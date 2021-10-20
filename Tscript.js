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
// array for file storage
let tweets = [];

const createTweet = function (tweet, authorName) {
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
                    <a href="#"><h3 class="my_account">${authorName}</h3></a>                
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
                <span class="material-icons repeat-icon" data-id-name="${idNameCounter++}">repeat</span>
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
    tweetAuthor: authorName,
    datasetName: idNameCounter,
  };
  tweets.push(tweetObject);
  console.log(tweets);
  setLocalStorage();

  const retweetBtn = document.querySelector('.repeat-icon');

  retweetBtn.addEventListener('click', e => {
    const closestParent = retweetBtn.closest('.post');
    const tweetParagraph = closestParent.querySelector('.post-paragraph');
    const tweetAuthor = closestParent.querySelector('.my_account');
    createTweet(tweetParagraph.textContent, tweetAuthor.textContent);
  });
};

tweetButton.addEventListener('click', function (e) {
  e.preventDefault();
  createTweet(textInput.value, 'Abdallah Alaff');
});

retweetBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    // using Event Delegation "closest"
    const closestParent = btn.closest('.post');
    const tweetParagraph = closestParent.querySelector('.post-paragraph');
    const tweetAuthor = closestParent.querySelector('.my_account');
    createTweet(tweetParagraph.textContent, tweetAuthor.textContent);
  });
});

// footer toggle function
const footerToggle = function (nameIcon) {
  nameIcon.forEach(icon => {
    icon.addEventListener('click', function () {
      icon.classList.toggle('active');
    });
  });
};
footerToggle(loveIcon);
footerToggle(shareIcon);
footerToggle(repeatIcon);

// local storage
const setLocalStorage = function () {
  localStorage.setItem('tweets', JSON.stringify(tweets));
};

// const getLocalStorage = function () {
//   const data = JSON.parse(localStorage.getItem('tweets'));
//   tweets = data;
//   if (!tweets) return;
//   console.log(tweets);
// };

// getLocalStorage();
