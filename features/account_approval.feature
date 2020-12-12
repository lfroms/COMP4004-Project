Feature: Account Approval
  As an administrator
  I want to approve pending accounts
  So that other users can access the system

  Scenario: An administrator approves a pending user account
    Given I successfully log in as an administrator
    And there exists a user with email "myemail@email.com" and approved status "false"
    And I am on the user index
    When I click the approve button next to the user with email "myemail@email.com"
    And I click the "Confirm" button
    Then the user has an approved status
    And the approve button for user with email "myemail@email.com" does not exist

  Scenario: An administrator cancels approval of a pending user account
    Given I successfully log in as an administrator
    And there exists a user with email "myemail@email.com" and approved status "false"
    And I am on the user index
    When I click the approve button next to the user with email "myemail@email.com"
    And I click the "Cancel" button
    Then the user has a pending status
    And the approve button for user with email "myemail@email.com" exists
