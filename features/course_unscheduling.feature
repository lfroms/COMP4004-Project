Feature: Course Unscheduling
  As an administrator
  I want to delete courses offerings
  So that students can no longer enroll in them

  Scenario: An administrator deletes a course offering
    Given I successfully log in as an administrator
    And there exists a course offering for course with code "COMP 4004" section "A" term start date "2020-09-01" term end date "2020-12-31"
    And I am on the course offering index
    When I click the delete offering button
    And I click the "Confirm" button
    Then there no longer exists a course offering for course with code "COMP 4004" section "A" term "Sep 2020 - Dec 2020"

  Scenario: An administrator cancels deletion of a course offering
    Given I successfully log in as an administrator
    And there exists a course offering for course with code "COMP 4004" section "A" term start date "2020-09-01" term end date "2020-12-31"
    And I am on the course offering index
    When I click the delete offering button
    And I click the "Cancel" button
    Then there still exists a course offering for course with code "COMP 4004" section "A" term "Sep 2020 - Dec 2020"

