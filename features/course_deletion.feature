Feature: Course Deletion
  As an administrator
  I want to delete courses
  So that students can no longer enroll in them

  Scenario: An administrator deletes a course
    Given I successfully log in as an administrator
    And there exists a course with code "COMP 4004"
    And I am on the course index
    When I click the delete course button
    And I click the "Confirm" button
    Then there no longer exists a course with code "COMP 4004"

  Scenario: An administrator cancels deletion of a course
    Given I successfully log in as an administrator
    And there exists a course with code "COMP 4004"
    And I am on the course index
    When I click the delete course button
    And I click the "Cancel" button
    Then there still exists a course with code "COMP 4004"
