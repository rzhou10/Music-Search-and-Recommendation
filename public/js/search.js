(
    function($){
        //all tags needed to get
        let searching = $("searching");
        let searchItem = $("searchItem");
        let specificField = $("specificField");

        //submission form
        searching.submit(function(event){
            event.preventDefault();

            let newItem = searchItem.val();
            let newField = specificField.val();
            let displayResults = $("results");

            if (newItem && newField){
                let requestConfig = {
                    method: "POST",
                    url: "/",
                    contentType: "application/json",
                    data: JSON.stringify({
                        searchItem: searchItem,
                        specificField: specificField
                    })
                }

                $.ajax(requestConfig).then(function(responseMessage){
                    displayResults.html(responseMessage.message);
                });
            }
            else{
                let requestConfig = {
                    method: "POST",
                    url: "/",
                    contentType: "application/json"
                }
                
                $.ajax(requestConfig).then(function(){
                    displayResults.html("Please enter a search term.");
                });
            }
        });
    }
)(window.jQuery);