# Need /blog.html as well as /blog/index.html to exist. The DirectoryIndexes extension removes /blog.html and replaces
# it with /blog/index.html.
class FallbackForDirectoryIndexes < ::Middleman::Extension
  # This should run after DirectoryIndexes extension
  self.resource_list_manipulator_priority = 101

  # Update the main sitemap resource list
  Contract ResourceList => ResourceList
  def manipulate_resource_list(resources)
    index_file = app.config[:index_file]
    index_path = "/#{index_file}"
    resources_to_add = []

    resources.each do |resource|
      next if resource.options[:directory_index] == false
      next unless resource.destination_path.end_with?(index_path)

      cloned_resource = resource.clone
      cloned_resource.destination_path = cloned_resource.destination_path.chomp(index_path) + File.extname(index_file)
      resources_to_add << cloned_resource
    end

    resources + resources_to_add
  end
end

::Middleman::Extensions.register(:fallback_for_directory_indexes, FallbackForDirectoryIndexes)
