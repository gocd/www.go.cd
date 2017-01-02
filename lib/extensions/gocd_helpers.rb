class GoCDHelpers < ::Middleman::Extension
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

::Middleman::Extensions.register(:gocd_helpers, GoCDHelpers)
