Feature: Account Approval
  As an administrator
  I want to approve pending accounts
  So that other users can access the sytem

  Scenario: An administrator approves a pending user account
    Given that I am logged in as an administrator
    And there exists a user with email "myemail@email.com" and approved status "false"
    When I view the list of pending user accounts
    And I select a user to approve
    Then there exists a user with email "myemail@email.com" and approved status "true"
    And the user with email "myemail@email.com" no longer appears in the list of pending user accounts
