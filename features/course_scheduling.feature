Feature: Course Scheduling
  As an administrator
  I want to create courses offerings
  So that students can enroll in them

  Scenario: An administrator successfully creates a course offering
    Given that I am logged in as an administrator
    And I am on the course offering index
    And there exists a course with code "COMP 4004"
    And there exists a term "Sep 2020 - Dec 2020"
    When I click the "New course offering" button
    And I enter section "A"
    And I select course "COMP 4004"
    And I select term "Sep 2020 - Dec 2020"
    And I click the "Create" button
    Then there now exists a course offering for course with code "COMP 4004" section "A" term "Sep 2020 - Dec 2020"

  Scenario: Section field was left blank
    Given that I am logged in as an administrator
    And I am on the course offering index
    And there exists a course with code "COMP 4004"
    And there exists a term "Sep 2020 - Dec 2020"
    When I click the "New course offering" button
    And I select course "COMP 4004"
    And I select term "Sep 2020 - Dec 2020"
    And I click the "Create" button
    Then I receive an error message saying "You must enter a section"

  Scenario: Course was not selected
    Given that I am logged in as an administrator
    And I am on the course offering index
    And there exists a course with code "COMP 4004"
    And there exists a term "Sep 2020 - Dec 2020"
    When I click the "New course offering" button
    And I enter section "A"
    And I select term "Sep 2020 - Dec 2020"
    And I click the "Create" button
    Then I receive an error message saying "You must select a course"

  Scenario: Term was not selected
    Given that I am logged in as an administrator
    And I am on the course offering index
    And there exists a course with code "COMP 4004"
    And there exists a term "Sep 2020 - Dec 2020"
    When I click the "New course offering" button
    And I enter section "A"
    And I select course "COMP 4004"
    And I click the "Create" button
    Then I receive an error message saying "You must select a term"

  Scenario: An administrator attemps to create a section that already exists
    Given that I am logged in as an administrator
    And there exists a course with code "COMP 4004"
    And there exists a term "Sep 2020 - Dec 2020"
    And there exists a course offering for course with code "COMP 4004" section "A"
    And I am on the course offering index
    When I click the "New course offering" button
    And I enter section "A"
    And I select course "COMP 4004"
    And I select term "Sep 2020 - Dec 2020"
    And I click the "Create" button
    Then I receive an error message saying "Section has already been taken"
