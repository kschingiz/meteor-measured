// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by meteor-measured.js.
import { name as packageName } from "meteor/kschingiz:meteor-measured";

// Write your tests here!
// Here is an example.
Tinytest.add('meteor-measured - example', function (test) {
  test.equal(packageName, "meteor-measured");
});
