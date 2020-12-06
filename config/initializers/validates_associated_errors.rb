# frozen_string_literal: true
module ValidatesAssociatedAttributes
  module ActiveRecord::Validations::ClassMethods
    def validates_associated(*associations)
      class_eval do
        validates_each(associations) do |record, _associate_name, value|
          (value.respond_to?(:each) ? value : [value]).each do |rec|
            next unless rec && !rec.valid?
            rec.errors.each do |key, value|
              record.errors.add(key, value)
            end
          end
        end
      end
    end
  end
end

# Remove duplicate error messages.
module ActiveModel
  class Errors
    alias_method :old_full_messages, :full_messages

    def full_messages
      old_full_messages.uniq
    end
  end
end
