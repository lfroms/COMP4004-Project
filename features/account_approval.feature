Feature: Account Approval
  As an administrator
  I want to approve pending accounts
  So that other users can access the system

  Scenario: An administrator approves a pending user account
    Given that I am logged in as an administrator
    And there exists a user with email "myemail@email.com" and approved status "false"
    And I am on the user index
    And I click the approve button for the user
    Then the user with email "myemail@email.com" has approved status "true"
