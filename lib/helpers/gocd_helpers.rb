module GoCDHelpers
  def git_revision_information
    return $revision unless $revision.nil?

    git_log = `git log -n 1 HEAD 2>/dev/null || true`

    $revision = "Last updated: #{Time.now}\n\nLatest commit:\n    #{git_log.gsub(/\n/, "\n    ")}"
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
    concat_content(text.strip)
    concat_content('.') unless text.strip.ends_with?('.')
  end

  def link_to_commit(sha, text, issue = nil)
    concat_content(content_tag(:code, link_to("#{sha.first(7)}", "https://github.com/gocd/gocd/commit/#{sha}")))
    concat_content(' - ')
    concat_content(text.strip)
    concat_content('.') unless text.strip.ends_with?('.')
    if issue
      concat_content(' (')
      concat_content(link_to("##{issue}", "https://github.com/gocd/gocd/issues/#{issue}"))
      concat_content(')')
    end
  end

  def link_to_api(api_section, text='API')
    link_to_versioned_api('current', api_section, text)
  end

  def new_api_message(issue_number, api_version, api_name, api_section)
    link_to_issue issue_number, "Introduced version #{api_version} of #{link_to_api(api_section, api_name)} API."
  end

  def link_to_versioned_api(version, api_section, text='API')
    link_to text, "https://api.gocd.org/#{version}/##{api_section}"
  end

  def deprecated_docker_image_message(distro_name, distro_version, removal_date_and_year)
    concat_content("The #{distro_name} #{distro_version} based docker image for GoCD Agent has been deprecated and will not be built after #{removal_date_and_year} release of GoCD. This will be done as #{distro_name} #{distro_version} will reach end-of-life in #{removal_date_and_year}.")
  end

  def removed_docker_image_message(distro_name, distro_version, removal_date_and_year)
    concat_content("The #{distro_name} #{distro_version} based docker image for GoCD Agent has been removed. #{distro_name} #{distro_version} has reached end-of-life in #{removal_date_and_year}. Please use an image based on a newer version of the #{distro_name}.")
  end

  def deprecated_api_message(opts={})
    concat_content("The #{opts[:api_name]} API version #{opts[:old_api_version]} has been deprecated. ")
    concat_content("This version will be removed in a release scheduled for #{opts[:removal_date_and_year]}.")
    concat_content(link_to_versioned_api(opts[:new_api_available_in_release], opts[:api_section], "Version #{opts[:new_api_version]}"))
    concat_content(" of the API is available, and users are encouraged to use it.")
  end

  def removed_api_message(opts={})
    concat_content("The #{opts[:api_name]} API version #{opts[:old_api_version]} has been removed. ")
    concat_content(link_to_versioned_api(opts[:new_api_available_in_release], opts[:api_section], "Version #{opts[:new_api_version]}"))
    concat_content(" of the API is available, and users are encouraged to use it.")
  end

  def deprecated_plugin_api_message()
    # The elastic agent plugin extension version 3 has been deprecated. This version will be removed in a release scheduled for Mar 2019.
    # Plugin developers should use version 4 of the elastic agent plugin api to allow adding support for job completion request. The docker, docker swarm, kubernetes and ecs plugins have been migrated to the new versions, and users should upgrade their plugins to the latest version to see these new features.
    concat_content("The #{opts[:plugin_type]} plugin extension version #{opts[:old_api_version]} has been deprecated. ")
    concat_content("This version will be removed in a release scheduled for #{opts[:removal_date_and_year]}.")
    concat_content(link_to_versioned_plugin_api(opts[:new_api_available_in_release], opts[:api_section], "Version #{opts[:new_api_version]}"))
    concat_content(" of the API is available, and users are encouraged to use it.")
  end

  def link_to_plugin_api(api_section, text='PLUGIN API')
    link_to text, "https://plugin-api.gocd.org/current/#{api_section}"
  end

  def link_to_issue(number, text='')
    number = number.to_s.gsub(/#.*/, '')

    concat_content(link_to("##{number}", "https://github.com/gocd/gocd/issues/#{number}"))
    concat_content(' - ') unless text == ''
    concat_content(text)
  end

  def link_to_full_changelog(text, milestone_name)
    link_to(text, "https://github.com/gocd/gocd/issues?q=milestone%3A%22#{CGI.escape(milestone_name)}%22+is%3Aclosed")
  end

  def link_to_docker_issue(number)
    link_to("##{number}", "https://github.com/gocd/docker-gocd-server/issues/#{number}")
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

  def twitter_card_image(image)
    path_to_image = value_or_default(:twitter_card_image, value_or_default(:summary_image, image))
    full_path_of_image = if build?
      File.join(app.config[:build_dir], asset_path(:images, path_to_image, :relative => false))
    else
      File.join(app.config[:source], asset_path(:images, path_to_image, :relative => false))
    end
    raise "Image does not exist or too large to use for Twitter summary: #{full_path_of_image}" unless (File.exists?(full_path_of_image) && (File.size(full_path_of_image) < (1024 * 1024 * 1024)))
    URI::join(config.base_url, asset_path(:images, path_to_image, :relative => false))
  end

  def should_show_drafts?
    not config.deploy_environment.eql?("live")
  end

  def is_draft?(article)
    article.data["draft"] == true
  end

  def selected_articles_for_display_in(articles)
    articles.reject do |article| !should_show_drafts? && is_draft?(article) end
  end

  def canonical_link_for(page_or_article)
    overridden_canonical_url = page_or_article.data[:overridden_canonical_url]

    return overridden_canonical_url unless overridden_canonical_url.nil?
    "#{config.base_url}/#{page_or_article.destination_path.sub(%r{/index.html}, '')}"
  end
end
