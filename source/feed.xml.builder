xml.instruct!
xml.feed "xmlns" => "http://www.w3.org/2005/Atom" do
  site_url = "#{config[:base_url]}/blog"
  xml.title "GoCD"
  xml.subtitle "Continuous Delivery"
  xml.id URI.join(site_url, blog.options.prefix.to_s)
  xml.link "href" => URI.join(site_url, blog.options.prefix.to_s)
  xml.link "href" => URI.join(site_url, current_page.path), "rel" => "self"
  xml.updated(blog.articles.first.date.to_time.iso8601) unless blog.articles.empty?
  xml.author { xml.name "GoCD Team" }

  blog.articles[0..9].each do |article|
    xml.entry do
      xml.title article.title
      xml.link "rel" => "alternate", "href" => URI.join(site_url, article.url).to_s.sub(/\/$/, ".html")
      xml.id URI.join(site_url, article.url).to_s.sub(/\/$/, ".html")
      xml.published article.date.to_time.iso8601
      xml.updated File.mtime(article.source_file).iso8601
      xml.author { xml.name article.data["author"] || "GoCD Team" }
      xml.content article.data["excerpt"] || article.summary(250), "type" => "html"
    end
  end
end
