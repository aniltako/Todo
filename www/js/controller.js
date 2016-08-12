angular.module('todo.controller', [])

.controller('ListCtrl', function($scope, $state, NoteService, ContactService, $ionicActionSheet, $timeout, $cordovaContacts) {

  $scope.reordering = false;

  $scope.notes = NoteService.getNotes();


  $scope.remove = function(noteId){
  	NoteService.removeNote(noteId);
  };

  $scope.move = function(note, fromIndex, toIndex){
  	NoteService.move(note, fromIndex, toIndex);
  };

  $scope.toggleReordering = function(){
  	$scope.reordering = !$scope.reordering;
  }
 
   // Triggered on a button click, or some other target
  $scope.show = function(noteId) {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: '<b>Share</b>' },
         { text: 'Move' }
       ],
       destructiveText: 'Delete',
       titleText: '<h3>Todo<h3>',
       cancelText: 'Cancel',
       cancel: function() {
            // add cancel code..
          },
       buttonClicked: function(index) {
        switch (index){
          case 0 :
            //Handle Share Button
            console.log("button " + index + "is clicked");
            return true;
          case 1 :
            //Handle Move Button
            console.log("button " + index + "is clicked");
            $scope.toggleReordering();
            return true;
        }


         return true;
       },
       destructiveButtonClicked: function() {
         //console.log("noted id is " + noteId);
         $scope.remove(noteId);
         return true;
     }
     });

     // For example's sake, hide the sheet after two seconds
     $timeout(function() {
       hideSheet();
     }, 10000);

   };

  // $scope.contacts = ContactService.getContacts();


  /* $scope.searchContacts =function(){

    if($scope.contacts.length != 0){
       $state.go('contactList');
    };
   // $scope.phoneContacts = [];
    
    function onSuccess(contacts) {
        for (var i = 0; i < contacts.length; i++) {
            var contact = contacts[i];
            $scope.phoneContacts.push(contact);
            }
      ContactService.saveContacts(contacts);
      $state.go('contactList');
    };
      function onError(contactError) {
        alert(contactError);
      };
      var options = {};
      options.multiple = true;
      $cordovaContacts.find(options).then(onSuccess, onError);
  };*/

})

.controller('EditCtrl', function($scope, $state, NoteService) {
  $scope.note = angular.copy(NoteService.getNote($state.params.noteId));
  $scope.save = function(){
  	NoteService.updateNote($scope.note);
  	$state.go('list');
  }
})
.controller('AddCtrl', function($scope, $state, NoteService) {
  $scope.note = {
  	id: new Date().getTime().toString(),
  	title: '',
  	description: ''
  };

  $scope.save = function(){
  	NoteService.addNote($scope.note);
  	$state.go('list');
  }
})

.controller('ShareNotesCtrl', function($scope, $state, NoteService,$firebaseObject) {
   var ref = new Firebase("https://koltuz.firebaseio.com/messages");
    // create a synchronized array
    // click on `index.html` above to see it used in the DOM!
    $scope.messages = $firebaseObject(ref);

    ref.on("value", function(snapshot){
      console.log(snapshot.val());
    }, function(errorObject){
      console.log("the read failed: " + errorObject.code);
    });

    $scope.message = {
      author: '',
      message: ''
    };

    $scope.phoneNumber = "ok";

    

    $scope.sendMessage = function(){
        console.log($scope.message);
        var newMessageRef = ref.push();
        newMessageRef.set($scope.message);
        $scope.message ={
          author: '',
          message: ''
        };
    };

   /* var deviceInfo = cordova.require("cordova/plugin/DeviceInformation");
    deviceInfo.get(function(result) {
            console.log("result = " + result);
        }, function() {
            console.log("error");
    });
*/
})
.controller('contactListCtrl', function($scope, $state, $cordovaContacts, ContactService) {
  /*$scope.contacts = [
  {
    id: '1',
    name: 'anil',
    number: '9813369613'
  },
  {
    id: '2',
    name: 'tako',
    number: '9813369613'
  },
  {
    id: '3',
    name: 'kkk',
    number: '9813369613'
  }

  ];*/

 // $scope.phoneContacts = ContactService.getContacts();

  $scope.phoneContacts = ContactService.getContacts();
  $scope.searchContacts =function(){
/*
    if($scope.contacts.length != 0){
       $state.go('contactList');
    };*/
    
    function onSuccess(contacts) {
        for (var i = 0; i < contacts.length; i++) {
            var contact = contacts[i];
           // $scope.phoneContacts.push(contact);
            ContactService.saveContacts(contact);
        }



     // $state.go('contactList');
    };
      function onError(contactError) {
        alert(contactError);
      };
      var options = {};
      options.multiple = true;
      $cordovaContacts.find(options).then(onSuccess, onError);
  };

  /* $scope.getContacts = function() {
          $scope.phoneContacts = [];
          function onSuccess(contacts) {
            for (var i = 0; i < contacts.length; i++) {
              var contact = contacts[i];
              $scope.phoneContacts.push(contact);
            }
          };
          function onError(contactError) {
            alert(contactError);
          };
          var options = {};
          options.multiple = true;
          $cordovaContacts.find(options).then(onSuccess, onError);
        };*/
      
})
.controller('LoginCtrl', function($scope){



})
.controller('SignupCtrl', function($scope, $state){
  $scope.email = '';
  $scope.password = '';

  $scope.signUp = function(){

    var ref = new Firebase("https://koltuz.firebaseio.com");
    ref.createUser({
      email    : $scope.email,
      password : $scope.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        $state.go('list');
      } });
   

  };


});
