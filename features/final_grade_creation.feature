Feature: Final grade creation
  As a professor
  I want to assign a final grade to a student
  So that the student can be evaluated for the course

  Scenario: A professor successfully assigns a final grade
    Given I successfully log in as a user with email "prof@email.com"
    And there exists a user with email "student@email.com" password "123456" approved status "true"
    And the current term is "Aug 2020 - Dec 2020"
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And user with email "prof@email.com" is the professor for course offering for course with code "COMP 4004" section "A"
    And student with email "student@email.com" is enrolled in course with code "COMP 4004" section "A"
    And I visit the participants page for course with code "COMP 4004" section "A" for the current term
    And I click the "Add final grade" button
    And I enter grade "A"
    And I click the "Assign" button
    Then there exists a participant with a final grade of "A"
