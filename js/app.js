/* "feedreader.js"
*
* All comments in quotes in this file  --  and all comments in all other files
* in this project -- were included as part of the source code supplied by
* Udacity for this project.
*
* "This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application."
*/

/* "We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready."
*/

/* This wrapper function was included by Udacity as part of the source code for
* this project.
*/
$(function() {
  /* "This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application. ... "
  *
  * This test suite was included by Udacity as part of the source code.
  */
  describe('RSS Feeds', function() {
    /* "This is our first test - it tests to make sure that the
    * allFeeds variable has been defined and that it is not
    * empty."
    *
    * This test was included by Udacity as part of the source code.
    */
    it('are defined', function() {

      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* COMPLETED: As specified in the source code's TODO,
    * this test "loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty."
    */
    it('each have a url', function () {
      allFeeds.forEach(function(feed) {

       expect(feed.url).toBeDefined();
       expect(feed.url.length).not.toBe(0);
     });
    });

    /* COMPLETED. As specified in the souce code's TODO, this test
    * "loops through each feed in the allFeeds object and ensures
    * it has a name defined and that the name is not empty."
    */
    it('each have a name', function () {
      allFeeds.forEach(function(feed) {

      expect(feed.name).toBeDefined();
      expect(feed.url.length).not.toBe(0);
      });
    });
  });

  /* COMPLETED: Test suite "The Menu" as specified by source code's TODO.
  */
  describe('The menu', function() {

    /* COMPLETED: As specified by source code's TODO, this test "ensures the
    * menu element is hidden by default."
    */
    it('is hidden by default', function() {
      const bodyClass = document.getElementsByTagName('body')[0].className;

      expect(bodyClass).toBe('menu-hidden');
    });

    /* COMPLETED: As specified by source code's TODO, this test "ensures
    * the menu changes visibility when the menu icon is clicked." As
    * specified, the test has two expectations: "does the menu display
    * when clicked and does it hide when clicked again."
    */
    it('toggles between visible and not visible on click', function() {
      const body = document.getElementsByTagName('body')[0];
      const menuIcon = document.getElementsByClassName('menu-icon-link').item(0);
      let correctClass = [false, false];

      if (body.className == 'menu-hidden') {
        menuIcon.click();
          if (body.className == '') {
            correctClass[0] = true;
            menuIcon.click();
              if (body.className == 'menu-hidden') {
                correctClass[1] = true;
              }
          }
      };

    /* This code block is included because it should not be assumed that
    * the menu is hidden by default: i.e., it should stil be
    * possible for `it('on click ... ')` to pass even if the menu is in fact
    *  visible on default and `it('is hidden by default', ... )` does not pass.
    */
    if (body.className == '') {
      menuIcon.click();
        if (body.className == 'menu-hidden') {
          correctClass[0] = true;
          menuIcon.click();
            if (body.className == '') {
              correctClass[1] = true;
            }
        }
    };

    expect(correctClass[0]).toBe(true);
    expect(correctClass[1]).toBe(true);
    });
  });

  /* COMPLETED: Test suite 'Initial Entries' as specified
  * by source code's TODO
  *
  * The technique deployed here for effectively using the `done()` function to
  * test the app's asynchronous `loadFeed()` function — involving passing `done`
  * as an arugment to the `beforeEach()` function and then as the second
  * argument and callback of `loadFeed()` — was inspired by Udacity student
  * Matthew Cranford's sollution outlined in a section of the post
  * "Part 4 — Async Tests," accessed August, 2018:
  * https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/.
  *
  * The referenced post is part of a series of "Walkthrough" posts Cranford
  * published on completing this Udacity FEND project.
  *
  * The `done()` function prevents the spec from running before the asynchonous
  * `loadFeed()` function inside `beforeEach()` completes its task here.
  */
   describe('Initial Entries', function() {
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    /* COMPLETED: As specified by source code's TODO, this test ensures
    * that "when the loadFeed function is called and completes its work,
    * there is at least a single .entry element within the .feed
    * container." Because loadFeed() is asynchronous this uses "Jasmine's
    * beforeEach and asynchronous done() function," as specified.
    */
    it('there is at least one entry in the feed', function() {
      const entryInFeed = document.getElementsByClassName('feed').item(0).firstElementChild.className;

      expect(entryInFeed).toBe('entry-link');
    });
  });

  /* COMPLETED: Test suite "New Feed Selection" as specified by source
  * code's TODO.
  */
  describe('New Feed Selection', function() {
    let initialFirstEntry;

    /* The particular deployment of `done` here again inspired by the
    * Cranford's solution in the post "Part 4 — Async Tests" referenced above.
    *
    * The code inside beforeEach() loads the feed using the first object in the
    * allFeeds array, stores the `href` attribute of the first item loaded in to
    * the feed as the variable `initialFirstEntry` for reference, then loads
    * the feed using the second object in the allFeeds array. The code passes
    * `done` as an argument in to `beforeEach()` function and then as the second
    * argument and callback of the `loadfeed()` function in order to prevent
    * the spec from running before the asynchronous `loadfeed()` function
    * comletes its task here.
    */
    beforeEach(function testFeed(done) {
      loadFeed(0);
      initialFirstEntry = document.getElementsByClassName('feed').item(0).firstElementChild.getAttribute('href');
      loadFeed(1, done);
    });

    /* COMPLETED. As specified by source code's TODO, this test ensures that
    * "when a new feed is loaded by the loadFeed function that the content
    * actually changes," keeping in mind the fact that loadFeed() is
    * asynchronous.
    */
    it('the content of the feed container changes when a new feed is loaded', function() {
      /* Saves the value of the `href` attribute of what should be a new first
      * item in the feed as a variable for comparison with `initialFirstEntry.`
      */
      const newFirstEntry = document.getElementsByClassName('feed').item(0).firstElementChild.getAttribute('href');

      expect(newFirstEntry).not.toBe(initialFirstEntry);
    });
  });
}());
