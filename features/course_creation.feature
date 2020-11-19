Feature: Course Creation
  As an administrator
  I want to create courses
  So that students can enroll in them

  Scenario: An administrator successfully creates a course with no prerequisites
    Given that I am logged in as an administrator
    And I am viewing the course creation form
    And there does not exist a course with code "COMP4004"
    When I enter code "COMP4004"
    And I enter name "Software Quality Assurance"
    And I submit the form
    Then there exists a course with code "COMP4004" and name "Software Quality Assurance"
    And course with code "COMP4004" has no prerequisites
    And I am viewing the details for course with code "COMP4004"

Scenario: An administrator successfully creates a course with prerequisites
    Given that I am logged in as an administrator
    And I am viewing the course creation form
    And there does not exist a course with code "COMP4004"
    And there exists a course with code "COMP3004"
    When I enter code "COMP4004"
    And I enter name "Software Quality Assurance"
    And I enter prerequisites "COMP3004"
    And I submit the form
    Then there exists a course with code "COMP4004" name "Software Quality Assurance"
    And course with code "COMP4004" has prerequisite "COMP3004"
    And I am viewing the details for course with code "COMP4004"

  Scenario: A field was left blank
    Given that I am logged in as an administrator
    And that I am viewing the course creation form
    And there does not exist a course with code "COMP4004"
    When I enter code "COMP4004"
    And I submit the form
    Then I receive an error message saying "password field cannot be blank"
    And there does not exist a course with code "COMP4004"

  Scenario: An administrator attemps to create a course that already exists
    Given that I am logged in as an administrator
    And that I am viewing the course creation form
    And there exists a course with code "COMP4004"
    When I enter code "COMP4004"
    And I enter name "Software Quality Assurance"
    And I submit the form
    Then I receive an error message saying "A course with this code already exists"
    And there exists only one course with code "COMP4004"

Scenario: An administrator attemps to create a course with prerequisites that do not exist
    Given that I am logged in as an administrator
    And that I am viewing the course creation form
    And there does not exist a course with code "COMP4004"
    And there does not exist a course with code "COMP3004"
    When I enter code "COMP4004"
    And I enter name "Software Quality Assurance"
    And I enter prerequisites "COMP3004"
    And I submit the form
    Then I receive an error message saying "Prerequisite COMP3004 does not exist"
    And there does not exist a course with code "COMP4004"
