// this is image_share.js
Images = new Mongo.Collection("images");

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

   Template.images.helpers({images:
    Images.find({}, {sort:{createdOn: -1, rating:-1}}),
    getUser: function(user_id) {
      var user = Meteor.users.findOne({_id:user_id});
      if (user) {
        return user.username;
      }
      else {
        return "anon";
      }
    }
  });

  Template.body.helpers({username:function(){
    if (Meteor.user()) {
      return Meteor.user().username;
      //return Meteor.user().emails[0].address;
    }
    else {
      return "anonymous internet user";
    }
      //console.log(Meteor.user().emails[0].address);
    //  return "dunno....who are you";
    }
});

   Template.images.events({
    'click .js-image':function(event){
        $(event.target).css("width", "50px");
    },
    'click .js-del-image':function(event){
       var image_id = this._id;
       console.log(image_id);
       // use jquery to hide the image component
       // then remove it at the end of the animation
       $("#"+image_id).hide('slow', function(){
        Images.remove({"_id":image_id});
       })
    },
    'click .js-rate-image':function(event){
      var rating = $(event.currentTarget).data("userrating");
      console.log(rating);
      var image_id = this.id;
      console.log(image_id);

      Images.update({_id:image_id},
                    {$set: {rating:rating}});
    },
    'click .js-show-image-form':function(event){
      $("#image_add_form").modal('show');
    }

   });

  Template.image_add_form.events({
    'submit .js-add-image':function(event){
      var img_src, img_alt;
      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;
      console.log("src: "+img_src+" alt:"+img_alt);

      if (Meteor.user()) {
        Images.insert({
          img_src:img_src,
          img_alt:img_alt,
          createdOn:new Date(),
          createdBy:Meteor.user()._id
        });
      }

        $("#image_add_form").modal('show');
      return false;
    }
  });


}
