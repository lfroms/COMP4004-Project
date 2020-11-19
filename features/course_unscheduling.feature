Feature: Course Unscheduling
  As an administrator
  I want to delete courses offerings
  So that students can no longer enroll in them

  Scenario: An administrator deletes a course offering
    Given that I am logged in as an administrator
    And there exists a course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    And I am viewing the details of the course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    When I select the option to delete
    And I confirm my decision
    Then there does not exists a course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    And I am viewing the list of courses

  Scenario: An administrator cancels deletion of a course offering
    Given that I am logged in as an administrator
    And there exists a course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    And I am viewing the details of the course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    When I select the option to delete
    And I cancel my decision
    Then there exists a course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    And I am viewing the details of the course offering for course with code "COMP4004" with section "A" and term "Fall2020"

