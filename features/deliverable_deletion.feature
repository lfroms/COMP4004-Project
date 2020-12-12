Feature: Deliverable Deletion
  As a professor
  I want to delete deliverables
  So that they can be deleted

  Scenario: A professor successfully deletes a deliverable for the course
    Given I successfully log in as a user with email "prof@email.com"
    And the current term is "Aug 2020 - Dec 2020"
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And user with email "prof@email.com" is the professor for course offering for course with code "COMP 4004" section "A"
    And there exists a deliverable called "Some deliverable" for course offering for course with code "COMP 4004" section "A"
    When I navigate to the deliverable show page for the "Some deliverable"
    And I click the "Delete deliverable" button
    And I click the "Confirm" button
    Then I get redirected to the show page for course with code "COMP 4004" section "A"
    And there does not exist a deliverable with title "Some deliverable"

  Scenario: A professor tries to delete a deliverable with submissions
    Given I successfully log in as a user with email "prof@email.com"
    And the current term is "Aug 2020 - Dec 2020"
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And user with email "prof@email.com" is the professor for course offering for course with code "COMP 4004" section "A"
    And there exists a deliverable called "Some deliverable" for course offering for course with code "COMP 4004" section "A"
    When I navigate to the deliverable show page for the "Some deliverable"
    Then the "Delete deliverable" button is disabled
