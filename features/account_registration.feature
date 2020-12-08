Feature: Account Registration
  As a user
  I want to register for an account
  So that I can access the system

  Scenario: A user registers for an account successfully
    Given that I am on the registration page
    When I enter user name "John Smith"
    And I enter user email "myemail@email.com"
    And I enter user password "password"
    And I click the "Register" button
    Then I receive a message saying "Account created successfully"

  Scenario: A user leaves name field blank
    Given that I am on the registration page
    When I enter user email "myemail@email.com"
    And I enter user password "123456"
    And I click the "Register" button
    Then I receive an error message saying "You must enter a name"

  Scenario: A user leaves email field blank
    Given that I am on the registration page
    When I enter user name "John Smith"
    And I enter user password "123456"
    And I click the "Register" button
    Then I receive an error message saying "You must enter an email"

  Scenario: A user leaves password field blank
    Given that I am on the registration page
    When I enter user name "John Smith"
    And I enter user email "myemail@email.com"
    And I click the "Register" button
    Then I receive an error message saying "You must enter a password"

  Scenario: A user enters an invalid email
    Given that I am on the registration page
    When I enter user name "John Smith"
    And I enter user email "email"
    And I enter user password "password"
    And I click the "Register" button
    Then I receive an error message saying "Email must have the form x@x.x"

  Scenario: A user an enters invalid password
    Given that I am on the registration page
    When I enter user name "John Smith"
    And I enter user email "myemail@email.com"
    And I enter user password "123"
    And I click the "Register" button
    Then I receive an error message saying "Password must be at least 6 characters"

  Scenario: A user enters an email that is taken
    Given that I am on the registration page
    And there exists a user with email "admin@example.com"
    When I enter user name "John Smith"
    And I enter user email "admin@example.com"
    And I enter user password "password"
    And I click the "Register" button
    Then I receive a notification error message saying "Email has already been taken"
