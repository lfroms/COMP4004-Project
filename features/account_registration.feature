Feature: Account Registration
  As a user
  I want to register for an account
  So that I can access the system

  Scenario: A user registers for an account successfully
    Given that I am on the registration page
    And there does not exist a user with email "myemail@email.com"
    When I enter name "John Smith"
    And I enter email "myemail@email.com"
    And I enter password "password"
    And I submit my information
    Then there now exists a user with name "John Smith" email "myemail@email.com" password "password" admin status "false" and approved status "false"

  Scenario: A user leaves password field blank
    Given that I am on the registration page
    And there exists 1 user
    When I enter name "John Smith"
    And I enter email "myemail@email.com"
    And I submit my information
    Then I receive an error message saying "password field cannot be blank"
    And the number of users is still 1

  Scenario: A user enters an invalid email
    Given that I am on the registration page
    And there exists 1 user
    When I enter name "John Smith"
    And I enter email "email"
    And I enter password "password"
    And I submit my information
    Then I receive an error message saying "please enter a valid email"
    And the number of users is still 1

  Scenario: A user an enters invalid password
    Given that I am on the registration page
    And there exists 1 user
    When I enter name "John Smith"
    And I enter email "myemail@email.com"
    And I enter password "123"
    And I submit my information
    Then I receive an error message saying "password length must be at least 6"
    And the number of users is still 1

  Scenario: A user enters an email that is taken
    Given that I am on the registration page
    And there exists 1 user with email "myemail@email.com"
    When I enter name "John Smith"
    And I enter email "myemail@email.com"
    And I enter password "password"
    And I submit my information
    Then I receive an error message saying "an account with this email already exists"
    And the number of users is still 1
