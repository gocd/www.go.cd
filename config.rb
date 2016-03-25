require 'middleman-deploy'

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

set :base_url, "https://go.cd"
set :js_dir, "assets/javascripts"
set :css_dir, "assets/stylesheets"
set :images_dir, "assets/images"

set :relative_links, true

activate :relative_assets
activate :blog do |blog|
  blog.sources           = "posts/{year}-{month}-{day}-{title}.html"
  blog.layout            = "post"
  blog.tag_template      = "posts/tag.html"
  blog.calendar_template = "posts/calendar.html"
  blog.paginate          = true
end
activate :directory_indexes

configure :development do
  # Reload the browser automatically whenever files change
  activate :livereload
end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end
