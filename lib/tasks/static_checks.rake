# coding: utf-8
require 'nokogiri'
require 'html-proofer'

namespace :static_checks do
  def should_not_run_external_url_checks?
    if ENV['CI'] || ENV['SNAP_CI']
      false
    else
      ENV['RUN_EXTERNAL_CHECKS'].nil? || ENV['RUN_EXTERNAL_CHECKS'] == 'false'
    end
  end

  options = {
      :disable_external     => true,
      :url_ignore           => [/([https]:\/\/(localhost)|(github)|(linkedin):*)/],
      :allow_hash_href      => true,
      :allow_missing_href   => true,
      :href_ignore          => ['/https:\/\/www\.youtube\.com\/.*/'],
      :validation           => {
          :report_invalid_tags  => false,
          :report_script_embeds => false,
          :report_missing_names => false ,
      },
      :external_only        => false ,
      :check_html           => false,
      :typhoeus => {
          :ssl_verifypeer => false,
      },
      :empty_alt_ignore     => true,
      :log_level            => :info
  }

  task :html_proofer do
    STDERR.puts "WARNING: Not checking outbound links. Set environment variable: " +
                    "RUN_EXTERNAL_CHECKS to 'true' to run them" if should_not_run_external_url_checks?

    puts "\nRunning link checks, html format and verifying that it can be hosted in a subdirectory (relative links):"
    Dir.mktmpdir do |tmpdir|
      cp_r 'build/', File.join(tmpdir, 'subdir')

      cd tmpdir do
        HTMLProofer.check_directory('.', options).run
      end
    end
  end

  task :all => [:build, :html_proofer]
end
