Feature: Account Approval
  As an administrator
  I want to approve pending accounts
  So that other users can access the system

  Scenario: An administrator approves a pending user account
    Given I successfully log in as an administrator
    And there exists a user with email "myemail@email.com" status "pending"
    And I am on the user index
    When I click the approve button for user with email "myemail@email.com"
    And I click the "Confirm" button
    Then user with email "myemail@email.com" has status "approved"
    And the approve button for user with email "myemail@email.com" disappears

  Scenario: An administrator cancels approval of a pending user account
    Given I successfully log in as an administrator
    And there exists a user with email "myemail@email.com" status "pending"
    And I am on the user index
    And I click the approve button for user with email "myemail@email.com"
    And I click the "Cancel" button
    Then user with email "myemail@email.com" has status "pending"
    And the approve button for user with email "myemail@email.com" still exists
