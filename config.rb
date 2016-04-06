require 'middleman-deploy'
require File.expand_path('../lib/extensions/fallback_for_directory_indexes', __FILE__)

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

set :base_url, "https://go.cd"
set :js_dir, "assets/javascripts"
set :css_dir, "assets/stylesheets"
set :images_dir, "assets/images"

set :relative_links, true

REDIRECTS = {
  "2014/02/25/go-is-now-open-source.html" => "/2014/02/25/go-moving-to-open-source/index.html",
  "community/resources.html"              => "/community",
  "community/resources/index.html"        => "/community",
  "community/events.html"                 => "/events",
  "community/events/index.html"           => "/events",
  "community/partners.html"               => "/partners",
  "community/partners/index.html"         => "/partners",
  "community/plugins.html"                => "/plugins",
  "community/plugins/index.html"          => "/plugins",
  "contribute/cla.html"                   => "/cla",
  "contribute/cla/index.html"             => "/cla",
  "contribute/roadmap.html"               => "/roadmap",
  "contribute/roadmap/index.html"         => "/roadmap",
  "getting-started/index.html"            => "/getting-started/part-1",
  "contribute/contribution-guide.html"    => "/contribute",
  "learn-more/why-go.html"                => "/why-go"
}

activate :autoprefixer
activate :relative_assets
activate :blog do |blog|
  blog.sources           = "posts/{year}-{month}-{day}-{title}.html"
  blog.layout            = "post"
  blog.tag_template      = "posts/tag.html"
  blog.calendar_template = "posts/calendar.html"
  blog.paginate          = true
end
activate :directory_indexes
activate :fallback_for_directory_indexes

configure :development do
  # Reload the browser automatically whenever files change
  activate :livereload
end

helpers do
  def git_revision
    $revision = `git rev-parse --verify HEAD 2>/dev/null || true`.strip if @revision.nil?
    $revision
  end
end

REDIRECTS.each do |from, to|
  redirect from, to: to
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end
