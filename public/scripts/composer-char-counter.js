$(document).ready(function() {

  $("#tweet-text").on("input", function() {
    let tweetEntered = $("#tweet-text").val()
    let counter = this.parentElement.children[2].children[1].innerHTML

    let counterVisual = $(this.parentElement.children[2].children[1])

    counter = 140 - tweetEntered.length
    counterVisual.text(counter)

    if (counter < 0) {
      console.log("going below limit")
      counterVisual.addClass("negative")
    } else {
      counterVisual.removeClass("negative")
    }
  })
})







