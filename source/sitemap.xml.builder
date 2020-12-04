index_file = app.config[:index_file]
index_path = "/#{index_file}"

xml.instruct!
xml.urlset "xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9" do
  sitemap.resources.each do |resource|
    next unless resource.destination_path.end_with?(index_path)

    next if resource.destination_path..end_with?("next-release/index.html")
    next if resource.destination_path..end_with?("next-release")
    next if resource.destination_path..end_with?("next-release/")
    next if resource.destination_path..end_with?("next-release.html")

    xml.url do
      xml.loc app.config[:base_url] + "/" + resource.destination_path.chomp(index_path) + "/"
    end
  end
end
