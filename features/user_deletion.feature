Feature: User Deletion
  As an administrator
  I want to delete users
  So that they can no longer access the system

  @UserDeleteSuccess
  Scenario: An administrator deletes a user
    Given I successfully log in as an administrator
    And there exists a user with email "myemail@email.com" and approved status "true"
    And I am on the user index
    When I click the delete button next to the user with email "myemail@email.com"
    And I click the "Confirm" button
    Then the user with email "myemail@email.com" no longer exists

  @UserDeleteCancel
  Scenario: An administrator cancels deletion of a user
    Given I successfully log in as an administrator
    And there exists a user with email "myemail@email.com" and approved status "true"
    And I am on the user index
    When I click the delete button next to the user with email "myemail@email.com"
    And I click the "Cancel" button
    Then there still exists a user with email "myemail@email.com"

  @StudentDeleteSuccess
  Scenario: An administrator deletes a student that is enrolled in a course
    Given I successfully log in as an administrator
    And there exists a user with email "student@email.com" and approved status "true"
    And the current term is "Sep 2020 - Dec 2020"
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And student with email "student@email.com" is enrolled in course with code "COMP 4004" section "A"
    And I am on the user index
    When I click the delete button next to the user with email "student@email.com"
    And I click the "Confirm" button
    And I visit the show page for for course with code "COMP 4004" section "A" for the current term
    Then the user with email "student@email.com" no longer exists

  @ProfDeleteSuccess
  Scenario: An administrator deletes a professor that is enrolled in a course
    Given I successfully log in as an administrator
    And there exists a user with email "professor@email.com" name "John Smith"
    And there exists a course with code "COMP 4004"
    And the current term is "Jan 2021 - Apr 2021"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And professor with email "professor@email.com" is enrolled in course with code "COMP 4004" section "A"
    And I am on the user index
    When I click the delete button next to the user with email "professor@email.com"
    And I click the "Confirm" button
    And I visit the show page for for course with code "COMP 4004" section "A" for the current term
    Then the user with email "professor@email.com" no longer exists
