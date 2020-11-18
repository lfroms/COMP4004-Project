Feature: User Deletion
  As an administrator
  I want to delete users
  So that they can no longer access the system

  Scenario Outline: An administrator deletes a user
    Given that I am logged in as an administrator
    And there exists a user with email "myemail@email.com"
    When I view the details of the user with email "myemail@email.com"
    And I select the option to delete
    And I confirm my decision
    Then there does not exists a user with email "myemail@email.com"
    And I am taken to the list of users

Scenario Outline: An administrator cancels deletion of a user
    Given that I am logged in as an administrator
    And there exists a user with email "myemail@email.com"
    When I view the details of the user with email "myemail@email.com"
    And I select the option to delete
    And I cancel my decision
    Then there exists a user with email "myemail@email.com"
    And I view the details of the user with email "myemail@email.com"
