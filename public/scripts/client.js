/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]




$(document).ready(function() {

  //used to extarct tweet posted database and display on webpage
  const createTweetElement = function(tweetObject) {
    const userName = tweetObject.user.name
    const avatars = tweetObject.user.avatars
    const handle = tweetObject.user.handle
    const tweetText = tweetObject.content.text
    const dateTweet = timeago.format(tweetObject.created_at)

    let tweet =
      `<article>
        <header class="postedTweetUser">
          <div class="userDisplayWithAt">
            <div class="userDisplay">
              <p class="icon"><img src="${escape(avatars)}"></p>
              <p class="userName">${escape(userName)}</p>
            </div>
            <div class="handle">
              <p><strong>${escape(handle)}</strong></p>
            </div>
          </div>
          <p class="tweetContent">
            ${escape(tweetText)}
          <p>
        </header>
        <footer class="postedTweetFooter">
          <div class="datePosted">
            <p><strong>${escape(dateTweet)}</strong></p>
          </div>

          <div class="emojiButton">
            <p>
              <button class="flag"><i class="fa-solid fa-flag"></i></button>
              <button class="retweet"><i class="fa-solid fa-retweet"></i></button>
              <button class="like"><i class="fa-solid fa-heart"></i></button> 
            </p>
          </div>
        </footer>
      </article>`;
    return tweet
  }


  //used to loop through database and call out function to display each tweets
  const renderTweets = function(tweets) {
    tweets.forEach((tweet) => {
      const tweetElement = createTweetElement(tweet)
      $(".postedTweetBox").prepend(tweetElement)
    })
  }


  //get request to server to load all posted tweets and display tweet
  const loadtweets = function() {
    $.ajax({
      dataType: "json",
      url: "/tweets", 
      success: (data) => {
        $(".postedTweetBox").empty();
        renderTweets(data)
      }
    })
  }
  loadtweets()



  //serialized tweet and send to the server data field. incorproated error message display
  $(".new-tweet").on("submit", function(event) {
    event.preventDefault()

    const tweetInput = $("#tweet-text").val()
  
    if (tweetInput.length > 140) {
      showError("Your Tweet Is Wayyy Tooo Longgg")
      return
    }

    if(tweetInput.trim() == '') {
      showError("Cannot Submit Empty Tweet")
      return;
    }

    $.ajax({
      type: "POST", 
      url: "/tweets", 
      data: $("form").serialize(), 
      success: () => {
        $("#tweet-text").val("")
        $("output.counter").val(140)
        loadtweets()
      }
    })
  })


  //hidden error messages are displayed upon triggered and hide when clicked else where
  $(".hiddenError").hide()
  const hideError = () => {
    $('.hiddenError').slideUp();
  };
  const showError = (error) => { 
    $(".hiddenError h3 span").text(error)
    $('.hiddenError').slideDown()
  };
  document.addEventListener("click", () => {hideError()})


  //hide tweet entry box until bav icon arrow down is clicked. entry box will then be displayed 
  $(".new-tweet").hide()
  let navIcon = document.querySelector(".bounce")
  navIcon.addEventListener("click", () => {
    $(".new-tweet").slideToggle()
  })


  //arrow up icon on bottom right. clicked to scoll all the way to the top. scroll will only appear when scrolled away from top. 
  $("#scrollUp").hide();
  $(document).scroll(function () {
    if ($(window).scrollTop() >= 50) {
      $("#scrollUp").show();
    } else {
      $("#scrollUp").hide();
    }
  })  
  let scrollUpButton = document.querySelector("#scrollUp")
  scrollUpButton.addEventListener("click", () => {
    $("html, body").animate({ 
      scrollTop: 0 
    }, "slow");
  })  
  

  //XSS attack prevention 
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


})



