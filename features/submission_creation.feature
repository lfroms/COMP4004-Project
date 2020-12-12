Feature: Submission Creation
  As a student
  I want to create submissions
  So that I can be evaluated

  @SubCreateSuccess
  Scenario: A student successfully creates a submission
    Given I successfully log in as a user with email "student@email.com"
    And the current term is "Jan 2021 - Apr 2021"
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And there exists a deliverable called "Final" with due date later than today for course offering for course with code "COMP 4004" section "A" for the current term
    And student with email "student@email.com" is enrolled in course with code "COMP 4004" section "A"
    And I navigate to the deliverable show page for the "Final"
    When I click the "Add submission" button
    And I enter url "http://example.com/doc.pdf"
    And I click the "Submit" button
    Then I receive a message saying "Submitted"

  @SubCreateTooLate
  Scenario: A student successfully creates a submission
    Given I successfully log in as a user with email "student@email.com"
    And the current term is "Jan 2021 - Apr 2021"
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And there exists a deliverable called "Final" with due date one day ago for course offering for course with code "COMP 4004" section "A" for the current term
    And student with email "student@email.com" is enrolled in course with code "COMP 4004" section "A"
    When I navigate to the deliverable show page for the "Final"
    Then the "Due date passed" button is disabled
