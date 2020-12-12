Feature: Logout
  As a user
  I want to log out of my account
  So that I terminate my session

  Scenario: A user clicks the logout button
    Given I successfully log in as a user with email "student@email.com"
    When I click the log out button
    Then I get redirected to the login page
