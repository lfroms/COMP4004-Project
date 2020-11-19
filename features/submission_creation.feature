Feature: Submission Creation
  As a student
  I want to create submissions
  So that I can be evaluated

  Scenario: A student successfully creates a submission
    Given that I am logged in as a student with email "student@email.com"
    And there exists a term "Fall2020"
    And there exists a course with code "COMP4004"
    And there exists a course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    And there exists a deliverable with title "Final" offering for course with code "COMP4004" with section "A" and term "Fall2020"
    And student with email "student@email.com" is enrolled in course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    And I am viewing the sumission creation form for deliverable with title "Final" for course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    When I enter attachment "file"
    And I submit the form
    Then there exists a submission from user with email "student@email.com" for deliverable with title "final" for course offering for course with code "COMP4004" with section "A" and term "Fall2020"

  #TODO: add scenario for case when due date has passed
