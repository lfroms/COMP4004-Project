Feature: Course Unscheduling
  As an administrator
  I want to delete courses offerings
  So that students can no longer enroll in them

  Scenario: An administrator deletes a course offering
    Given that I am logged in as an administrator
    And I am on the course offering index
    And there exists a course offering for course with code "COMP 4004" with section "A" and term "May 2020 - Dec 2020"
    When I click the "delete_offering" button
    And I click the "offering_delete_submit" button
    Then there does not exists a course offering for course with code "COMP 4004" with section "A" and term "May 2020 - Dec 2020"

  Scenario: An administrator cancels deletion of a course offering
    Given that I am logged in as an administrator
    And I am on the course offering index
    And there exists a course offering for course with code "COMP 4004" with section "A" and term "May 2020 - Dec 2020"
    When I click the "delete_offering" button
    And I click the "offering_delete_cancel" button
    Then there exists a course offering for course with code "COMP 4004" with section "A" and term "May 2020 - Dec 2020"

