Feature: Submission Grading
  As a professor
  I want to grade submissions
  So that students can be evaluated

  Scenario: A professor successfully grades a student submission for a deliverable
    Given I successfully log in as a professor with email "prof@email.com"
    And there exists a term "Aug 2020 - Dec 2020"
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And user with email "prof@email.com" is the professor for course offering for course with code "COMP 4004" with section "A" and term "Aug 2020 - Dec 2020"
    And there exists a deliverable called "Final exam" for course offering for course with code "COMP 4004" with section "A"
    And a student with email "student@example.com" has created a submission "http://example.com/doc.pdf" for deliverable "Final exam" for course offering "COMP 4004" section "A"
    When I navigate to the deliverable show page for the "Final exam"
    And I click the "Add grade" button
    And I enter a grade of "0.9"
    And I enter a comment saying "good job!"
    And I click the "Create" button
    Then there exists a graded submission with grade "90"% and attachment url "http://example.com/doc.pdf"
