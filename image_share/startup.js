if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Images.find().count() == 0) {
      Images.insert(
        {
           img_src:"laptops.jpg",
           img_alt:"some laptops on a table"
        }
      );
    }
  });
}
