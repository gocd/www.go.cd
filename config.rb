require File.expand_path('../lib/extensions/fallback_for_directory_indexes', __FILE__)

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

cname              = (ENV['CNAME'] || 'localhost')
protocol           = (ENV['PROTOCOL'] || 'http')
deploy_environment = (ENV['DEPLOY_ENVIRONMENT'] || 'preview')

set :base_url, "#{protocol}://#{cname}"
# Repeated, just to show that it is important. Changing this might mean you lose Disqus comments.
set :base_url_for_blog_posts, "https://www.go.cd"
set :cname, cname
set :deploy_environment, deploy_environment

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
  "learn-more/why-go.html"                     => "/why-gocd/index.html",
  "cla/index.html"                             => "/contributor-license-agreement/index.html",
  "support/index.html"                         => "https://www.thoughtworks.com/go",
  "infoq/index.html"                           => "/index.html?utm_campaign=infoq_2016_q4&utm_medium=podcast_infoq&utm_source=podcast_infoq&utm_content=go_download&utm_term=",
  "changelog/index.html"                       => "/index.html?utm_campaign=the_changelog_2016&utm_medium=podcast&utm_source=podcast_audio&utm_content=go_download&utm_term=",
  "talkpython/index.html"                      => "/download/index.html?utm_campaign=tptm_2016&utm_medium=podcast_banner&utm_source=podcast_Banner_tptm&utm_content=manage_complexity_ease&utm_term=",
  "recode/index.html"                          => "/index.html?utm_campaign=recode_podcast_q1_2017&utm_medium=podcast_recode&utm_source=podcast_recode&utm_content=go_cd&utm_term=",
  "twit/index.html"                            => "/index.html?utm_campaign=twit_podcast_q1_2017&utm_medium=podcast_twit&utm_source=podcast_twit&utm_content=go_cd&utm_term=",
  }
#To ignore HtmlCheck for URL's with &, update file_ignore options in lib/tasks/static_checks.rake
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

  def put_gocd_in_span(text)
    text.gsub(/GoCD/, '<span class="go">Go</span>CD')
  end

  def link_to_github_user(login, display_name=nil)
    display_name = login if display_name.blank?
    link_to(display_name, "https://github.com/#{login}", )
  end

  def link_to_pull_request(number, text)
    concat_content(link_to("##{number}", "https://github.com/gocd/gocd/pull/#{number}"))
    concat_content(' - ')
    concat_content(text)
  end

  def link_to_commit(sha, text, issue = nil)
    concat_content(content_tag(:code, link_to("#{sha.first(7)}", "https://github.com/gocd/gocd/commit/#{sha}")))
    concat_content(' - ')
    concat_content(text)
    if issue
      concat_content(' (')
      concat_content(link_to("##{issue}", "https://github.com/gocd/gocd/issues/#{issue}"))
      concat_content(')')
    end
  end

  def link_to_api(api_section, text='API')
    link_to text, "https://api.gocd.io/current/##{api_section}"
  end

  def link_to_issue(number, text='')
    concat_content(link_to("##{number}", "https://github.com/gocd/gocd/issues/#{number}"))
    concat_content(' - ') unless text == ''
    concat_content(text)
  end

  def link_to_full_changelog(text, milestone_name)
    link_to(text, "https://github.com/gocd/gocd/issues?q=milestone%3A%22#{CGI.escape(milestone_name)}%22")
  end

  def value_or_default key, default_value = nil
    (current_article.data[key] unless current_article.nil?) || (current_page.data[key] unless current_page.nil?) || default_value
  end

  def value_or_title_as_default property
    default_title = (current_article.title unless current_article.nil?) || (current_page.data.title unless current_page.nil?) || "GoCD - Continuous Delivery"
    value_or_default(property, default_title)
  end

  def twitter_card_property twitter_specific_property, fallback_property
    value_or_default(twitter_specific_property, value_or_default(fallback_property, ""))
  end

  def twitter_card_image default_image
    path_to_image = value_or_default(:twitter_card_image, value_or_default(:summary_image, default_image))
    asset_path_of_image = asset_path(:images, path_to_image, :relative => false)
    full_path_of_image = File.join(app.config[:source], asset_path(:images, path_to_image, :relative => false))
    raise "Image does not exist or too large to use for Twitter summary: #{full_path_of_image}" unless (File.exists?(full_path_of_image) && (File.size(full_path_of_image) < (1024 * 1024 * 1024)))
    URI::join(config.base_url, asset_path_of_image)
  end

  def should_show_drafts?
    not config.deploy_environment.eql?("live")
  end

  def is_draft? article
    article.data["draft"] == true
  end

  def selected_articles_for_display_in articles
    articles.reject do |article| !should_show_drafts? && is_draft?(article) end
  end
end

REDIRECTS.each do |from, to|
  proxy from, "/redirect.template.html", :locals => { :redirect_to => to }, :ignore => true
end

activate :s3_sync do |s3_sync|
  s3_sync.bucket       = ENV['S3_BUCKET']
  s3_sync.region       = 'us-east-1'
  s3_sync.prefer_gzip  = false
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript
end
