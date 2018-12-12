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

            //console.log("newitem = " + newItem);
            //console.log("newField = " + newField);

            //if there's stuff in the inputs
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