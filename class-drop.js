var Drop = function Drop( accessToken ){
	this.initialize.apply( this, Array.prototype.slice.call( arguments ) );
	this.configure.apply( this, Array.prototype.slice.call( arguments ) );
};

Drop.primaryCollection = generateRandomMeanTime( );

Drop.prototype.initialize = function initialize( accessToken ){
	this.accessToken = accessToken;
	this.primaryCollection = Drop.primaryCollection;
}

Drop.prototype.configure = function configure( ){
	var self = this;
	this.getCollectionList( function callback( error, collectionList ){
		if( error ){
			throw error;
		}else if( collectionList.length > 0 ){
			self.setPrimaryCollection( collectionList[ 0 ] );
		}else{
			self.createPrimaryCollection( function callback( error, result ){
				console.debug( arguments );
			} );
		}
	} );
};

Drop.prototype.createPrimaryCollection = function createPrimaryCollection( callback ){
	var accessToken = this.accessToken;
	var primaryCollection = this.primaryCollection;

	var DSIDParameter = [ "dsid", primaryCollection ].join( "=" );

	boom( "POST", "https://api.dropbox.com/1/datastores/get_or_create_datastore",
		function catcher( error ){
			if( error ){
				callback( error );
				return;
			}

			if( this.readyState == 4 ){
				if( this.status == 200 ){
					var result = JSON.parse( this.responseText );
					callback( null, result );

				}else if( this.status >= 400 ){
					var error = new Error( this.responseText );
					console.error( error );

					callback( error );

				}else{
					callback( null, [ ] );
				}
			}
		},
		function requestOverride( request ){
			var bearer = [ "Bearer", accessToken ].join( " " )
			request.setRequestHeader( "Authorization", bearer );

			request.ontimeout = function onTimeout( ){
				var error = new Error( "request timed out" );
				console.error( error );

				callback( error );
			};

			return DSIDParameter;
		} );
};

Drop.prototype.getCollectionList = function getCollectionList( callback ){
	var accessToken = this.accessToken;

	boom( "POST", "https://api.dropbox.com/1/datastores/list_datastores",
		function catcher( error ){
			if( error ){
				callback( error );
				return;
			}

			if( this.readyState == 4 ){
				if( this.status == 200 ){
					var result = JSON.parse( this.responseText );
					callback( null, result.datastores );

				}else if( this.status >= 400 ){
					var error = new Error( this.responseText );
					console.error( error );

					callback( error );

				}else{
					callback( null, [ ] );
				}
			}
		},
		function requestOverride( request ){
			var bearer = [ "Bearer", accessToken ].join( " " )
			request.setRequestHeader( "Authorization", bearer );

			request.ontimeout = function onTimeout( ){
				var error = new Error( "request timed out" );
				console.error( error );

				callback( error );
			};
		} );
};

Drop.prototype.setPrimaryCollection = function setPrimaryCollection( collectionName ){
	this.primaryCollection = collectionName;
	Drop.primaryCollection = collectionName;
};

Drop.prototype.get = function get( ){

};

Drop.prototype.set = function set( ){

};