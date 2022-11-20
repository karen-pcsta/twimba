import tweetsData from "./data.js";

document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    likeButton(e.target.dataset.like);
  }
});

function likeButton(uuid) {
  let tweetObject = tweetsData.filter(function (tweet) {
    return tweet.uuid === uuid;
  })[0];
  tweetObject.likes++;
  renderFeed();
}

function renderFeed() {
  let feedHtml = "";
  for (let tweet of tweetsData) {
    feedHtml += `
        <div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment" data-comment="${tweet.uuid}"></i>
                ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-sharp fa-solid fa-heart" data-like="${tweet.uuid}"></i>
                ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>
                ${tweet.retweets} 
                </span>
            </div>   
        </div>            
    </div>
</div> `;
  }
  document.getElementById("feed").innerHTML = feedHtml;
}

renderFeed();
