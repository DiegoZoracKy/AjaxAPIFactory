
AjaxAPIFactory

Gets an object with a desired API structure and, based on it, creates a well defined interface to handle "$.ajax" calls.
It depends on jQuery

Author: Diego ZoracKy | @DiegoZoracKy



The object used to construct the API will need some specific data expected by the APIFactory.

- apiSchema *

REQUIRED. Each property which should be a method needs to have its api schema defined on it. All the others properties expected by the module will be set within this.

Without it the interface can't know where a method needs to go. If missing, the method will do nothing.

- route *

REQUIRED.

Without it the interface can't know where a method needs to go. If missing, the method will do nothing.

Besides this, you also can define:

- method

Even knowing that "$.ajax" default method is GET. I suggest you to write it anyway on the api schema, if is the case. You can use the object to have a well defined guide of the API.

- data

    - defaults

    You can set default data/parameters for the "$.ajax" call.

    - all
    can be defined all the data expected by the "route".

    - required
    Can be defined the required params by the route.

"all" and "required" doesn't have any effect on the "$.ajax" call or in any part of the API process. This information should be used by the application that will be using the API created by this module.
All of the API Schema defined, will be exposed in the property "_schema" that will be found on each method.

This is an example of how you can define the API and use the APIFactory to create the interface. Look that you can have nested structures and methods.

var Product = APIFactory.make({
    get:{
        apiSchema:{
            route: 'http://domain/product/get',
            method: 'GET',
            data: {
                all:[ 'title', 'category', 'tag', 'orderby', 'sort', 'limit', 'page' ],
                defaults:{
                    orderby: "title",
                    sort: "asc"
                }
            }
        }
    },
    save:{
        apiSchema:{
            route: 'http://domain/product/save',
            method: 'POST',
            data:{
                all:[ 'title', 'price', 'description', 'category', 'tag' ],
                required: [ 'title', 'price', 'category' ]
            }
        }
    },
    Image:{
    	get:{
	        apiSchema:{
	            route: 'http://domain/product/image/get',
	            method: 'GET',
	            data: {
	                all:[ 'image_id', 'size', 'page', 'limit', 'sort' ],
	                defaults:{
	                    size: 'small',
	                    limit: 10,
	                    page: 1
	                }
	            }
	        }
    	},
    	remove:{
	        apiSchema:{
	            route: 'http://domain/product/image/delete',
	            method: 'POST',
	            data: {
	                all:[ 'image_id' ],
	                required: [ 'image_id' ]
	            }
	        }
    	}
    }
});

Now, the object created can be used in this way:
Remember that is all $.ajax afterall.

Product.get({
	data: {
	    category: 'some-category'
	},
	success: function(data){
		console.log(data);
	}
});

Product.Image.remove().done(function(data){
    console.log(data);
}).fail(function(){
    console.warn('Don\'t Panic... but has failed a call at: ', this.url);
    console.warn('Check this list of its required parameters to be sure that nothing is missing: ', Product.Image.remove._schema.data.required);
});

