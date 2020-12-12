Feature: Account Approval
  As an administrator
  I want to approve pending accounts
  So that other users can access the system

  Scenario: An administrator approves a pending user account
    Given I successfully log in as an administrator
    And there exists a user with email "myemail@email.com" and approved status "false"
    And I am on the user index
    And I click the approve button next to the user with email "myemail@email.com"
    Then the user has an approved status
