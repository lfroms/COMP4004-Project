Feature: Account Registration
  As a user
  I want to register for an account
  So that I can access the system

  Scenario: A user registers for an account successfully
    Given that I am on the registration page
    When I enter user name "John Smith"
    And I enter user email "myemail@email.com"
    And I enter password "password"
    And I submit my information
    And I navigate to the user index as an admin user
    Then there exists a user with name "John Smith" email "myemail@email.com" password "password" admin status "false" and approved status "false"

  Scenario: A user leaves field blank
    Given that I am on the registration page
    When I enter user name "John Smith"
    And I enter user email "myemail@email.com"
    And I submit my information
    Then I receive an error message saying "You must enter a password"
    And I navigate to the user index as an admin user
    And there does not exist a user with email "myemail@email.com"

  Scenario: A user enters an invalid email
    Given that I am on the registration page
    When I enter user name "John Smith"
    And I enter user email "email"
    And I enter password "password"
    And I submit my information
    Then I receive an error message saying "Email must have the form x@x.x"
    And I navigate to the user index as an admin user
    And there does not exist a user with email "email"

  Scenario: A user an enters invalid password
    Given that I am on the registration page
    When I enter user name "John Smith"
    And I enter user email "myemail@email.com"
    And I enter password "123"
    And I submit my information
    Then I receive an error message saying "Password must be at least 6 characters"
    And I navigate to the user index as an admin user
    And there does not exist a user with email "myemail@email.com"

  Scenario: A user enters an email that is taken
    Given that I am on the registration page
    And there exists a user with email "myemail@email.com"
    When I enter name "John Smith"
    And I enter email "myemail@email.com"
    And I enter password "password"
    And I submit my information
    Then I receive an error message saying "an account with this email already exists"
    And there exists only one user with email "myemail@email.com"
