Feature: Course Creation
  As an administrator
  I want to create courses
  So that students can enroll in them

  Scenario: An administrator successfully creates a course
    Given that I am logged in as an administrator
    And I am on the course index
    When I click the "New course" button
    And I enter code "COMP 4004"
    And I enter name "Software Quality Assurance"
    And I click the "Create" button
    Then there now exists a course with code "COMP 4004" name "Software Quality Assurance"

  Scenario: Name field was left blank during course creation
    Given that I am logged in as an administrator
    And I am on the course index
    When I click the "New course" button
    And I enter code "COMP 4004"
    And I click the "Create" button
    Then I receive an error message saying "You must enter a name"

  Scenario: Code field was left blank during course creation
    Given that I am logged in as an administrator
    And I am on the course index
    When I click the "New course" button
    And I enter name "Software Quality Assurance"
    And I click the "Create" button
    Then I receive an error message saying "You must enter a course code"

  Scenario: An administrator attemps to create a course that already exists
    Given that I am logged in as an administrator
    And there exists a course with code "COMP 4004"
    And I am on the course index
    When I click the "New course" button
    And I enter code "COMP 4004"
    And I enter name "Software Quality Assurance"
    And I click the "Create" button
    Then I receive a notification error message saying "Code has already been taken"
