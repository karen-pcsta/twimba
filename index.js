import tweetsData from "./data.js";

document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    likeButton(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    retweetButton(e.target.dataset.retweet);
  } else if (e.target.dataset.comment) {
    commentButton(e.target.dataset.comment);
  } else if (e.target.id === "tweet-btn") {
    postOnFeed();
  }
});

function likeButton(uuid) {
  let tweetObject = tweetsData.filter(function (tweet) {
    return tweet.uuid === uuid;
  })[0];

  if (!tweetObject.isLiked) {
    tweetObject.likes++;
  } else if (tweetObject.isLiked) {
    tweetObject.likes--;
  }
  tweetObject.isLiked = !tweetObject.isLiked;
  renderFeed();
}

function retweetButton(uuid) {
  let tweetObject = tweetsData.filter(function (tweet) {
    return tweet.uuid === uuid;
  })[0];

  if (!tweetObject.isRetweeted) {
    tweetObject.retweets++;
  } else if (tweetObject.isRetweeted) {
    tweetObject.retweets--;
  }
  tweetObject.isRetweeted = !tweetObject.isRetweeted;
  renderFeed();
}

function commentButton(uuid) {
  document.getElementById(`replies-${uuid}`).classList.toggle("hidden");
}

function postOnFeed() {
  const newTweet = document.getElementById("tweet-input").value;
  tweetsData.unshift({
    handle: `@Scrimba`,
    profilePic: `images/scrimbalogo.png`,
    likes: 0,
    retweets: 0,
    tweetText: newTweet,
    replies: [],
    isLiked: false,
    isRetweeted: false,
    uuid: "8hy671sff-c0f5",
  });
  renderFeed();
}

function renderFeed() {
  let feedHtml = "";
  for (let tweet of tweetsData) {
    const hasBeenLiked = tweet.isLiked ? "liked" : "";
    const hasBeenRetweeted = tweet.isRetweeted ? "retweeted" : "";

    let commentHtml = "";

    if (tweet.replies.length > 0) {
      tweet.replies.forEach(function (comment) {
        commentHtml += `<div class="tweet-reply">
        <div class="tweet-inner">
            <img src="${comment.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${comment.handle}</p>
                    <p class="tweet-text">${comment.tweetText}</p>
                </div>
            </div>
    </div>
    `;
      });
    }

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
                    <i class="fa-sharp fa-solid fa-heart ${hasBeenLiked}" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${hasBeenRetweeted}" data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets} 
                    </span>
                </div>   
            </div>            
        </div>
        <div class="hidden" id="replies-${tweet.uuid}"> 
        ${commentHtml}
        </div>
    </div> `;
  }
  document.getElementById("feed").innerHTML = feedHtml;
}

renderFeed();
