require 'nokogiri'
require 'html-proofer'

namespace :static_checks do
  def should_not_run_external_url_checks?
    ENV['RUN_EXTERNAL_CHECKS'].nil? || ENV['RUN_EXTERNAL_CHECKS'] == 'false'
  end

  options = {
    :disable_external     => should_not_run_external_url_checks?,
    :url_ignore           => ['http://localhost:8153'],
    :allow_hash_href      => true,
    :check_html           => true,
    :empty_alt_ignore     => true,
    :alt_ignore           => [/.*/],
    :log_level            => :info,
    :report_invalid_tags  => true,
    :report_script_embeds => true
  }

  class ProperHTMLCheck < ::HTMLProofer::Check
    VALID_HTML5_ENTITIES = ['copy', 'ldquo', 'rdquo']
    def add_error error
      if error.respond_to?('line') and error.respond_to?('message')
        add_issue "Proper HTML Check: #{error.message}", line: error.line
      else
        add_issue "Proper HTML Check (unknown error): #{error.to_s}", line: 1
      end
    end

    def is_entity_error_and_is_valid? error
      error.is_a? Nokogiri::XML::SyntaxError and error.code == 26 and VALID_HTML5_ENTITIES.include? error.str1
    end

    def run
      Nokogiri::XML(File.read(path).sub(/^<!doctype html>\n/, '')).errors.each do |error|
        add_error error unless is_entity_error_and_is_valid?(error)
      end
    end
  end

  task :html_proofer do
    STDERR.puts "WARNING: Not checking outbound links. But, build will check them. Set environment variable: " +
                 "RUN_EXTERNAL_CHECKS to 'true' to run them" if should_not_run_external_url_checks?

    puts "\nRunning link checks, html format and verifying that it can be hosted in a subdirectory (relative links):"
    Dir.mktmpdir do |tmpdir|
      cp_r 'build/', File.join(tmpdir, 'subdir')

      cd tmpdir do
        HTMLProofer.check_directory('.', options).run
      end
    end
  end

  task :cleanup do
    rm_rf 'build/'
    Rake::Task['build'].reenable
  end

  task :all => [:html_proofer]
end

task :build do
  Rake::Task['static_checks:all'].invoke
end
