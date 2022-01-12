// Client facing scripts here

$(document).ready(function () {

  $(submitHandler).on("submit", (event) => {

    $.ajax({
      url: "/profile",
      type: "POST",
      data: $(event.target).serialize(),
      success: function (result) {

        console.log(result)

        
        // $("#tweetform").each(function () {
        //   this.reset();
        //   $(".counter").text(140);
        // });
        // loadTweets();
        // console.log("The post was done successfully");
      },
      error: function (err) {
        console.log("There was an error posting to the Database", err);
      },
    });
  });
});
