Feature: Course Deletion
  As an administrator
  I want to delete courses
  So that students can no longer enroll in them

  Scenario: An administrator deletes a course
    Given that I am logged in as an administrator
    And there exists a course with code "COMP4004"
    And I am viewing the details of the course with code "COMP4004"
    When I select the option to delete
    And I confirm my decision
    Then there does not exists a course with code "COMP4004"
    And I am viewing the list of courses

  Scenario: An administrator cancels deletion of a course
    Given that I am logged in as an administrator
    And there exists a course with code "COMP4004"
    And I am viewing the details of the course with code "COMP4004"
    When I select the option to delete
    And I cancel my decision
    And there exists a course with code "COMP4004"
    And I am viewing the details of the user with email "myemail@email.com"

