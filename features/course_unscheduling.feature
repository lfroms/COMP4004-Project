Feature: Course Unscheduling
  As an administrator
  I want to delete courses offerings
  So that students can no longer enroll in them

  Scenario: An administrator deletes a course offering
    Given I successfully log in as an administrator
    And the current term is "Jan 2021 - Apr 2021"
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And student with email "student@example.com" is enrolled in course offering with code "COMP 4004" section "A" for the current term
    And I am on the course offering index
    When I click the delete offering button
    And I click the "Confirm" button
    Then there no longer exists a course offering for course with code "COMP 4004" section "A" term "Jan 2021 - Apr 2021"
    And student with email "student@example.com" is no longer enrolled in course offering with code "COMP 4004" section "A" term "Jan 2021 - Apr 2021"

  Scenario: An administrator cancels deletion of a course offering
    Given I successfully log in as an administrator
    And the current term is "Jan 2021 - Apr 2021"
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And I am on the course offering index
    When I click the delete offering button
    And I click the "Cancel" button
    Then there still exists a course offering for course with code "COMP 4004" section "A" term "Jan 2021 - Apr 2021"

