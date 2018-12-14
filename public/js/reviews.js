(
    function($){
        var detailsList = document.getElementById("detailsList");

        var url = window.location.pathname;
        var song_id = url.substring(url.lastIndexOf('/') + 1);
        console.log("id = " + song_id);

        let requestConfig = {
            method: "POST",
            url: "/songdetails/getReviews",
            contentType: "application/json",
            data: JSON.stringify({
                _id: song_id
            })
        }
        $.ajax(requestConfig).then(function(responseMessage){
            for (let item of responseMessage){
                
                let rev = document.createElement("p");
                let ratingStars = "";
                var r;
                for (r=1; r<= parseInt(item.rating); r++) {
                    console.log("ratingStars");
                    ratingStars += "★";
                }
                while (r<=5) {
                    ratingStars += "☆";
                    r++;
                }
                rev.innerText = "User " + item.user_id + ": " + ratingStars + "\n\t" + item.comment;

                let newLi = document.createElement("li");
                newLi.appendChild(rev);
                detailsList.appendChild(newLi);
            } 
        });

        let addReviewForm = $("form");
        addReviewForm.submit(function(event){
            event.preventDefault();
            
            var inputs = $('form :input');

            var values = {};
            inputs.each(function() {
                values[this.name] = $(this).val();
            });
            
            var reviewText = values['reviewText'];
            var ratingNum = values['rating'];
            //console.log("newitem = "+newItem + "   rating = "+newField);

            //AJAX form validation
            if (reviewText === ""){
                alert("Please enter review text.");
                $('form :input[name="reviewText"]').focus();
            }

            let requestConfig = {
                method: "POST",
                url: "/songdetails/addReview",
                contentType: "application/json",
                data: JSON.stringify({
                    song_id:song_id,
                    comment: reviewText,
                    rating: ratingNum,
                    user_id: -99
                })
            }

            $.ajax(requestConfig).then(function(responseReview){
                let newReview = document.createElement("p");
                newReview.innerText = "Rating: " + responseReview.rating + "\n" + "User " + responseReview.user_id + " says - " + responseReview.comment;
                let newLi = document.createElement("li");
                newLi.appendChild(newReview);
                detailsList.appendChild(newLi);
            });
        });
    }
)(window.jQuery);