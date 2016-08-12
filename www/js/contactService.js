angular.module('todo.contactService', [])
	
	.service('ContactService', function(){
		var contacts = angular.fromJson(window.localStorage['contacts'] || '[]');	

		function persist(){
			window.localStorage['contacts'] = angular.toJson(contacts);
		}

		return{
			getContacts: function(){
				return contacts;
			},
			getContact: function(noteId){
				for(var i= 0; i<contacts.length; i++){
					if(contacts[i].id == noteId){
						return contacts[i];
					}	
				}
				return undefined;
			},
			editContact: function(note){
				for(var i=0; i<contacts.length; i++){
					if(contacts[i].id==note.id){
						contacts[i] = note;
						persist();
						return;
					}
				}
			},
			move: function(note, fromIndex, toIndex){
				contacts.splice(fromIndex,1);
				contacts.splice(toIndex,0,note);
				persist();
			},
			saveContacts: function(contact){
				contacts.push(contact);
				persist();
				/*for (var i = 0; i < contacts.length; i++) {
	              var contact = contacts[i];
	              contacts.push(contact);
				  persist();
	            }*/
			},
			removeContact: function(noteId){
				
				for(var i=0; i<contacts.length; i++){
					if(contacts[i].id==noteId){
						contacts.splice(i,1);
						persist();
						return;
					}
				}
			}

		};
	});
