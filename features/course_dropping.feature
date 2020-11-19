Feature: Course Dropping
  As a student
  I want to drop courses
  So that I no longer have to participate in the course

  Scenario: A student successfully drops a course
    Given that I am logged in as a student with email "student@email.com"
    And I am viewing offering for course with code "COMP4004" with section "A"
    When I select the option to drop
    And I confirm my decision
    Then student with email "student@email.com" is not enrolled in course offering for course with code "COMP4004" with section "A"

  Scenario: A student cancels dropping of a course
    Given that I am logged in as a student with email "student@email.com"
    And I am viewing offering for course with code "COMP4004" with section "A"
    When I select the option to drop
    And I cancel my decision
    And I am viewing offering for course with code "COMP4004" with section "A"
