# frozen_string_literal: true

When('I click the delete button next to the term with name {string}') do |name|
  dates = name.split(' - ')
  term = Term.find_by(start_date: Time.zone.parse(dates.first), end_date: Time.zone.parse(dates.last))

  find("#delete_term_id_#{term.id}").click
end
