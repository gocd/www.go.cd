require 'rubygems'
require 'rake/clean'
require 'middleman-gh-pages'

Rake.add_rakelib File.expand_path('../lib/tasks/', __FILE__)
CLOBBER.include('build')

task :default => [:build]
