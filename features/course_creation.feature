Feature: Course Creation
  As an administrator
  I want to create courses
  So that students can enroll in them

  Scenario: An administrator successfully creates a course
    Given that I am logged in as an administrator
    And I am on the course index
    And there does not exist a course with code "COMP 0000"
    When I click the "New course" button
    And I enter code "COMP 0000"
    And I enter name "Software Quality Assurance"
    And I submit the form
    Then there exists a course with code "COMP 0000" name "Software Quality Assurance"

  Scenario: Name field was left blank during course creation
    Given that I am logged in as an administrator
    And I am on the course index
    When I click the "New course" button
    And I enter code "COMP 2222"
    And I submit the form
    Then I receive an error message saying "You must enter a name"

  Scenario: Code field was left blank during course creation
    Given that I am logged in as an administrator
    And I am on the course index
    When I click the "New course" button
    And I enter name "Software Quality Assurance"
    And I submit the form
    Then I receive an error message saying "You must enter a course code"

  Scenario: An administrator attemps to create a course that already exists
    Given I am on the course index
    And there exists a course with code "COMP 4444"
    When I click the "New course" button
    And I enter code "COMP 4444"
    And I enter name "Software Quality Assurance"
    And I submit the form
    Then I receive an error message saying "A course with this code already exists"
    And there exists only one course with code "COMP 4444"
