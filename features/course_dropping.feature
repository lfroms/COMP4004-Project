Feature: Course Dropping
  As a student
  I want to drop courses
  So that I no longer have to participate in the course

  Scenario: A student successfully drops a course before withdrawal deadline
    Given I successfully log in as a student with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And student with email "student@email.com" has an account balance of 1000
    And there exists a term with per credit fee 1000 withdrawal deadline later than today
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A"
    And student with email "student@email.com" is enrolled in course with code "COMP 4004" section "A"
    And I am viewing enrollments for student with email "student@email.com"
    When I click the unenroll button
    And I click the "Confirm" button
    Then enrollment in course with code "COMP 4004" section "A" no longer appears in my enrollments
    # and my balance increased
    # and I have no final grade for that course

  Scenario: A student successfully drops a course after withdrawal deadline
    Given I successfully log in as a student with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And student with email "student@email.com" has an account balance of 1000
    And there exists a term with per credit fee 1000 withdrawal deadline earlier than today
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A"
    And student with email "student@email.com" is enrolled in course with code "COMP 4004" section "A"
    And I am viewing enrollments for student with email "student@email.com"
    When I click the unenroll button
    And I click the "Confirm" button
    Then enrollment in course with code "COMP 4004" section "A" no longer appears in my enrollments
    # and my balance stayed the same
    # and I have final grade WDN for that course

Scenario: A student cancels decision to drop a course
    Given I successfully log in as a student with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And student with email "student@email.com" has an account balance of 1000
    And there exists a term with per credit fee 1000 withdrawal deadline later than today
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A"
    And student with email "student@email.com" is enrolled in course with code "COMP 4004" section "A"
    And I am viewing enrollments for student with email "student@email.com"
    When I click the unenroll button
    And I click the "Cancel" button
    Then enrollment in course with code "COMP 4004" section "A" still appears in my enrollments

  Scenario: A student attempts to drop a course after receiving final grade
    Given I successfully log in as a student with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And there exists a term "Sep 2020 - Dec 2020"
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A"
    And student with email "student@email.com" is enrolled in course with code "COMP 4004" section "A"
    And student with email "student@email.com" has received a final grade in the enrollment
    And I am viewing enrollments for student with email "student@email.com"
    Then there is no unenroll button
