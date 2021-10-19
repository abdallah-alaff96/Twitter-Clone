'use strict';
const tweetButton = document.querySelector('.tweetBox__tweetButton');
const postParent = document.querySelector('.post_parent');
const textInput = document.getElementById('text_input');
const retweet = document.querySelector('.repeat-icon');
const postParagraph = document.querySelector('.post-paragraph');

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
                    <a href="#" id="my_account"><h3>${authorName}</h3></a>
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
                <span class="material-icons repeat-icon">repeat</span>  
                <span class="material-icons love-icon">favorite_border</span>
                <span class="material-icons share-icon">publish</span>
          </div>
  `;
  postParent.prepend(newPost);
  textInput.value = '';
  textInput.blur();
  newPost.style.backgroundColor = 'white';
  newPost.style.transition = '2s';
  console.log('createTweet function is Done');
};

tweetButton.addEventListener('click', function (e) {
  e.preventDefault();
  createTweet(textInput.value, 'Abdallah Alaff');
});

retweet.addEventListener('click', function (e) {
  e.preventDefault();
  createTweet(postParagraph.textContent, 'Abdallah Alaff');
  console.log('retweet Event Listener is done');
});
