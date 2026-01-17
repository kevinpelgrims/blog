---
layout: post
title: "Unit Testing Best Practices and Test Reviews with Roy Osherove"
date: 2011-10-28 10:58:02
tags: [".net", "testing"]
---
Yesterday I attended a session on unit testing by [Roy Osherove](http://osherove.com/) in Copenhagen. As I am trying to learn more about unit testing and TDD by applying it in a pet project, it was very interesting to see what a veteran like Roy had to say about the subject of unit testing. Also very interesting was his approach in this session, as he tried to teach us about good habits by showing us bad (real world) examples.

He also pointed out that anyone interested in writing unit tests and working test driven should do test reviews. It can be used as a learning tool, for example test review some open source projects. But it can also be used internally almost as a replacement of code reviews, because reviewing tests takes a lot less time and should give you a good idea of what the code is supposed to do (when working test driven).

I took some notes during the session that I would like to share - and keep here for my own reference ;-) I wrote down most of his tips, so to the unit testing experts out there some of it might seem really basic. But I thought it was interesting to have it all written down.

## Three important words

The basic, yet very important requirements for tests:

*   **Readable**
*   **Maintainable**
*   **Trustworthy**

## Unit test VS integration test

Unit tests are used for testing stuff in memory. The tests don’t change and they’re static. They don’t depend on other things.

Integration tests would be used when there is a dependency on the filesystem, a database, a Sharepoint server, etc.

Unit tests and integration tests have their own test project!

## Basics

*   Avoid test logic: too complicated
    *   Ifs, switches, for loops, ..
*   No multiple asserts
    *   This can be okay when you’re asserting using the same object
*   Avoid “magic numbers”
    *   Using the number 42 somewhere raises the question whether it is important that the number is equal to 42; a good idea would be to use a variable with a descriptive name
*   Don’t assert on calculations or concatenations
    *   Assert(“user,password”, Bleh()) is better than Assert(user + “,” + password, Bleh())
*   Don’t change or remove tests!
*   DateTime.Now (or friends like Random) –> NOT okay! These values change every time
*   Test only publics

## Reuse

*   Factory methods (usually in the same class as the tests using them)
    *   make_xx
*   Configure initial state
    *   init_xx
*   Common tests in common methods
    *   verify_xx

## Tests are isolated

*   Don’t call other tests in a test
*   No shared state, have cleanup code for shared objects

## Mock != Stub (in short)

*   Mock = used for asserts
*   Stub = used to help the test
*   Fake = can be both

## Tip

If you need to test things related to a database, that would be an integration test and it’s a good idea to use the TransactionScope class in .NET so you can rollback everything when the test is done.
