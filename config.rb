require File.expand_path('../lib/extensions/fallback_for_directory_indexes', __FILE__)
require File.expand_path('../lib/helpers/gocd_helpers', __FILE__)

helpers GoCDHelpers

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

deploy_environment = (ENV['DEPLOY_ENVIRONMENT'] || 'preview')

set :base_url, ENV['BASE_URL'] || 'http://localhost:4567'
set :deploy_environment, deploy_environment

set :js_dir, "assets/javascripts"
set :css_dir, "assets/stylesheets"
set :images_dir, "assets/images"
set :fonts_dir,  "assets/vendor/fonts"

set :relative_links, true

REDIRECTS = {
  "2014/02/25/go-is-now-open-source.html"       => "/2014/02/25/go-moving-to-open-source/index.html",
  "2017/04/11/gocd-over-jenkins.html"           => "/2017/04/25/gocd-over-jenkins/index.html",
  "community/resources/index.html"              => "/resources/index.html",
  "community/plugins/index.html"                => "/plugins/index.html",
  "contribute/cla/index.html"                   => "/contributor-license-agreement/index.html",
  "contribute/roadmap/index.html"               => "/roadmap/index.html",
  "getting-started/index.html"                  => "/getting-started/part-1/index.html",
  "contribute/contribution-guide.html"          => "/contribute/index.html",
  "learn-more/why-go.html"                      => "/why-gocd/index.html",
  "cla/index.html"                              => "/contributor-license-agreement/index.html",
  "documentation/index.html"                    => "https://docs.gocd.org",
  "support/index.html"                          => "https://www.thoughtworks.com/",
  "infoq/index.html"                            => "/index.html?utm_campaign=infoq_2016_q4&utm_medium=podcast_infoq&utm_source=podcast_infoq&utm_content=go_download&utm_term=",
  "changelog/index.html"                        => "/index.html?utm_campaign=the_changelog_2016&utm_medium=podcast&utm_source=podcast_audio&utm_content=go_download&utm_term=",
  "talkpython/index.html"                       => "/download/index.html?utm_campaign=tptm_2016&utm_medium=podcast_banner&utm_source=podcast_Banner_tptm&utm_content=manage_complexity_ease&utm_term=",
  "recode/index.html"                           => "/index.html?utm_campaign=recode_podcast_q1_2017&utm_medium=podcast_recode&utm_source=podcast_recode&utm_content=go_cd&utm_term=",
  "twit/index.html"                             => "/index.html?utm_campaign=twit_podcast_q1_2017&utm_medium=podcast_twit&utm_source=podcast_twit&utm_content=go_cd&utm_term=",
  "sedaily/index.html"                          => "/index.html?utm_campaign=sedaily_2017_podcast&utm_medium=sedaily_podcast&utm_source=sedaily_podcast&utm_content=sed_podcast&utm_term=",
  "SEdaily/index.html"                          => "/index.html?utm_campaign=sedaily_2017_podcast&utm_medium=sedaily_podcast&utm_source=sedaily_podcast&utm_content=sed_podcast&utm_term=",
  "govsjenkins/index.html"                      => "/2017/04/25/gocd-over-jenkins/index.html",
  "gocdvsjenkins/index.html"                    => "/2017/04/25/gocd-over-jenkins/index.html",
  "arrested/index.html"                         => "/index.html?utm_campaign=arrested_ops_2017&utm_medium=podcast&utm_source=podcast_arrested&utm_content=go_website&utm_term=",
  "spinnaker/index.html"                        => "/2017/07/10/gocd-vs-spinnaker/index.html",
  "podcastinit/index.html"                      => "/index.html?utm_campaign=podcastinit_2017&utm_medium=podcast&utm_source=podcast_audio&utm_content=go_website&utm_term=",
  "101/index.html"                              => "/tags/cd-101.html",
  "community/index.html"                        => "https://groups.google.com/g/go-cd",
  "chef/index.html"                             => "/index.html",
  "community/events/index.html"                 => "/index.html",
  "community/partners/index.html"               => "/index.html",
  "events/index.html"                           => "/index.html",
  "partners/index.html"                         => "/index.html",
  "enterprise/index.html"                       => "/index.html",
  "enterprise-campaign/index.html"              => "/index.html",
}

activate :sprockets do |config|
  # No idea why this is needed or helps fix sass imports, but it did... https://github.com/middleman/middleman-sprockets/issues/127#issuecomment-736958140
  config.supported_output_extensions = ['.js']
end

# These old libraries don't seem to be able to play nicely with sprockets v4 and sassc. Someone is responsible for getting
# them on the load path, but it is not working. Until we can move to a modern sass pipeline, let's get them in there.
for gem in %w(font-awesome-sass bootstrap-sass)
  ::SassC.load_paths << File.join(Gem::Specification.find_by_name(gem).full_gem_path, 'assets', 'stylesheets')
end

for gem in %w(bourbon neat)
  ::SassC.load_paths << File.join(Gem::Specification.find_by_name(gem).full_gem_path, 'core')
end

activate :autoprefixer
activate :relative_assets
activate :blog do |blog|
  blog.sources           = "posts/{year}-{month}-{day}-{title}.html"
  blog.layout            = "post"
  blog.tag_template      = "posts/tag.html"
  blog.calendar_template = "posts/calendar.html"
  blog.paginate          = true
  blog.publish_future_dated = true if deploy_environment != 'live'
end
activate :directory_indexes
activate :fallback_for_directory_indexes

REDIRECTS.each do |from, to|
  proxy from, "/redirect.template.html", :locals => { :redirect_to => to }, :ignore => true
end

activate :s3_sync do |s3_sync|
  s3_sync.region       = 'us-east-1'
  s3_sync.prefer_gzip  = false
end

# these files have long lived cache haaders
assets = []
assets += %w(css js)
assets += %w(png svg gif jpg jpeg ico)
assets += %w(eot ttf woff woff2)
assets += %w(mov avi)
assets.each do |file_type|
  MIME::Types.type_for(file_type).each do |mime|
    caching_policy mime.content_type, max_age: (60 * 60 * 24 * 365)
  end
end

default_caching_policy  max_age: 600, must_revalidate: true

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  activate :asset_hash
end
