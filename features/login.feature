Feature: Login
  As a user
  I want to login to my account
  So that I can access the system

  Scenario: A user logs in to their account successfully
    Given that I am on the login page
    And there exists a user with email "myemail@email.com" password "123456" approved status "true"
    When I enter email "myemail@email.com"
    And I enter password "123456"
    And I click the "Log in" button
    Then I get redirected to courses

  Scenario: A user leaves the password field blank
    Given that I am on the login page
    And I enter email "myemail@email.com"
    And I click the "Log in" button
    Then I receive a message saying "Please input your password!"

  Scenario: A user leaves the email field blank
    Given that I am on the login page
    And I enter password "123456"
    And I click the "Log in" button
    Then I receive a message saying "Please input your email!"

  Scenario: A user enters an invalid email
    Given that I am on the login page
    When I enter email "myemail@email.com"
    And I enter password "123456"
    And I click the "Log in" button
    Then I receive a message saying "The email or password is incorrect."

  Scenario: A user enters an invalid password
    Given that I am on the login page
    And there exists a user with email "myemail@email.com" password "123456" approved status "true"
    When I enter email "myemail@email.com"
    And I enter password "password"
    And I click the "Log in" button
    Then I receive a message saying "The email or password is incorrect."

  Scenario: A user's account has not been approved
    Given that I am on the login page
    And there exists a user with email "myemail@email.com" password "123456" approved status "false"
    When I enter email "myemail@email.com"
    And I enter password "123456"
    And I click the "Log in" button
    Then I receive a message saying "This account has not yet been approved. Please try again later."
