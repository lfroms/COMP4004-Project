Feature: Course Scheduling
  As an administrator
  I want to create courses offerings
  So that students can enroll in them

  Scenario: An administrator successfully creates a course offering
    Given that I am logged in as an administrator
    And I am on the course offering index
    And I click the "New offering" button
    And there exists a course "COMP 4004"
    And there exists a term "May 2020 - Dec 2020"
    And there does not exist a course offering for course with code "COMP 4004" with section "A" and term "May 2020 - Dec 2020"
    When I enter section "A"
    And I select course "COMP 4004"
    And I select term "May 2020 - Dec 2020"
    And I submit the form
    Then there exists a course offering for course with code "COMP 4004" with section "A" and term "May 2020 - Dec 2020"

  Scenario: Section field was left blank
    Given that I am logged in as an administrator
    And I am on the course offering index
    And I click the "New offering" button
    And there exists a course "COMP 4004"
    And there exists a term "May 2020 - Dec 2020"
    When I select course "COMP 4004"
    And I select term "May 2020 - Dec 2020"
    And I submit the form
    Then I receive an error message saying "days field cannot be blank"

  Scenario: An administrator attemps to create a section that already exists
    Given that I am logged in as an administrator
    And I am on the course offering index
    And I click the "New offering" button
    And there exists a course "COMP 4004"
    And there exists a term "May 2020 - Dec 2020"
    And there exists a course offering for course with code "COMP 4004" with section "A" and term "May 2020 - Dec 2020"
    When I enter section "A"
    And I select term "May 2020 - Dec 2020"
    And I submit the form
    Then I receive an error message saying "A course offering for this term with this section name already exists"
    And there exists only one course offering for course with code "COMP 4004" with section "A" and term "May 2020 - Dec 2020"
