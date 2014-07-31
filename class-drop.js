var Drop = function Drop( accessToken ){
	this.accessToken = accessToken;
	this.primaryCollection = Drop.primaryCollection;
};

Drop.primaryCollection = generateRandomMeanTime( );

Drop.prototype.configure = function configure( ){
	this.getCollectionList( function callback( ){
		
	} );
};

Drop.prototype.getCollectionList = function getCollectionList( callback ){
	var accessToken = this.accessToken;

	boom( "POST", "https://api.dropbox.com/1/datastores/list_datastores",
		function catcher( ){
			if( this.status == 200 ){
				console.debug( this );
			}
		},
		function requestOverride( request ){
			var bearer = [ "Bearer", accessToken ].join( " " )
			request.setRequestHeader( "Authorization", bearer );
		} );
};

Drop.prototype.setPrimaryCollection = setPrimaryCollection( collectionName ){
	this.primaryCollection = collectionName;
	Drop.primaryCollection = collectionName;
}

Drop.prototype.get = function get( ){

};

Drop.prototype.set = function set( ){

};