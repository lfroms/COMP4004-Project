Feature: Login
  As a user
  I want to login to my account
  So that I can access the system

  Scenario: A user logs in to their account successfully
    Given that I am on the login page
    And that I have an account with name "John Smith" email "myemail@email.com" password "password" and approved status "true"
    When I enter email "myemail@email.com"
    And I enter password "password"
    And I submit my login information
    Then I get taken into the system
    And I am set as the current user

  Scenario: A user leaves a field blank
    Given that I am on the login page
    And I enter email "myemail@email.com"
    And I submit my information
    Then I receive an error message saying "password field cannot be blank"

  Scenario: A user enters an invalid email
    Given that I am on the login page
    And that there is no account with email "myemail@email.com"
    When I enter email "myemail@email.com"
    And I enter password "password"
    And I submit my login information
    Then I receive an error message saying "email or password is invaild"

  Scenario: A user enters an invalid password
    Given that I am on the login page
    And that there is an account with email "myemail@email.com" and password "funkyMunky3"
    When I enter email "myemail@email.com"
    And I enter password "password"
    And I submit my login information
    Then I receive an error message saying "email or password is invaild"

  Scenario: A user's account has not been approved
    Given that I am on the login page
    And that I have an account with "John Smith" email "myemail@email.com" password "password" and approved status "false"
    When I enter email "myemail@email.com"
    And I enter password "password"
    And I submit my login information
    Then I receive an error message saying "Your account has not yet been approved"
