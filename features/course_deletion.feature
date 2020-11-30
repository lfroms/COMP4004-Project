Feature: Course Deletion
  As an administrator
  I want to delete courses
  So that students can no longer enroll in them

  Scenario: An administrator deletes a course
    Given that I am logged in as an administrator
    And there exists a course with code "COMP 4004"
    And I am on the course index
    When I click the "delete_course" button
    And I click the "course_delete_submit" button
    Then there does not exists a course with code "COMP 4004"

  Scenario: An administrator cancels deletion of a course
    Given that I am logged in as an administrator
    And there exists a course with code "COMP 4004"
    And I am on the course index
    When I click the "delete_course" button
    And I click the "course_delete_cancel" button
    Then there exists a course with code "COMP 4004"

