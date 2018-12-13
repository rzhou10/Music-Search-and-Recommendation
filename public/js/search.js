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
            
            var displayResults = document.getElementById("resultList");

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
                        newSong.href = "/songs/" + item.id
                        newSong.innerText = item.title;

                        let newLi = document.createElement("li");

                        newLi.appendChild(newSong);
                        displayResults.appendChild(newLi);
                    }
                    
                });
            }
            else{
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
                        newSong.href = "/songs/" + item.id
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