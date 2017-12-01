import {
  Template
} from 'meteor/templating';
import {
  ReactiveVar
} from 'meteor/reactive-var';

import './main.html';

var img_data = [{
    img_src: "ND.jpeg",
    img_alt: "Number Devil is the man!"
  },
  {
    img_src: "ND.jpeg",
    img_alt: "Number Devil again"
  },
  {
    img_src: "ND.jpeg",
    img_alt: "Number Devil again"
  }
];

Template.images.helpers({
  images: img_data
});
