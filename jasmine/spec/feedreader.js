/* "feedreader.js"
*
* For the sake of learning from a certain angle, the student developer Jacob W.
* Olson, who completed  the TODO's in this file, intentionally used plain
* JavaScript in several places where jQuery may have also been an option.
*
* All comments "in quotes" in this file  --  as with all comments whatsoever in
* all other files in this project -- were included as part of the source code
* supplied by Udacity for this project.
*
* "This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application."
*/

/* "We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready."
*
*
* As indicated by the immediately preceding comment in quotes, this wrapper
* function was included by Udacity as part of the source code for this project.
* Going forward, comments in quotes should be presumed to be text provided by
* Udacity as part of the source code.
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
    * This test was also included by Udacity as part of the source code.
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

    /* COMPLETED. As specified in the source code's TODO, this test
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
      /*
      * Source: Plain JS technique for checking if an element has certain class
      * — used here and elsewhere in `feedreader.js` — inspired by a May 2,
      * 2013, Stack Overflow post by user "Damien," accessed Aug., 2018.
      * URL: https://stackoverflow.com/a/16337545.
      *
      * Using jQuery `$('body').hasClass('menu-hidden')` — a method suggested
      * by Udacity reviewers in responses to previous iterations of this code
      * that did not account for the possibility of the `body` element having
      * multiple classes — would yield similar results to the plain JS technique
      * used here.
      */
      const bodyClass = document.body.classList.contains('menu-hidden');

      expect(bodyClass).toBe(true);
    });

    /* COMPLETED: As specified by source code's TODO, this test "ensures
    * the menu changes visibility when the menu icon is clicked." As
    * specified, the test has two expectations: "does the menu display
    * when clicked and does it hide when clicked again."
    */
    it('toggles between visible and not visible on click', function() {
      const menuIcon = document.body.getElementsByClassName('menu-icon-link').item(0);
      let hasMenuHidden = document.body.classList.contains('menu-hidden');

      /* Technique of including each `expect()` here inside the `if` statement
      * inspired by a Udacity reviewer's suggestion. A previous iteration of
      * this code saved values that corresponded to the `hasMenuHidden` values
      * here as items in an array after each triggered `.click()` event, and
      * then a single `expect()` was used to check if the values were not equal.
      */
      if (hasMenuHidden == true) {
        menuIcon.click();
        hasMenuHidden = document.body.classList.contains('menu-hidden');
        expect(hasMenuHidden).toBe(false);
        menuIcon.click();
        hasMenuHidden = document.body.classList.contains('menu-hidden');
        expect(hasMenuHidden).toBe(true);
      };

      /* This code block is included because it should not be assumed that
      * the menu is hidden by default: i.e., it should still be
      * possible for `it('on click ... ')` to pass even if the menu is in fact
      *  visible on default and `it('is hidden by default', ... )` does not pass.
      */
      if (hasMenuHidden == false) {
        menuIcon.click();
        hasMenuHidden = document.body.classList.contains('menu-hidden');
        expect(hasMenuHidden).toBe(true);
        menuIcon.click();
        hasMenuHidden = document.body.classList.contains('menu-hidden');
        expect(hasMenuHidden).toBe(false);
      };

    });
  });

  /* COMPLETED: Test suite 'Initial Entries' as specified
* by source code's TODO
*
* Source: The technique deployed to effectively use the `done()` function
* to test the app's asynchronous `loadFeed()` function was inspired by Udacity
* student Matthew Cranford's solution outlined in a section of the post
* "Part 4 — Async Tests," accessed August, 2018.
* URL: https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/.
*
* The referenced post is part of a series of "Walkthrough" posts Cranford
* published on completing this Udacity FEND project.
*
* The `done()` function prevents the spec from running before the asynchronous
* `loadFeed()` function inside `beforeEach()` completes its task.
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
      /*
      * `Document.body` is searched to see if any `.entry` elements are added
      * after `loadFeed(0)` runs, and an HTMLCollection of any such elements are
      * stored as a variable via the `getElementsByClassName()` method.
      */
      const entryHTMLColl = document.body.getElementsByClassName('entry');

      expect(entryHTMLColl.length).not.toBe(0);
    });
  });

  /* COMPLETED: Test suite "New Feed Selection" as specified by source
  * code's TODO.
  */
  describe('New Feed Selection', function() {
    let firstFeed,
        secondFeed;

    /* Technique for deploying `done()` inspired by the portion of Cranford's
    * post referenced previously.
    *
    * A Udacity reviewer's suggestion was also relied on to get started
    * implementing the nested `loadFeed()` functions, a method that makes sure
    * the second `allFeeds` object is NOT loaded, and it's `innnerHTML` "read"
    * and stored as a variable, until the first feed is finished loading and
    * having its `innerHTML` being read and stored.
    */
    beforeEach(function(done) {
      loadFeed(0, function() {
        /* As suggested by a Udacity reviewer, `firstFeed` and `secondFeed` are
        * assigned the values of the HTML inside the `feed` `div` rather than
        * something more specific, like the URL of the first item loaded to the
        * feed, as had been the case in previous iterations of this code, in
        * order to make the test 'more precise and thorough.'
        */
        firstFeed = document.getElementsByClassName('feed').item(0).innerHTML;
        loadFeed(1, function() {
          secondFeed = document.getElementsByClassName('feed').item(0).innerHTML;
          done();
        });
      });
    });

    /* COMPLETED. As specified by source code's TODO, this test ensures that
    * "when a new feed is loaded by the loadFeed function that the content
    * actually changes," keeping in mind the fact that loadFeed() is
    * asynchronous.
    *
    * Compares the `innerHTML` of the `.feed` `div` element after loading it
    * with the first object in the `allFeeds` array with the `innerHTML` of
    * the `.feed` `div` after loading with the second object in `allFeeds`.
    */
    it('the content of the feed container changes when a new feed is loaded', function() {
      expect(firstFeed).not.toBe(secondFeed);
    });
  });
}());
