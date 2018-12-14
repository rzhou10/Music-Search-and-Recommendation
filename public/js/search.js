(
    function($){
        //all tags needed to get
        let searching = $("form");

        //submission form
        searching.submit(function(event){
            event.preventDefault();
            
            var inputs = $('form :input');

            var values = {};
            inputs.each(function() {
                values[this.name] = $(this).val();
            });
            
            var newItem = values['searchItem'];
            var newField = values['specificField'];
            
            var displayResults = document.getElementById("titles");

            //AJAX form validation
            if (newItem === "" && newField === ""){
                alert("Please enter search keyword.");
                $('form :input[name="searchItem"]').focus();
            }

            if (((newField.match("Title")) || (newField.match("Artist")) || (newField.match("Lyrics")) || (newField.match("Genre"))) && newItem == ""){
                alert("Please enter search keyword.");
                $('form :input[name="searchItem"]').focus();
            }

            if (newField === "" && newItem.match(/[A-Za-z0-9]/g)){
                alert("Please enter search field.");
                $('form :input[name="specificField"]').focus();
            }
            
            if (newItem.match(/^\W|_/) || newField.match(/^\W|_/)){
                alert("Please input valid search details.");
                $('form :input[name="searchItem"]').val("");
                $('form :input[name="specificField"]').val("");
                $('form :input[name="searchItem"]').focus();
            }

            if (newField == "all" || newField == "ALL"){
                alert("Please input valid search details. Search Field is case-sensitive.");
                $('form :input[name="searchItem"]').val("");
                $('form :input[name="specificField"]').val("");
                $('form :input[name="specificField"]').focus();
            }

            //if there's stuff in the inputs
            if (newField === "All"){
                let requestConfig = {
                    method: "POST",
                    url: "/",
                    contentType: "application/json",
                    data: JSON.stringify({
                        specificField: newField
                    })
                }

                $.ajax(requestConfig).then(function(responseMessage){
                    while (displayResults.firstChild) {   
                        displayResults.removeChild(displayResults.firstChild);
                    }
                    for (let item of responseMessage){
                        
                        let newSong = document.createElement("a");
                        newSong.href = "/songs/" + item._id
                        newSong.innerText = item.title;

                        let newLi = document.createElement("li");

                        newLi.appendChild(newSong);
                        displayResults.appendChild(newLi);
                    } 
                });
            }
            else {
                let requestConfig = {
                    method: "POST",
                    url: "/",
                    contentType: "application/json",
                    data: JSON.stringify({
                        searchItem: newItem,
                        specificField: newField
                    })
                }

                $.ajax(requestConfig).then(function(responseMessage){
                    while (displayResults.firstChild) {   
                        displayResults.removeChild(displayResults.firstChild);
                    }
                    for (let item of responseMessage){
                        
                        let newSong = document.createElement("a");
                        newSong.href = "/songs/" + item._id
                        newSong.innerText = item.title;
                        
                        let newLi = document.createElement("li");

                        newLi.appendChild(newSong);

                        displayResults.appendChild(newLi);
                    }
               });
            }
        });
    }
)(window.jQuery);