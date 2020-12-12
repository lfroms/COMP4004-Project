Feature: Course Creation
  As an administrator
  I want to create courses
  So that students can enroll in them

  @CourseCreateSuccessNoPrereq
  Scenario: An administrator successfully creates a course without prerequisites
    Given I successfully log in as an administrator
    And I am on the course index
    When I click the "New course" button
    And I enter code "COMP 4004"
    And I enter name "Software Quality Assurance"
    And I click the "Create" button
    Then there now exists a course with code "COMP 4004" name "Software Quality Assurance"
    And new course with code "COMP 4004" has no prerequisites

  @CourseCreateSuccessPrereq
  Scenario: An administrator successfully creates a course with prerequisites
    Given I successfully log in as an administrator
    And there exists a course with code "COMP 3004"
    And I am on the course index
    When I click the "New course" button
    And I enter code "COMP 4004"
    And I enter name "Software Quality Assurance"
    And I select prerequisite "COMP 3004"
    And I click the "Create" button
    Then there now exists a course with code "COMP 4004" name "Software Quality Assurance"
    And new course with code "COMP 4004" has prerequisite "COMP 3004"

  @CourseCreateMissingName
  Scenario: Name field was left blank during course creation
    Given I successfully log in as an administrator
    And I am on the course index
    When I click the "New course" button
    And I enter code "COMP 4004"
    And I click the "Create" button
    Then I receive a message saying "You must enter a name"

  @CourseCreateMissingCode
  Scenario: Code field was left blank during course creation
    Given I successfully log in as an administrator
    And I am on the course index
    When I click the "New course" button
    And I enter name "Software Quality Assurance"
    And I click the "Create" button
    Then I receive a message saying "You must enter a course code"

  @CourseCreateDup
  Scenario: An administrator attemps to create a course that already exists
    Given I successfully log in as an administrator
    And there exists a course with code "COMP 4004"
    And I am on the course index
    When I click the "New course" button
    And I enter code "COMP 4004"
    And I enter name "Software Quality Assurance"
    And I click the "Create" button
    Then I receive a message saying "Code has already been taken"
