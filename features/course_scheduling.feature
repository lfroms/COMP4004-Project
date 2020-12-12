Feature: Course Scheduling
  As an administrator
  I want to create courses offerings
  So that students can enroll in them

  Scenario: An administrator successfully creates a course offering
    Given I successfully log in as an administrator
    And I am on the course offering index
    And there exists a course with code "COMP 4004"
    And there exists a term "Jan 2021 - Apr 2021"
    When I click the "New course offering" button
    And I select term "Jan 2021 - Apr 2021"
    And I select course "COMP 4004"
    And I enter section "A"
    And I enter capacity 2
    And I click the "Create" button
    Then there now exists a course offering for course with code "COMP 4004" section "A" term "Jan 2021 - Apr 2021"

  Scenario: Section field was left blank
    Given I successfully log in as an administrator
    And I am on the course offering index
    And there exists a course with code "COMP 4004"
    And there exists a term "Jan 2021 - Apr 2021"
    When I click the "New course offering" button
    And I select term "Jan 2021 - Apr 2021"
    And I select course "COMP 4004"
    And I enter capacity 2
    And I click the "Create" button
    Then I receive a message saying "You must enter a section"

  Scenario: Capacity field was left blank
    Given I successfully log in as an administrator
    And I am on the course offering index
    And there exists a course with code "COMP 4004"
    And there exists a term "Jan 2021 - Apr 2021"
    When I click the "New course offering" button
    And I select term "Jan 2021 - Apr 2021"
    And I select course "COMP 4004"
    And I enter section "A"
    And I click the "Create" button
    Then I receive a message saying "You must enter a capacity"

  Scenario: Capacity is below 1
    Given I successfully log in as an administrator
    And I am on the course offering index
    And there exists a course with code "COMP 4004"
    And there exists a term "Jan 2021 - Apr 2021"
    When I click the "New course offering" button
    And I select term "Jan 2021 - Apr 2021"
    And I select course "COMP 4004"
    And I enter section "A"
    And I enter capacity 0
    And I click the "Create" button
    Then I receive a message saying "Capacity must be between 1 and 400"

  Scenario: Capacity is above 400
    Given I successfully log in as an administrator
    And I am on the course offering index
    And there exists a course with code "COMP 4004"
    And there exists a term "Jan 2021 - Apr 2021"
    When I click the "New course offering" button
    And I select term "Jan 2021 - Apr 2021"
    And I select course "COMP 4004"
    And I enter section "A"
    And I enter capacity 401
    And I click the "Create" button
    Then I receive a message saying "Capacity must be between 1 and 400"

  Scenario: Course was not selected
    Given I successfully log in as an administrator
    And I am on the course offering index
    And there exists a course with code "COMP 4004"
    And there exists a term "Jan 2021 - Apr 2021"
    When I click the "New course offering" button
    And I select term "Jan 2021 - Apr 2021"
    And I enter section "A"
    And I enter capacity 2
    And I click the "Create" button
    Then I receive a message saying "You must select a course"

  Scenario: Term was not selected
    Given I successfully log in as an administrator
    And I am on the course offering index
    And there exists a course with code "COMP 4004"
    And there exists a term "Jan 2021 - Apr 2021"
    When I click the "New course offering" button
    And I select course "COMP 4004"
    And I enter section "A"
    And I enter capacity 2
    And I click the "Create" button
    Then I receive a message saying "You must select a term"

  Scenario: An administrator attemps to create a section that already exists
    Given I successfully log in as an administrator
    And there exists a course with code "COMP 4004"
    And the current term is "Jan 2021 - Apr 2021"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And I am on the course offering index
    When I click the "New course offering" button
    And I enter section "A"
    And I enter capacity 2
    And I select course "COMP 4004"
    And I select term "Jan 2021 - Apr 2021"
    And I click the "Create" button
    Then I receive a message saying "Section has already been taken"
