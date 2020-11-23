require "fontcustom_canvas/version"
require 'fileutils'
require 'open-uri'

module FontcustomCanvas
  class Error < StandardError; end
  uri_content = "https://raw.githubusercontent.com/Ahmed-Abd-elhamid/fontcustom_canvas/master/public"
  files = ["ThemeEditorAccordion.js", "ThemeEditorFontWeightRow.js", "ThemeEditorFontSizeRow.js", "Fonts.js", "PropTypes.js", "ThemeEditorFontFamilyRow.js"]

  raise StandardError.new "This is an exception" unless (Dir.exists?("app") && Dir.exists?("lib") && Dir.exists?("app/jsx") && Dir.exists?("app/stylesheets") && Dir.exists?("app/stylesheets/base") && Dir.exists?("app/stylesheets/components"))

  files.each do |file|
    File.write("app/jsx/theme_editor/#{file}", (URI.parse("#{uri_content}/theme_editor/#{file}").open.read) )
    puts "app/jsx/theme_editor/#{file} --->> done"
  end 

  File.write("app/stylesheets/base/_variables.scss", (URI.parse("#{uri_content}/_variables.scss").open.read) )
  puts "app/stylesheets/base/_variables.scss --->> done"

  File.write("app/stylesheets/components/_ic-typography.scss", (URI.parse("#{uri_content}/_ic-typography.scss").open.read) )
  puts "app/stylesheets/components/_ic-typography.scss --->> done"

  File.write("app/stylesheets/brandable_variables.json", (URI.parse("#{uri_content}/brandable_variables.json").open.read) )
  puts "app/stylesheets/brandable_variables.json --->> done"

  File.write("lib/brandable_css.rb", (URI.parse("#{uri_content}/brandable_css.rb").open.read) )
  puts "lib/brandable_css.rb --->> done"
end
