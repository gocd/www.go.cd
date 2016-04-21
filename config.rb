require 'middleman-deploy'
require File.expand_path('../lib/extensions/fallback_for_directory_indexes', __FILE__)

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

set :base_url, "https://www.go.cd"
# Repeated, just to show that it is important. Changing this might mean you lose Disqus comments.
set :base_url_for_blog_posts, "https://www.go.cd"

set :js_dir, "assets/javascripts"
set :css_dir, "assets/stylesheets"
set :images_dir, "assets/images"

set :relative_links, true

REDIRECTS = {
  "2014/02/25/go-is-now-open-source.html"      => "/2014/02/25/go-moving-to-open-source/index.html",
  "2014/10/09/Distrubuted-Test-Execution.html" => "/2014/10/09/Distributed-Test-Execution/index.html",
  "community/resources/index.html"             => "/resources/index.html",
  "community/events/index.html"                => "/events/index.html",
  "community/partners/index.html"              => "/partners/index.html",
  "community/plugins/index.html"               => "/plugins/index.html",
  "contribute/cla/index.html"                  => "/contributor-license-agreement/index.html",
  "contribute/roadmap/index.html"              => "/roadmap/index.html",
  "getting-started/index.html"                 => "/getting-started/part-1/index.html",
  "contribute/contribution-guide.html"         => "/contribute/index.html",
  "learn-more/why-go.html"                     => "/why-gocd/index.html"
}

activate :sprockets

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

  def put_gocd_in_span text
    text.gsub(/GoCD/, '<span class="go">Go</span>CD')
  end
end

ready do
  REDIRECTS.each do |from, to|
    proxy from, "/redirect.template.html", :locals => { :redirect_to => to }, :ignore => true
  end
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript
end
